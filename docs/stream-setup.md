# Stream Setup Checklist

Use this checklist to assemble the first on-stream version of Zora.

## Hardware and audio

- [ ] Dedicated microphone input selected for the streamer.
- [ ] Optional virtual audio cable for routing Zora TTS separately.
- [ ] Headphones or monitoring set up to avoid feedback.
- [ ] Zora audio source has its own OBS volume slider.
- [ ] Emergency mute hotkey configured in OBS or the local controller.
- [ ] Visible indicator for whether background listening is active or paused.
- [ ] Enough local disk space for timestamped transcript logs.
- [ ] Clear naming convention for each stream session.
- [ ] Local folder for Zora notes, transcripts, and script drafts.
- [ ] Google Drive destination folder selected for approved script uploads.

## Avatar application

Chosen target: Warudo.

- [ ] Import or select a small 3D avatar for Zora.
- [ ] Build an idle pose suitable for the top-right corner.
- [ ] Configure lip sync from the Zora TTS audio source.
- [ ] Add expression triggers for idle, listening, resting, thinking, and speaking.
- [ ] Add a subtle listening indicator for wake phrase/background context mode.
- [ ] Add a resting/sleeping expression for the "Zora rest" command.
- [ ] Add an awaken transition for the "Zora awaken" command.
- [ ] Test transparent capture or chroma-key capture into OBS.

Alternatives:

- VSeeFace for a lightweight VRM avatar workflow.
- Animaze for a FaceRig-like workflow.
- FaceRig only if an existing setup already depends on it.

## OBS scene layout

- [ ] Create a scene group or nested scene named `Zora`.
- [ ] Add the avatar capture source.
- [ ] Position the avatar in the top-right corner.
- [ ] Add a dedicated Zora audio source.
- [ ] Add an optional caption source for Zora's spoken reply.
- [ ] Create a hotkey to hide/show the entire Zora scene.
- [ ] Create a hotkey to mute/pause Zora's background listener.

## Local controller

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
  - `thinking` while waiting for the AI response.
  - `speaking` while TTS plays.
  - `idle` after playback ends.
  - `muted` for hard mute or emergency stop.

## Stream safety checks

- [ ] Zora can be muted instantly.
- [ ] Zora does not answer without "hey Zora" or a manual trigger.
- [ ] "Zora rest" pauses background listening/logging.
- [ ] "Zora awaken" resumes background listening/logging.
- [ ] Hotkeys can override voice commands if speech detection fails.
- [ ] Zora does not repeat background rant context unless asked.
- [ ] Full-stream logs can be paused, exported, or deleted.
- [ ] Google Drive uploads require review/approval before raw transcripts are
      included.
- [ ] Long-term notes can be opened and edited manually.
- [ ] Zora does not claim access to desktop, game, chat, or private data unless
      those inputs have been intentionally connected.
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
7. Confirm the Warudo avatar enters the resting pose and logging pauses.
8. "Zora awaken."
9. Confirm the Warudo avatar returns to listening/idle and logging resumes.
10. Mute and unmute Zora from OBS or the controller.


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
