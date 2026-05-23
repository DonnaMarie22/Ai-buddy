# Stream Setup Checklist

Use this checklist to assemble the first on-stream version of the downloadable
Zora desktop app.

## Hardware and audio

- [ ] Dedicated microphone input selected for the streamer.
- [ ] Optional virtual audio cable for routing Zora TTS separately.
- [ ] Headphones or monitoring set up to avoid feedback.
- [ ] Zora audio source has its own OBS volume slider.
- [ ] Emergency mute hotkey configured in OBS or the local controller.
- [ ] Visible indicator for whether background listening is active or paused.
- [ ] Enough local disk space for timestamped transcript logs.
- [ ] Clear naming convention for each stream session.
- [ ] Specific drive/folder chosen for Zora's memory bank, notes, transcripts,
      archives, and script drafts.
- [ ] Internet lookup provider or browser/search API selected if web research is
      enabled.
- [ ] Google Drive destination folder selected for approved script uploads.

## Zora desktop app

Zora should install as her own local desktop app, with a background/tray mode for
streams. It owns listening, transcripts, memory, web lookup, script generation,
Drive export, and the state commands sent to Warudo.

The app should be able to start before Warudo and continue post-stream work after
Warudo or OBS closes.

- [ ] Install Zora from a downloadable installer or packaged app.
- [ ] Complete first-run setup for microphone, audio output, hotkeys, Warudo,
      OBS, web research, Google Drive, and local storage.
- [ ] Confirm Zora can run in the background/system tray.
- [ ] Confirm Zora can be started, paused, and closed without opening Warudo.
- [ ] Confirm local data folders are visible and configurable.

## Avatar face rig

Chosen target: Warudo.

- [ ] Use the current human Warudo avatar for the MVP.
- [ ] Configure the human avatar with Zora's practical-fairy triggers and states.
- [ ] Build a hover-style idle or subtle floating presence suitable for the
      top-right corner.
- [ ] Configure lip sync from the Zora TTS audio source.
- [ ] Add expression triggers for idle, listening, hover, sleeping/resting,
      awake, thinking, speaking, muted, and panic.
- [ ] Add a subtle fairy glow/listening indicator for wake phrase/background
      context mode, even while using the temporary human avatar.
- [ ] Add a resting/sleeping expression for the "Zora rest" command.
- [ ] Add a sleeping loop that plays when OBS is streaming and Zora is asleep.
- [ ] Add an awaken transition for the "Zora awaken" command.
- [ ] Test transparent capture or chroma-key capture into OBS.

Warudo is the committed choice for the MVP. The first Warudo model can be a
human avatar, but it should still read as Zora through triggers, expressions,
hover/sleep/awake states, and practical-fairy behavior. Other avatar tools are
out of scope unless the project later needs a separate compatibility layer.

## OBS scene layout

- [ ] Create a scene group or nested scene named `Zora`.
- [ ] Add the avatar capture source.
- [ ] Position the avatar in the top-right corner.
- [ ] Add a dedicated Zora audio source.
- [ ] Add an optional caption source for Zora's spoken reply.
- [ ] Create a hotkey to hide/show the entire Zora scene.
- [ ] Create a hotkey to mute/pause Zora's background listener.
- [ ] Connect OBS streaming status to the Zora desktop app if available.

## Local controller

The local controller lives inside the Zora desktop app and sends avatar state
updates to Warudo.

- [ ] Add the wake phrase `hey Zora`.
- [ ] Add the pause command `Zora rest`.
- [ ] Add the resume command `Zora awaken`.
- [ ] Add hotkeys for manual listen, pause/rest, mute, and stop controls.
- [ ] Add push-to-talk as a backup for noisy stream moments.
- [ ] Keep a short rolling transcript or summary of recent streamer context.
- [ ] Save a timestamped full-stream transcript for post-stream review.
- [ ] Keep or update a compact `zora-notes.md` file for durable context.
- [ ] Confirm Zora does not answer until the wake phrase or manual trigger fires.
- [ ] Print active questions and responses locally for debugging.
- [ ] Send short responses to TTS.
- [ ] Trigger avatar state changes:
  - `listening` while background context is active or the wake phrase is heard.
  - `resting` after "Zora rest" pauses listening/logging.
  - `sleeping` visual loop when OBS is live and Zora remains resting.
  - `thinking` while waiting for the AI response.
  - `speaking` while TTS plays.
  - `idle` after playback ends.
  - `muted` for hard mute or emergency stop.

## Stream safety checks

- [ ] Zora can be muted instantly.
- [ ] Zora does not answer without "hey Zora" or a manual trigger.
- [ ] "Zora rest" pauses background listening/logging.
- [ ] If OBS is streaming, "Zora rest" leaves Zora visible in a sleeping animation.
- [ ] "Zora awaken" resumes background listening/logging.
- [ ] Hotkeys can override voice commands if speech detection fails.
- [ ] Zora does not repeat background rant context unless asked.
- [ ] Full-stream logs can be paused, exported, or deleted.
- [ ] Google Drive uploads require review/approval before raw transcripts are
      included.
- [ ] Long-term notes can be opened and edited manually.
- [ ] Zora does not claim access to desktop, game, chat, internet, or private
      data unless those inputs have been intentionally connected.
- [ ] TTS volume is balanced against game, music, and streamer microphone.
- [ ] Test a few common questions before going live.

## First live test script

Try these before using Zora in a real broadcast:

1. "Hey Zora, introduce yourself in one sentence."
2. Rant for thirty seconds, then ask: "Hey Zora, what do you think about that?"
3. "Hey Zora, does this option or that option make more sense?"
4. "Hey Zora, give me the quick version of what I was just ranting about."
5. "Stop talking."
6. "Zora rest."
7. Confirm the Warudo avatar enters the resting/sleeping pose and logging pauses.
8. If OBS is streaming, confirm the sleeping animation stays visible as a cue.
9. "Zora awaken."
10. Confirm the Warudo avatar returns to listening/idle and logging resumes.
11. Mute and unmute Zora from OBS or the controller.


## Post-stream content checklist

After the broadcast ends:

- [ ] Close the stream session so the transcript has an end time.
- [ ] Generate a session outline with major topics and timestamps.
- [ ] Extract the best talking points and quotable moments.
- [ ] Group related moments into YouTube video ideas.
- [ ] Draft scripts for the strongest ideas.
- [ ] Review every script manually before publishing.
- [ ] Upload approved scripts and planning docs to Google Drive.
- [ ] Store the Drive links in the session metadata.
- [ ] Update `zora-notes.md` with durable decisions, recurring topics, and ideas.
- [ ] Delete or archive raw transcripts according to the creator's preference.


## Desktop app acceptance checklist

Before using Zora in a real stream, confirm:

- [ ] Desktop window opens from a shortcut.
- [ ] Tray icon shows listening/resting/muted/speaking state.
- [ ] Setup wizard has been completed.
- [ ] Microphone, TTS output, OBS audio, and Warudo lip sync tests pass.
- [ ] Warudo and OBS connection statuses are visible.
- [ ] Hotkeys work even when Zora is in the background.
- [ ] "Zora rest" pauses listening/logging and shows sleeping animation if OBS is
      streaming.
- [ ] "Zora awaken" resumes listening/logging.
- [ ] Panic mode stops TTS and pauses logging immediately.
- [ ] Transcript chunks autosave during a test session.
- [ ] Unfinished sessions can be recovered after restart.
- [ ] Source notes are saved when web lookup is used.
- [ ] Drive upload is disabled unless explicitly approved.
- [ ] Personality settings are visible and editable.


## Warudo trigger checklist

Even while the MVP uses a human avatar, configure the full Zora trigger set:

- [ ] Idle/present.
- [ ] Hover or subtle float.
- [ ] Listening.
- [ ] Thinking/studying.
- [ ] Speaking.
- [ ] Sleeping/resting after "Zora rest".
- [ ] Awake transition after "Zora awaken".
- [ ] Muted.
- [ ] Panic/emergency stop.
- [ ] OBS-live sleeping loop.
