const { app, BrowserWindow, dialog, ipcMain, shell } = require('electron');
const fs = require('fs');
const path = require('path');

const APP_NAME = 'Zora';
const SETTINGS_FILE = 'zora-settings.json';

const DEFAULT_SETTINGS = {
  memoryBankPath: '',
  appearance: {
    theme: 'tower-night',
    accent: 'pinky-purple'
  },
  zoraState: 'resting',
  loggingState: 'idle',
  activeSessionId: '',
  providers: {
    stt: { enabled: false, label: 'Speech-to-text provider', status: 'not_configured' },
    llm: { enabled: false, label: 'LLM provider', status: 'not_configured' },
    tts: { enabled: false, label: 'Text-to-speech provider', status: 'not_configured' },
    web: { enabled: false, label: 'Web research provider', status: 'not_configured' },
    drive: { enabled: false, label: 'Google Drive', status: 'not_configured' },
    make: { enabled: false, label: 'Make webhook', status: 'not_configured' },
    obs: { enabled: false, label: 'OBS WebSocket', status: 'not_configured' },
    warudo: { enabled: false, label: 'Warudo trigger bridge', status: 'not_configured' }
  },
  hotkeys: {
    listen: '',
    rest: '',
    awaken: '',
    mute: '',
    stop: '',
    panic: ''
  }
};

function getSettingsPath() {
  return path.join(app.getPath('userData'), SETTINGS_FILE);
}

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    return fallback;
  }
}

function deepMerge(base, override) {
  const result = Array.isArray(base) ? [...base] : { ...base };
  for (const [key, value] of Object.entries(override || {})) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      result[key] = deepMerge(base[key] || {}, value);
    } else {
      result[key] = value;
    }
  }
  return result;
}

function readSettings() {
  return deepMerge(DEFAULT_SETTINGS, readJson(getSettingsPath(), {}));
}

function writeSettings(settings) {
  const merged = deepMerge(DEFAULT_SETTINGS, settings);
  fs.mkdirSync(path.dirname(getSettingsPath()), { recursive: true });
  fs.writeFileSync(getSettingsPath(), JSON.stringify(merged, null, 2));
  return merged;
}

function ensureMemoryBank(memoryBankPath) {
  if (!memoryBankPath) {
    throw new Error('Choose a memory bank drive or folder first.');
  }

  const folders = [
    'lightweight-transcripts',
    'downloaded-streams',
    'sessions',
    path.join('archives', 'completed-series'),
    path.join('make', 'outgoing'),
    path.join('make', 'processed'),
    'logs',
    'sources'
  ];

  fs.mkdirSync(memoryBankPath, { recursive: true });
  for (const folder of folders) {
    fs.mkdirSync(path.join(memoryBankPath, folder), { recursive: true });
  }

  const notesPath = path.join(memoryBankPath, 'zora-notes.md');
  if (!fs.existsSync(notesPath)) {
    fs.writeFileSync(notesPath, `# Zora Notes\n\n## Creator preferences\n- Zora lives in this memory bank.\n\n## Recurring projects\n\n## Content ideas\n\n## Decisions\n\n## Open questions\n`);
  }

  const settingsPath = path.join(memoryBankPath, 'settings.json');
  if (!fs.existsSync(settingsPath)) {
    fs.writeFileSync(settingsPath, JSON.stringify({ createdBy: APP_NAME, createdAt: new Date().toISOString() }, null, 2));
  }

  return {
    memoryBankPath,
    notesPath,
    folders: folders.map((folder) => path.join(memoryBankPath, folder))
  };
}

function createSession(settings) {
  if (!settings.memoryBankPath) {
    throw new Error('Choose a memory bank before starting a session log.');
  }

  ensureMemoryBank(settings.memoryBankPath);
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const sessionId = `${stamp}-stream-session`;
  const sessionDir = path.join(settings.memoryBankPath, 'sessions', sessionId);
  fs.mkdirSync(sessionDir, { recursive: true });

  const session = {
    sessionId,
    startedAt: new Date().toISOString(),
    status: 'logging',
    transcriptPath: path.join(sessionDir, 'transcript.jsonl'),
    videoBackupPath: '',
    notes: 'MVP shell session placeholder. Transcript chunks will be written here once STT is connected.'
  };

  fs.writeFileSync(path.join(sessionDir, 'session.json'), JSON.stringify(session, null, 2));
  fs.writeFileSync(session.transcriptPath, '');
  return { sessionId, sessionDir, session };
}

function updateSessionStatus(settings, status) {
  if (!settings.memoryBankPath || !settings.activeSessionId) {
    return null;
  }

  const sessionPath = path.join(settings.memoryBankPath, 'sessions', settings.activeSessionId, 'session.json');
  const session = readJson(sessionPath, null);
  if (!session) {
    return null;
  }

  session.status = status;
  session.updatedAt = new Date().toISOString();
  if (status === 'closed') {
    session.endedAt = new Date().toISOString();
  }
  fs.writeFileSync(sessionPath, JSON.stringify(session, null, 2));
  return session;
}

function buildDiagnostics(settings) {
  const hasMemoryBank = Boolean(settings.memoryBankPath && fs.existsSync(settings.memoryBankPath));
  return [
    {
      id: 'memory-bank',
      label: 'Memory bank',
      status: hasMemoryBank ? 'ok' : 'warning',
      message: hasMemoryBank ? 'Protected memory bank folder is available.' : 'Choose Zora\'s memory bank drive/folder.'
    },
    {
      id: 'obs',
      label: 'OBS',
      status: settings.providers.obs.enabled ? 'warning' : 'warning',
      message: settings.providers.obs.enabled
        ? 'OBS provider is enabled. Live WebSocket verification comes in the next integration step.'
        : 'OBS is not configured. Hub should warn before streaming.'
    },
    {
      id: 'warudo',
      label: 'Warudo',
      status: settings.providers.warudo.enabled ? 'warning' : 'warning',
      message: settings.providers.warudo.enabled
        ? 'Warudo provider is enabled. Trigger bridge verification comes in the next integration step.'
        : 'Warudo is not configured. Zora can show setup warnings.'
    },
    {
      id: 'tts',
      label: 'TTS',
      status: settings.providers.tts.enabled ? 'warning' : 'warning',
      message: settings.providers.tts.enabled
        ? 'TTS provider is enabled. Playback testing comes in the next audio step.'
        : 'TTS is not configured. Zora cannot speak live warnings yet.'
    },
    {
      id: 'drive',
      label: 'Google Drive',
      status: settings.providers.drive.enabled ? 'warning' : 'idle',
      message: settings.providers.drive.enabled
        ? 'Drive provider is enabled. OAuth upload test is not implemented in the shell.'
        : 'Drive upload is disabled until configured.'
    },
    {
      id: 'make',
      label: 'Make webhook',
      status: settings.providers.make.enabled ? 'warning' : 'idle',
      message: settings.providers.make.enabled
        ? 'Make provider is enabled. Webhook test is not implemented in the shell.'
        : 'Make automation is disabled until configured.'
    }
  ];
}

function createWindow() {
  const window = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 1040,
    minHeight: 720,
    title: 'Zora Desktop Hub',
    backgroundColor: '#081126',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  window.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('settings:read', () => readSettings());

ipcMain.handle('settings:save', (_event, settings) => writeSettings(settings));

ipcMain.handle('memory-bank:select', async () => {
  const result = await dialog.showOpenDialog({
    title: 'Choose Zora memory bank drive or folder',
    properties: ['openDirectory', 'createDirectory']
  });

  if (result.canceled || result.filePaths.length === 0) {
    return { canceled: true, settings: readSettings() };
  }

  const settings = readSettings();
  settings.memoryBankPath = result.filePaths[0];
  ensureMemoryBank(settings.memoryBankPath);
  return { canceled: false, settings: writeSettings(settings), memoryBank: ensureMemoryBank(settings.memoryBankPath) };
});

ipcMain.handle('memory-bank:open', async () => {
  const settings = readSettings();
  if (!settings.memoryBankPath) {
    throw new Error('Choose a memory bank first.');
  }
  ensureMemoryBank(settings.memoryBankPath);
  await shell.openPath(settings.memoryBankPath);
  return settings.memoryBankPath;
});

ipcMain.handle('diagnostics:run', () => buildDiagnostics(readSettings()));

ipcMain.handle('session:start', () => {
  const settings = readSettings();
  const created = createSession(settings);
  settings.activeSessionId = created.sessionId;
  settings.loggingState = 'logging';
  return { settings: writeSettings(settings), created };
});

ipcMain.handle('session:set-state', (_event, loggingState) => {
  const settings = readSettings();
  settings.loggingState = loggingState;
  const session = updateSessionStatus(settings, loggingState);
  return { settings: writeSettings(settings), session };
});

ipcMain.handle('zora:set-state', (_event, zoraState) => {
  const settings = readSettings();
  settings.zoraState = zoraState;
  return writeSettings(settings);
});
