# Stream Setup Checklist

Use this checklist to assemble the first on-stream version of AI Buddy.

## Hardware and audio

- [ ] Dedicated microphone input selected for the streamer.
- [ ] Optional virtual audio cable for routing buddy TTS separately.
- [ ] Headphones or monitoring set up to avoid feedback.
- [ ] Buddy audio source has its own OBS volume slider.
- [ ] Emergency mute hotkey configured in OBS or the local controller.

## Avatar application

Recommended first target: Warudo.

- [ ] Import or select a small 3D avatar.
- [ ] Build an idle pose suitable for the top-right corner.
- [ ] Configure lip sync from the buddy TTS audio source.
- [ ] Add expression triggers for idle, listening, thinking, and speaking.
- [ ] Test transparent capture or chroma-key capture into OBS.

Alternatives:

- VSeeFace for a lightweight VRM avatar workflow.
- Animaze for a FaceRig-like workflow.
- FaceRig only if an existing setup already depends on it.

## OBS scene layout

- [ ] Create a scene group or nested scene named `AI Buddy`.
- [ ] Add the avatar capture source.
- [ ] Position the avatar in the top-right corner.
- [ ] Add a dedicated buddy audio source.
- [ ] Add an optional caption source for the buddy's spoken reply.
- [ ] Create a hotkey to hide/show the entire buddy scene.

## Local controller

- [ ] Add a push-to-talk or wake phrase trigger.
- [ ] Confirm the controller records only while triggered.
- [ ] Print transcripts locally for debugging.
- [ ] Send short responses to TTS.
- [ ] Trigger avatar state changes:
  - `listening` when recording starts.
  - `thinking` while waiting for the AI response.
  - `speaking` while TTS plays.
  - `idle` after playback ends.

## Stream safety checks

- [ ] Buddy can be muted instantly.
- [ ] Buddy does not answer without the trigger.
- [ ] Buddy does not claim access to desktop, game, chat, or private data unless
      those inputs have been intentionally connected.
- [ ] TTS volume is balanced against game, music, and streamer microphone.
- [ ] Test a few common questions before going live.

## First live test script

Try these before using the buddy in a real broadcast:

1. "Hey buddy, introduce yourself in one sentence."
2. "What is one interesting fact about the moon?"
3. "Give me a short answer: why is the sky blue?"
4. "Stop talking."
5. Mute and unmute the buddy from OBS or the controller.
