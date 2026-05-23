# Complete Zora App Requirements

This document collects the practical pieces Zora needs to become a usable
downloadable desktop app for streaming and post-stream content creation.

## Requirement groups

Zora needs these major systems:

1. Desktop UI and tray/background mode.
2. First-run setup wizard.
3. Local privacy and data controls.
4. Crash recovery for long streams.
5. Audio routing for mic, TTS, OBS, and Warudo.
6. Source and citation tracking.
7. Update and release system.
8. Panic/safety mode.
9. Plugin-style integration layer.
10. Personality tuning panel.

## 1. Desktop UI

Required screens:

- Home/status dashboard in a dark blue and pinky-purple hub theme, including
  logging state and critical error state.
- Live transcript and rolling context.
- Stream sessions archive.
- Notes editor for `zora-notes.md`.
- Script review workspace.
- Integration settings and test buttons.
- Audio routing settings.
- Privacy/data controls.
- Personality tuning.
- Logs and troubleshooting.

Status indicators should show:

- Zora state: idle, listening, resting, sleeping, thinking, speaking, muted, or
  panic.
- OBS status: disconnected, connected, streaming, recording/video mode, not
  streaming/recording, warning.
- Warudo status: disconnected, connected, current avatar expression/state,
  including hover, sleep, awake, listening, speaking, muted, and panic triggers.
- Session status: not logging, logging, paused, recovering, processing.
- Drive status: disabled, authorized, uploading, uploaded, error.
- Make status: disabled, webhook ready, sending, accepted, failed.
- Web research status: disabled, enabled, lookup in progress, source saved.
- Internet status: online, degraded, offline.
- TTS status: ready, speaking, failed.

## 2. First-run setup wizard

The wizard should configure everything a creator needs before stream.

Required steps:

1. Select microphone.
2. Select Zora TTS output.
3. Configure optional virtual audio cable.
4. Choose local data folder.
5. Configure hotkeys.
6. Test "hey Zora", "Zora rest", and "Zora awaken".
7. Connect Warudo.
8. Connect OBS.
9. Configure STT, LLM, and TTS providers.
10. Enable or skip web lookup.
11. Authorize or skip Google Drive.
12. Choose whether Zora starts with Windows.

The app should allow skipping optional integrations and returning later.

## 3. Privacy and data controls

Zora should make creator control obvious.

Required actions:

- Pause listening.
- Pause logging.
- Stop speaking.
- Clear rolling context.
- Clear or edit long-term notes.
- Delete a stream session.
- Export a stream session.
- Disable web lookup.
- Disable Drive upload.
- Revoke or remove provider credentials.
- Export all Zora data.
- Reset Zora without deleting chosen archives unless confirmed.

Raw transcripts, raw audio, private notes, and credentials should never upload by
default.

## 4. Crash recovery

Long streams require defensive saving.

Requirements:

- Write transcript segments as JSONL chunks during the session.
- Flush session metadata frequently.
- Keep current state in a recoverable session file.
- Detect unfinished sessions on launch.
- Offer recover, close, export, or delete actions.
- Keep post-stream script generation separate from transcript capture so script
  failures do not damage raw transcript logs.

## 5. Audio routing

Zora should show audio routing clearly in settings.

Required controls:

- Microphone input device.
- TTS output device.
- Optional monitor output.
- Optional virtual audio cable.
- OBS audio source test.
- Warudo lip sync test.
- Volume and gain controls.
- Optional ducking while Zora speaks.
- Mute and panic buttons.

## 6. Source and citation tracking

Every internet lookup used in a script should leave source notes.

Required fields:

- Lookup query.
- Reason for lookup.
- Source title.
- Source URL.
- Source type.
- Retrieved timestamp.
- Short summary.
- Reliability notes.
- Related script section.
- Related stream timestamp, if any.

## 7. Updates and releases

The downloadable app should be versioned and recoverable.

Requirements:

- Version visible in the app.
- Release notes visible before updating.
- Backup/compatibility check before major migrations.
- Safe rollback or clear failure state if an update fails.
- Local data remains accessible after update.
- Uninstaller explains where local data lives.

## 8. Panic/safety mode

Panic mode should be available from a hotkey, tray menu, and app button.

Panic mode should:

- Stop TTS immediately.
- Mute Zora audio.
- Pause listening.
- Pause transcript logging.
- Send Warudo to a muted/resting/sleeping pose.
- Optionally hide Zora's OBS scene.
- Show a visible panic state in the app.
- Require manual awaken/resume.

## 9. Plugin/integration layer

External dependencies should be replaceable.

Initial integrations:

- OBS WebSocket for streaming status and optional scene controls.
- Warudo bridge for expressions and avatar state, starting with a human avatar
  but configured with Zora's practical-fairy triggers.
- STT provider for transcription.
- LLM provider for response generation and post-stream processing.
- TTS provider for Zora's voice.
- Web lookup provider for internet research.
- Google Drive API for approved document uploads.
- Local storage/search for transcripts, notes, sources, archived series, and
  Make export packages.
- Make webhook or file-drop integration for approved script/video automation.

Each integration should provide:

- Enabled/disabled state.
- Connection test.
- Last error.
- Safe fallback behavior.
- Minimal required permissions.

## 10. Personality tuning

The app should expose Zora's style as settings.

Controls:

- Answer length.
- Speaking frequency.
- Playfulness.
- Fairy sparkle level.
- Support versus pushback.
- Follow-up question frequency.
- Spiritual/scientific framing balance.
- Quantum/speculative-topic caution.
- YouTube angle suggestions.
- Maximum live answer duration.

## MVP definition

The first downloadable MVP is complete when Zora can:

- Install and launch from a desktop shortcut.
- Run in tray/background mode.
- Complete first-run setup.
- Listen, rest, awaken, mute, and panic by hotkey or command.
- Save timestamped transcript chunks during a test session.
- Recover an unfinished session after restart.
- Trigger Warudo idle/listening/resting/speaking states.
- Detect OBS streaming state and show sleeping animation while resting live.
- Produce a basic post-stream outline from a saved transcript.
- Open/edit `zora-notes.md`.
- Show all configured integrations and their statuses.
- Prepare approved script or information-page packages for Make video workflows.
- Archive completed series while keeping them searchable.


## Protected memory bank and retention

Zora's memory bank should be selected during install and treated as her local
home. The app should use an outbound-only network posture: Zora can reach out to
approved services, but external services cannot reach into the drive.

Requirements:

- Ask for the memory bank drive/folder during install.
- Store lightweight transcripts and summaries as active memory.
- Store downloaded stream videos in the memory bank as transcript recovery
  backups.
- Archive heavy files after 3 months into `YYYY-MM/topic-name/` folders.
- Keep archived summaries searchable.
- Store secrets in the OS credential vault or encrypted vault, not plain text.

## Provider settings explained

Provider settings are the services Zora connects to. They should be editable so
Zora is not locked into one vendor.

Examples:

- STT provider: turns voice into text.
- LLM provider: generates Zora's answers and scripts.
- TTS provider: turns Zora's text into voice.
- Web research provider: searches or browses the internet.
- Google Drive provider: uploads approved documents.
- Make provider: sends approved video packages to Make.
- OBS provider: reads streaming/recording status and controls scenes if allowed.
- Warudo provider: sends expression and state triggers.

## Live failure handling

When critical systems fail during stream, Zora should both display the error in
the hub and speak a short warning if TTS is still available:

```text
Hey listen, we have a problem somewhere. Pause the stream.
```

Critical failures:

- OBS is not streaming or recording when expected.
- Warudo is disconnected or missing required triggers.
- Internet is down.
- Drive upload fails.
- Make webhook fails.
- TTS fails mid-stream.
- Memory bank drive is unavailable or low on space.

The hub should show the raw error, friendly explanation, likely impact, and next
recommended action.
