const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('zora', {
  readSettings: () => ipcRenderer.invoke('settings:read'),
  saveSettings: (settings) => ipcRenderer.invoke('settings:save', settings),
  selectMemoryBank: () => ipcRenderer.invoke('memory-bank:select'),
  openMemoryBank: () => ipcRenderer.invoke('memory-bank:open'),
  runDiagnostics: () => ipcRenderer.invoke('diagnostics:run'),
  startSession: () => ipcRenderer.invoke('session:start'),
  setLoggingState: (state) => ipcRenderer.invoke('session:set-state', state),
  setZoraState: (state) => ipcRenderer.invoke('zora:set-state', state)
});
