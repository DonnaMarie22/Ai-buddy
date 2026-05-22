# AI Buddy

AI Buddy is a streaming companion concept for a small 3D character that sits on
stream, listens while you talk, and answers questions as an in-world computer
sidekick.

The goal is not to replace the streamer. The buddy should feel like a responsive
co-host in the corner of the screen: useful for quick questions, playful enough
to have personality, and quiet enough that it does not talk over the show.

## Core experience

- A small 3D avatar appears in the top-right of the stream layout.
- The streamer can ask natural voice questions during a broadcast.
- The buddy listens for either a wake phrase or push-to-talk input.
- The buddy thinks through the request, replies with text-to-speech, and animates
  in a face/VTuber rig such as Warudo, VSeeFace, Animaze, or legacy FaceRig.
- The avatar idles when not in use and can show simple reactions while speaking,
  listening, surprised, or thinking.

## MVP scope

1. Capture microphone audio with a wake phrase or hotkey.
2. Transcribe the streamer's question.
3. Send the transcript to an LLM with a short "computer buddy" persona prompt.
4. Generate a short spoken answer with TTS.
5. Route the audio to OBS and the avatar application.
6. Trigger avatar expressions for idle, listening, thinking, and speaking.

## Suggested local stack

| Layer | Recommended first choice | Notes |
| --- | --- | --- |
| Avatar app | Warudo | Strong streamer workflow and expression triggers. |
| Capture/compositing | OBS | Add the avatar as a transparent/window/game capture source. |
| Speech-to-text | Whisper or a hosted STT API | Start hosted for simplicity; move local later if latency is good. |
| AI response | Hosted LLM API | Keep answers concise for stream pacing. |
| Text-to-speech | ElevenLabs, Azure, or local TTS | Pick a voice that is distinct from the streamer. |
| Orchestration | Small local Python or Node service | Owns hotkeys, prompts, state, and avatar triggers. |

## Design docs

- [Architecture](docs/architecture.md)
- [Stream setup checklist](docs/stream-setup.md)
- [Personality and behavior guide](docs/personality.md)

## Stream behavior principles

- Keep answers brief unless the streamer asks for detail.
- Never interrupt unless explicitly invited by a wake phrase, hotkey, or command.
- Prefer "I can look that up" or "I am not sure" over confident guesses.
- Avoid reading private data, chat messages, or on-screen content unless that
  input source has been deliberately enabled.
- Make it easy to mute, pause, or bypass the buddy live.

## First build milestone

The first useful prototype should run locally, listen only while a hotkey is
held, print transcripts and responses to the console, speak the response through
TTS, and expose a simple trigger that Warudo or OBS can react to.
