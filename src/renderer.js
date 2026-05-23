const PROVIDER_ORDER = ['stt', 'llm', 'tts', 'web', 'drive', 'make', 'obs', 'warudo'];

const providerDescriptions = {
  stt: 'Turns your voice into lightweight transcripts.',
  llm: 'Generates Zora replies, outlines, and scripts.',
  tts: 'Gives Zora her spoken voice.',
  web: 'Allows approved internet lookups.',
  drive: 'Uploads approved documents to Google Drive.',
  make: 'Sends approved video packages to Make.',
  obs: 'Reads streaming/recording status from OBS.',
  warudo: 'Sends hover, sleep, awake, speaking, panic, and other triggers.'
};

let settings = null;

const elements = {
  zoraState: document.querySelector('#zora-state'),
  loggingState: document.querySelector('#logging-state'),
  criticalWarning: document.querySelector('#critical-warning'),
  memoryBankPath: document.querySelector('#memory-bank-path'),
  chooseMemoryBank: document.querySelector('#choose-memory-bank'),
  openMemoryBank: document.querySelector('#open-memory-bank'),
  refreshDiagnostics: document.querySelector('#refresh-diagnostics'),
  statusGrid: document.querySelector('#status-grid'),
  providerList: document.querySelector('#provider-list'),
  saveProviders: document.querySelector('#save-providers'),
  startSession: document.querySelector('#start-session'),
  sessionLabel: document.querySelector('#session-label'),
  errorLog: document.querySelector('#error-log')
};

function titleCase(value) {
  return value.replace(/[-_]/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function renderSettings() {
  elements.zoraState.textContent = titleCase(settings.zoraState || 'resting');
  elements.loggingState.textContent = `Logging ${settings.loggingState || 'idle'}`;
  elements.memoryBankPath.textContent = settings.memoryBankPath || 'No memory bank selected yet.';
  elements.openMemoryBank.disabled = !settings.memoryBankPath;
  elements.sessionLabel.textContent = settings.activeSessionId ? `Active session: ${settings.activeSessionId}` : 'No active session.';
  elements.criticalWarning.classList.toggle('hidden', settings.zoraState !== 'panic');
  renderProviders();
}

function renderProviders() {
  elements.providerList.innerHTML = '';
  for (const providerId of PROVIDER_ORDER) {
    const provider = settings.providers[providerId];
    const card = document.createElement('article');
    card.className = 'provider-card';
    card.innerHTML = `
      <label>
        <input type="checkbox" data-provider-enabled="${providerId}" ${provider.enabled ? 'checked' : ''} />
        ${provider.label}
      </label>
      <p class="hint">${providerDescriptions[providerId]}</p>
      <input type="text" data-provider-label="${providerId}" value="${provider.label}" aria-label="${provider.label} label" />
    `;
    elements.providerList.appendChild(card);
  }
}

function collectProviderSettings() {
  for (const providerId of PROVIDER_ORDER) {
    const enabled = document.querySelector(`[data-provider-enabled="${providerId}"]`).checked;
    const label = document.querySelector(`[data-provider-label="${providerId}"]`).value.trim();
    settings.providers[providerId] = {
      ...settings.providers[providerId],
      enabled,
      label: label || settings.providers[providerId].label,
      status: enabled ? 'configured_pending_test' : 'not_configured'
    };
  }
}

function renderDiagnostics(diagnostics) {
  const internetStatus = navigator.onLine
    ? { id: 'internet', label: 'Internet', status: 'ok', message: 'Browser reports internet connectivity.' }
    : { id: 'internet', label: 'Internet', status: 'error', message: 'Internet appears offline. Zora should warn before web, Drive, Make, or provider calls.' };

  const allDiagnostics = [internetStatus, ...diagnostics];
  elements.statusGrid.innerHTML = '';
  elements.errorLog.innerHTML = '';

  for (const item of allDiagnostics) {
    const card = document.createElement('article');
    card.className = `status-card ${item.status}`;
    card.innerHTML = `
      <div class="status-label">
        <span>${item.label}</span>
        <span class="badge ${item.status}">${item.status}</span>
      </div>
      <p>${item.message}</p>
    `;
    elements.statusGrid.appendChild(card);

    if (item.status === 'warning' || item.status === 'error') {
      const entry = document.createElement('div');
      entry.className = `error-entry ${item.status === 'error' ? 'error' : ''}`;
      entry.textContent = `${item.label}: ${item.message}`;
      elements.errorLog.appendChild(entry);
    }
  }

  if (!elements.errorLog.children.length) {
    const empty = document.createElement('p');
    empty.className = 'hint';
    empty.textContent = 'No warnings yet. Zora is watching the tower lights.';
    elements.errorLog.appendChild(empty);
  }
}

async function refreshDiagnostics() {
  const diagnostics = await window.zora.runDiagnostics();
  renderDiagnostics(diagnostics);
}

async function setZoraState(state) {
  settings = await window.zora.setZoraState(state);
  renderSettings();
  await refreshDiagnostics();
}

async function setLoggingState(state) {
  const result = await window.zora.setLoggingState(state);
  settings = result.settings;
  renderSettings();
}

async function init() {
  settings = await window.zora.readSettings();
  renderSettings();
  await refreshDiagnostics();

  elements.chooseMemoryBank.addEventListener('click', async () => {
    const result = await window.zora.selectMemoryBank();
    if (!result.canceled) {
      settings = result.settings;
      renderSettings();
      await refreshDiagnostics();
    }
  });

  elements.openMemoryBank.addEventListener('click', async () => {
    await window.zora.openMemoryBank();
  });

  elements.refreshDiagnostics.addEventListener('click', refreshDiagnostics);

  elements.saveProviders.addEventListener('click', async () => {
    collectProviderSettings();
    settings = await window.zora.saveSettings(settings);
    renderSettings();
    await refreshDiagnostics();
  });

  elements.startSession.addEventListener('click', async () => {
    const result = await window.zora.startSession();
    settings = result.settings;
    renderSettings();
  });

  document.querySelectorAll('[data-zora-state]').forEach((button) => {
    button.addEventListener('click', () => setZoraState(button.dataset.zoraState));
  });

  document.querySelectorAll('[data-logging-state]').forEach((button) => {
    button.addEventListener('click', () => setLoggingState(button.dataset.loggingState));
  });

  window.addEventListener('online', refreshDiagnostics);
  window.addEventListener('offline', refreshDiagnostics);
}

init().catch((error) => {
  elements.errorLog.innerHTML = `<div class="error-entry error">Zora hub failed to initialize: ${error.message}</div>`;
});
