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


## Required desktop UI

Zora needs a practical control center, not just a tray icon.

Required views:

- **Home/status:** current state, OBS status, Warudo status, stream session, and
  whether Zora is listening, resting, muted, speaking, or processing.
- **Live transcript:** recent transcript chunks, active wake/control phrase hits,
  and current rolling context summary.
- **Sessions:** previous streams, transcript status, summaries, highlights,
  scripts, and Drive export links.
- **Notes:** open/edit `zora-notes.md` safely.
- **Scripts:** review generated YouTube scripts before upload.
- **Integrations:** OBS, Warudo, STT, TTS, LLM, web lookup, and Google Drive
  connection status.
- **Settings:** hotkeys, audio devices, storage, privacy, update behavior, and
  personality tuning.
- **Logs:** app events and errors that can be copied for troubleshooting.

## First-run setup wizard

The first-run wizard should make Zora usable without editing config files.

Setup steps:

1. Choose microphone input.
2. Choose Zora TTS output and optional virtual audio cable.
3. Configure listen/rest/awaken/mute/stop hotkeys.
4. Connect Warudo or choose manual trigger mode.
5. Connect OBS or choose manual streaming-status mode.
6. Configure STT, LLM, and TTS providers.
7. Enable or skip web research.
8. Authorize or skip Google Drive.
9. Choose local data folder.
10. Choose startup behavior: manual launch, start with Windows, or tray mode.
11. Test voice commands: "hey Zora", "Zora rest", and "Zora awaken".

## Privacy and data controls

Zora should make data ownership obvious.

Required controls:

- Pause/resume listening.
- Pause/resume transcript logging.
- Delete a stream session.
- Export a stream session.
- Clear rolling context.
- Open and edit `zora-notes.md`.
- Disable web lookup.
- Disable Google Drive upload.
- Remove provider credentials.
- Export all local Zora data.
- Uninstall or reset without leaving hidden transcripts behind.

## Crash recovery

A stream can last 3-4 hours, so Zora should assume interruptions can happen.

Requirements:

- Autosave transcript chunks frequently.
- Keep session metadata updated while streaming.
- Mark unfinished sessions as recoverable.
- Recover or close an unfinished session on next launch.
- Preserve partial transcripts even if script generation fails.
- Never wait until stream end to write the only copy of a transcript.

## Audio routing

The app should guide the creator through a clean audio setup.

Required routes:

- Streamer microphone input into Zora STT.
- Zora TTS output into OBS.
- Zora TTS output into Warudo lip sync.
- Optional virtual audio cable for separating Zora from desktop audio.
- Volume control and optional ducking so Zora does not overpower the stream.
- Test buttons for mic level, TTS playback, OBS audio, and Warudo lip sync.

## Source and citation system

When Zora looks something up, those sources should be saved with the answer or
script draft.

Required metadata:

- Query or reason for lookup.
- Source title and URL.
- Source type, such as official docs, article, paper, reference, or forum.
- Retrieved date/time.
- Short source summary.
- Claims that need human review.
- Links from script sections back to sources and stream timestamps.

## Updates and releases

As a downloadable app, Zora needs a versioned release path.

Requirements:

- App version visible in settings.
- Release notes available before update.
- Backup or compatibility check before major upgrades.
- Clear update failure handling.
- Local data remains available after updates.

## Panic mode

Panic mode is the emergency safety path for live streams.

It should immediately:

- Stop TTS playback.
- Mute Zora audio.
- Pause listening and logging.
- Send Warudo to muted/resting/sleeping pose.
- Optionally hide the OBS Zora scene if configured.
- Show a clear app status that Zora is in panic mode.

## Plugin/integration layer

Zora should treat external services as replaceable integrations.

Initial integration targets:

- OBS WebSocket.
- Warudo trigger bridge.
- Google Drive API.
- Web search/browser API.
- STT provider.
- TTS provider.
- LLM provider.
- Local storage/indexing.

Each integration should have connection status, test action, error message, and a
safe disabled state.

## Personality tuning panel

Zora needs creator-facing personality controls.

Settings should include:

- Answer length: short, normal, detailed.
- Speaking frequency: quiet, balanced, active.
- Playfulness: low, medium, high.
- Challenge level: supportive, balanced, pushback.
- Spiritual/scientific framing balance.
- Quantum/speculative-topic caution level.
- Whether Zora asks follow-up questions.
- Whether Zora can suggest YouTube angles after a rant.
- Maximum response duration while live.
