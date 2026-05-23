# Zora AI Buddy

Zora is a downloadable desktop app that runs in the background on your
computer and powers a small 3D character on stream. The app listens while you
talk, answers questions as an in-world computer sidekick, and uses Warudo as her
visible face/avatar rig.

The goal is not to replace the streamer. Zora should feel like a responsive
co-host in the corner of the screen: useful for quick questions, playful enough
to have personality, and quiet enough that she does not talk over the show.

## Core experience

- Zora installs as her own desktop app on the streaming PC.
- Zora can run in the background or system tray while streaming.
- A small Warudo-powered 3D avatar appears in the top-right of the stream layout.
- Zora listens in the background so she can understand the recent rant or topic.
- The streamer can ask natural voice questions during a broadcast with "hey
  Zora".
- Zora thinks through the request, replies with text-to-speech, and animates in a
  Warudo 3D avatar rig.
- "Zora rest" pauses background listening/logging.
- "Zora awaken" resumes background listening/logging.
- If OBS is live while Zora is asleep, Warudo should keep her visible with a
  sleeping animation so viewers know she is intentionally resting.
- A hotkey can also force listen, pause, mute, or stop as a reliable manual
  backup during live streams.
- Zora can log a full 3-4 hour stream transcript for post-stream review.
- After stream, Zora can compile the strongest talking points and draft YouTube
  scripts from the conversation.
- Zora can upload reviewed script documents to a Google Drive workspace.
- Zora can look up old transcripts and keep lightweight notes so future streams
  remember important context without re-reading everything.
- Zora is prepared to discuss spirituality, history, human beings, the body,
  awakening theories, astrology, religion, quantum sciences, and other subjects
  about human patterns with curiosity and nuance.
- Zora can look things up on the internet when current facts, sources, or extra
  research are needed.
- The avatar idles when not in use and can show simple reactions while speaking,
  listening, surprised, or thinking.

## MVP scope

1. Ship as a downloadable desktop app with an installer and first-run setup.
2. Keep a short local rolling transcript or summary of the streamer's recent
   rant/context.
3. Support hotkeys for manual listen, pause, mute, and stop controls.
4. Detect control phrases: "Zora rest" to pause listening and "Zora awaken"
   to resume listening.
5. Detect the wake phrase "hey Zora" before answering questions.
6. Transcribe the streamer's question and attach the recent context.
7. Send the request to an LLM with a short Zora persona prompt.
8. Generate a short spoken answer with TTS.
9. Route the audio to OBS and Warudo.
10. Trigger Warudo expressions for idle, listening, resting/sleeping, thinking,
    and speaking.
11. Save the long-form stream transcript with timestamps for post-stream content
    processing.
12. Generate highlight notes, talking points, and YouTube script drafts from the
    best segments.
13. Upload approved script documents to Google Drive.
14. Look up internet sources when the answer needs current or verifiable
    information.
15. Maintain a low-impact notes file for durable preferences, recurring topics,
    open ideas, and useful facts from prior conversations.
16. Provide a desktop UI for status, settings, transcripts, notes, scripts, and
    integrations.
17. Include privacy controls, crash recovery, source notes, update handling,
    panic mode, integration plugins, and personality tuning.

## Suggested local stack

| Layer | Recommended first choice | Notes |
| --- | --- | --- |
| Zora desktop app | Downloadable Windows-first desktop app | Owns listening, wake phrases, memory, web research, scripts, Drive export, and state. |
| Face/avatar rig | Warudo | Chosen platform for Zora's visible 3D face, scene workflow, and expression triggers. |
| Capture/compositing | OBS | Captures the Warudo avatar and Zora audio as stream sources. |
| Speech-to-text | Whisper or a hosted STT API | Start hosted for simplicity; move local later if latency is good. |
| AI response | Hosted LLM API | Keep answers concise for stream pacing and clear about belief, tradition, theory, evidence, and sources. |
| Text-to-speech | ElevenLabs, Azure, or local TTS | Pick a voice that is distinct from the streamer. |
| Orchestration | Small local Python or Node service inside the Zora app | Coordinates wake phrase detection, prompts, context, state, Warudo triggers, and post-stream jobs. |
| Storage | Local files or SQLite | Stores timestamped transcripts, summaries, highlights, script drafts, and compact memory notes. |
| Web research | Search/browser API | Looks up current facts, sources, and references when Zora needs internet context. |
| Cloud export | Google Drive API | Uploads reviewed scripts and content packages to a creator-owned Drive folder. |

## Design docs

- [Architecture](docs/architecture.md)
- [Downloadable desktop app](docs/desktop-app.md)
- [Complete app requirements](docs/app-requirements.md)
- [Stream setup checklist](docs/stream-setup.md)
- [Personality and behavior guide](docs/personality.md)
- [Stream-to-YouTube content pipeline](docs/content-pipeline.md)
- [Memory, transcript archive, and Google Drive export](docs/memory-and-drive.md)
- [Topic scope and discussion style](docs/topic-scope.md)
- [Web research and source handling](docs/web-research.md)

## Stream behavior principles

- Keep answers brief unless the streamer asks for detail.
- Never interrupt unless explicitly invited by "hey Zora", a hotkey, or a
  command.
- Treat "Zora rest" as an immediate pause for listening/logging and "Zora
  awaken" as the command to resume listening/logging.
- When OBS is actively streaming and Zora is resting, show a sleeping animation
  instead of removing her from the scene.
- Treat background rant context as private working memory, not public content to
  repeat unless asked.
- Treat full-stream logs as creator-owned source material that can be paused,
  reviewed, exported, or deleted.
- Upload only approved script documents to Google Drive; never upload raw
  transcripts automatically.
- Keep long-term notes compact and editable so Zora remembers useful context
  without building a giant hidden memory.
- Be open to spiritual, historical, religious, astrological, quantum, body,
  awakening, and human-pattern conversations while distinguishing facts,
  interpretations, traditions, evidence, and speculation.
- Use internet lookup for current facts, source checks, and research-backed
  claims instead of guessing.
- Prefer "I can look that up" or "I am not sure" over confident guesses.
- Avoid reading private data, chat messages, or on-screen content unless that
  input source has been deliberately enabled.
- Make it easy to mute, pause, or bypass Zora live.

## First build milestone

The first useful prototype should run locally as a desktop app or packaged app
shell, keep a short private rolling context of what the streamer has been saying,
answer only after "hey Zora", print transcripts and responses to the app log,
speak the response through TTS, expose a simple trigger that Warudo or OBS can
react to, and save a timestamped stream log for later content review.

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
- A Drive export package for reviewed scripts and content planning documents.
- Updates to a compact notes file with recurring topics, decisions, and ideas
  worth remembering next time.


## Complete app requirements

Zora's downloadable app should include the practical pieces needed for live use:

- Desktop window and tray UI for status, settings, transcripts, notes, and scripts.
- First-run setup for microphone, audio routing, hotkeys, Warudo, OBS, providers,
  web research, Google Drive, and storage.
- Privacy controls for pausing, deleting, exporting, and clearing local data.
- Crash recovery so long stream transcripts are autosaved safely.
- Audio routing for microphone input, TTS output, OBS, and Warudo lip sync.
- Source/citation tracking for web research and YouTube scripts.
- Update/version handling for downloadable releases.
- Panic mode for instant stop, mute, rest, and optional hide.
- Plugin-style integrations for OBS, Warudo, Drive, web, STT, TTS, and LLMs.
- Personality tuning for answer length, tone, spirituality/science balance, and
  how often Zora speaks.
