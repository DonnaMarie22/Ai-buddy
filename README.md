# Zora AI Buddy

Zora is a streaming companion concept for a small 3D character that sits on
stream, listens while you talk, and answers questions as an in-world computer
sidekick.

The goal is not to replace the streamer. Zora should feel like a responsive
co-host in the corner of the screen: useful for quick questions, playful enough
to have personality, and quiet enough that she does not talk over the show.

## Core experience

- A small 3D avatar appears in the top-right of the stream layout.
- Zora listens in the background so she can understand the recent rant or topic.
- The streamer can ask natural voice questions during a broadcast with "hey
  Zora".
- Zora thinks through the request, replies with text-to-speech, and animates in a
  face/VTuber rig such as Warudo, VSeeFace, Animaze, or legacy FaceRig.
- Zora can log a full 3-4 hour stream transcript for post-stream review.
- After stream, Zora can compile the strongest talking points and draft YouTube
  scripts from the conversation.
- The avatar idles when not in use and can show simple reactions while speaking,
  listening, surprised, or thinking.

## MVP scope

1. Keep a short local rolling transcript or summary of the streamer's recent
   rant/context.
2. Detect the wake phrase "hey Zora" before answering.
3. Transcribe the streamer's question and attach the recent context.
4. Send the request to an LLM with a short Zora persona prompt.
5. Generate a short spoken answer with TTS.
6. Route the audio to OBS and the avatar application.
7. Trigger avatar expressions for idle, listening, thinking, and speaking.
8. Save the long-form stream transcript with timestamps for post-stream content
   processing.
9. Generate highlight notes, talking points, and YouTube script drafts from the
   best segments.

## Suggested local stack

| Layer | Recommended first choice | Notes |
| --- | --- | --- |
| Avatar app | Warudo | Strong streamer workflow and expression triggers. |
| Capture/compositing | OBS | Add the avatar as a transparent/window/game capture source. |
| Speech-to-text | Whisper or a hosted STT API | Start hosted for simplicity; move local later if latency is good. |
| AI response | Hosted LLM API | Keep answers concise for stream pacing. |
| Text-to-speech | ElevenLabs, Azure, or local TTS | Pick a voice that is distinct from the streamer. |
| Orchestration | Small local Python or Node service | Owns wake phrase detection, prompts, context, state, avatar triggers, and post-stream jobs. |
| Storage | Local files or SQLite | Stores timestamped transcripts, summaries, highlights, and script drafts. |

## Design docs

- [Architecture](docs/architecture.md)
- [Stream setup checklist](docs/stream-setup.md)
- [Personality and behavior guide](docs/personality.md)
- [Stream-to-YouTube content pipeline](docs/content-pipeline.md)

## Stream behavior principles

- Keep answers brief unless the streamer asks for detail.
- Never interrupt unless explicitly invited by "hey Zora", a hotkey, or a
  command.
- Treat background rant context as private working memory, not public content to
  repeat unless asked.
- Treat full-stream logs as creator-owned source material that can be paused,
  reviewed, exported, or deleted.
- Prefer "I can look that up" or "I am not sure" over confident guesses.
- Avoid reading private data, chat messages, or on-screen content unless that
  input source has been deliberately enabled.
- Make it easy to mute, pause, or bypass Zora live.

## First build milestone

The first useful prototype should run locally, keep a short private rolling
context of what the streamer has been saying, answer only after "hey Zora", print
transcripts and responses to the console, speak the response through TTS, expose
a simple trigger that Warudo or OBS can react to, and save a timestamped stream
log for later content review.

Example prompts:

- "Hey Zora, what do you think about that?"
- "Hey Zora, does this build make sense or should I try the other one?"
- "Hey Zora, what is the difference between this idea and that one?"
- "Hey Zora, give me the quick version of what I was just ranting about."


## Post-stream content milestone

The next milestone is a creator workflow that ingests a 3-4 hour stream log and
produces:

- A timestamped conversation outline.
- The best talking points and quotable moments.
- Topic clusters that could become separate videos or Shorts.
- Draft YouTube scripts with hooks, structure, suggested clips, and titles.
