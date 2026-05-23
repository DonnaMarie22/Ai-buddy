# Downloadable Desktop App

Zora should be a downloadable app for the creator's computer, not just a script
or collection of prompts. The app is the brain that runs in the background while
Warudo provides Zora's visible face on stream.

## Platform target

The first target should be Windows because the intended streaming stack is
Warudo + OBS on a streaming PC.

Later platforms can be considered if the audio, avatar, and streaming
integrations are practical there.

## App responsibilities

The Zora desktop app owns:

- Microphone capture and listening state.
- Wake phrase and control phrase detection.
- Hotkeys for listen, rest, awaken, mute, and stop.
- Rolling context for live answers.
- Full stream transcript logging.
- LLM, TTS, and web research integrations.
- Warudo expression/state triggers.
- OBS streaming-status awareness.
- Post-stream content processing.
- Google Drive export for reviewed documents.
- Local notes, settings, logs, and archives.

Warudo owns the 3D avatar presentation. OBS owns the final stream layout.

## Installer and first-run setup

The app should install like a normal desktop application.

First-run setup should ask for:

1. Microphone input.
2. Zora audio output or virtual audio cable.
3. Hotkeys for listen, rest, mute, stop, and show/hide.
4. Warudo connection settings.
5. OBS connection settings.
6. LLM/STT/TTS provider configuration.
7. Optional web research provider or browser/search API.
8. Optional Google Drive authorization.
9. Local data folder location.
10. Whether Zora should start with Windows.

## Background and tray mode

Zora should be comfortable running quietly in the background.

Expected behavior:

- System tray icon shows whether Zora is idle, listening, resting, speaking, or
  muted.
- Right-click menu exposes quick actions: rest, awaken, mute, stop speaking,
  start/stop session log, open notes, open settings, quit.
- Desktop window can show transcripts, logs, session status, Drive uploads, and
  script drafts.
- Closing the window can minimize to tray if background mode is enabled.

## Local data layout

A first version can keep data in a creator-selected folder:

```text
zora-data/
  settings.json
  zora-notes.md
  logs/
    app.log
  sessions/
    2026-05-23-stream-001/
      transcript.jsonl
      summary.md
      talking-points.md
      video-ideas.md
      scripts/
      drive-export.json
```

Secrets such as OAuth tokens and API keys should be stored in the operating
system credential store when possible, not in the repository or plain text notes.

## Release packaging

The project should eventually produce:

- A signed installer or packaged app for Windows.
- A versioned release artifact.
- Release notes.
- A clear update path.
- A way to export or back up local Zora data before uninstalling.

## MVP packaging path

A practical first implementation can start as a desktop shell around the local
controller, then mature into a polished installer.

MVP acceptance criteria:

- Zora launches from a desktop shortcut.
- Zora can run in the background/system tray.
- Zora can connect to Warudo and OBS settings.
- Zora can save transcripts and notes under a local data folder.
- Zora can be paused with "Zora rest" and resumed with "Zora awaken".
- Zora can be closed without corrupting the active session log.
