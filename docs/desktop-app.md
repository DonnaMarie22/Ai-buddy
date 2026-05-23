# Downloadable Desktop App

Zora should be a downloadable app for the creator's computer, not just a script
or collection of prompts. The app is the brain that runs in the background while
Warudo provides Zora's visible face on stream. The app should feel like the
control hub of a practical fairy who got extra nerdy with computers and
information.

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

Warudo owns the 3D helpful fairy avatar presentation. OBS owns the final stream
layout.

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
9. Memory bank drive/folder location for lightweight transcripts, downloaded
   stream videos, notes, archives, sources, scripts, and automation exports.
10. Whether Zora should start with Windows.

## Background and tray mode

Zora should be comfortable running quietly in the background.

Expected behavior:

- System tray icon shows whether Zora is idle, listening, resting, speaking, or
  muted.
- Right-click menu exposes quick actions: rest, awaken, mute, stop speaking,
  start/stop session log, open notes, open settings, quit.
- Desktop window can show transcripts, logs, logging state, session status,
  Drive uploads, Make automation exports, archived series, errors, and script
  drafts.
- Closing the window can minimize to tray if background mode is enabled.

## Visual theme

Zora's desktop hub should use a dark blue and pinky-purple visual direction.
The feeling should be "fairy control tower": practical controls, readable status,
soft glow accents, and a little magic without sacrificing clarity.

Suggested palette:

- Deep navy background.
- Midnight blue panels.
- Pinky-purple accents.
- Soft lavender highlights.
- Bright status colors only for alerts, live streaming, and panic mode.

## Local data layout

A first version can keep data in a creator-selected memory bank folder chosen
during install:

```text
zora-memory-bank/
  settings.json
  zora-notes.md
  lightweight-transcripts/
  downloaded-streams/
    2026-05-23-stream-001.mp4
  logs/
    app.log
  sessions/
    2026-05-23-stream-001/
      transcript.jsonl
      summary.md
      talking-points.md
      video-ideas.md
      scripts/
      make-export.json
      drive-export.json
  archives/
    2026-05/
      spirituality-and-patterns/
      zora-build-series/
    completed-series/
  make/
    outgoing/
    processed/
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
- Zora asks where to store her memory bank during install.
- Zora can save transcripts and notes under the selected memory bank folder.
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
- Fairy sparkle: subtle, balanced, whimsical.
- Challenge level: supportive, balanced, pushback.
- Spiritual/scientific framing balance.
- Quantum/speculative-topic caution level.
- Whether Zora asks follow-up questions.
- Whether Zora can suggest YouTube angles after a rant.
- Maximum response duration while live.


## Completed series archive

The app should separate active projects from completed content series.

Archive behavior:

- Completed series can be moved into `archives/completed-series/`.
- Archived series remain searchable for memory and old transcript lookup.
- Archived series should not clutter the active scripts dashboard.
- Zora can use archived material as context when requested.
- Archive actions should be reversible or require confirmation.

## Make automation support

Zora should be able to work with Make workflows that transform scripts or
information pages into videos and upload them on a schedule.

The desktop app should prepare export packages that Make can pick up or receive
through a webhook.

Export package contents:

- Approved script markdown.
- Optional information page or research notes.
- Title and description draft.
- Source notes.
- Suggested clips or B-roll notes.
- Upload schedule metadata.
- Series/project name.
- Whether the item is a full video, Short, or information page.

Zora should not auto-submit rough drafts to Make. The creator should approve a
script or information page before it enters the automation queue.


## Protected memory bank drive

Zora's memory bank should live on a drive/folder chosen during install. The app
should treat that location as Zora's home base.

Security posture:

- No inbound network server is required for the memory bank.
- Zora may make outbound requests to approved services.
- Outside services should not be able to reach into the memory bank drive.
- Use local firewall rules to block unsolicited inbound traffic to Zora.
- Store raw keys/tokens in the OS credential vault when possible.
- If portable secrets are required, use an encrypted secrets vault in the memory
  bank rather than plain text files.

## Retention and archive policy

Lightweight transcripts and summaries are Zora's active memory. Heavy files should
move out of active work after 3 months.

Policy:

- Keep lightweight transcripts, summaries, and `zora-notes.md` active.
- Keep downloaded stream videos in the memory bank as a recovery source.
- After 3 months, archive heavy files by `YYYY-MM/topic-name/` folders.
- Keep archived folders searchable by summary and tags.
- Do not delete heavy archives automatically unless the creator enables deletion.

## Failure alerts

Critical failures should appear in the desktop hub and be spoken by Zora when it
is safe to do so.

Critical live alert phrase:

```text
Hey listen, we have a problem somewhere. Pause the stream.
```

The hub should show:

- OBS not streaming or not recording when expected.
- Warudo disconnected or missing triggers.
- Internet unavailable.
- Drive upload failure.
- Make webhook failure.
- TTS failure during stream.
- STT/LLM provider failure.
- Memory bank drive unavailable or low on space.
