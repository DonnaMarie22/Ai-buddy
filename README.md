# Zora AI Buddy

Zora is a downloadable desktop app that runs in the background on your
computer and powers a practical fairy on stream. She is a fairy who got extra
nerdy with computers and information: usually studying in her tower, fascinated
by everything human, and ready to help when called. The app listens while you
talk, answers questions as an in-world computer sidekick, and uses Warudo as her
visible face/avatar rig.

The goal is not to replace the streamer. Zora should feel like a responsive
helpful fairy in the corner of the screen: useful for quick questions, playful
enough to have personality, and quiet enough that she does not talk over the
show.

## Core experience

- Zora installs as her own desktop app on the streaming PC.
- Zora can run in the background or system tray while streaming.
- Zora's desktop hub uses a dark blue and pinky-purple visual theme for her
  controls, settings, memory, scripts, logging state, errors, and integrations.
- A Warudo-powered avatar appears in the top-right of the stream layout. The
  first model can be a human avatar, while Zora's triggers and behavior carry the
  practical-fairy identity until the visual model is updated.
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
- Zora can hand approved scripts or information pages to Make workflows that turn
  them into videos and schedule uploads.
- Zora's memory bank should live on a creator-selected drive with no inbound
  internet access; the app may reach out to approved services, but outside
  services should not be able to reach into the drive.
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
15. Ask during install where to store Zora's memory bank, including a specific
    drive or folder chosen by the creator.
16. Keep lightweight transcripts and summaries as Zora's active memory.
17. Archive heavy files after 3 months into month/topic folders.
18. Store downloaded stream videos in the memory bank so transcripts can be
    recovered from video if needed.
19. Maintain a low-impact notes file for durable preferences, recurring topics,
    open ideas, and useful facts from prior conversations.
20. Provide a dark blue and pinky-purple desktop hub for status, settings,
    logging state, errors, transcripts, notes, scripts, and integrations.
21. Warn in the hub when OBS is not streaming/recording, Warudo is unavailable,
    internet is down, Drive upload fails, Make webhook fails, or TTS fails.
22. Have Zora speak a live warning for critical failures: "Hey listen, we have a
    problem somewhere. Pause the stream."
23. Archive old completed content series so active work stays clean.
24. Include privacy controls, crash recovery, source notes, update handling,
    panic mode, integration plugins, Make video workflow support, and personality
    tuning.

## Suggested local stack

| Layer | Recommended first choice | Notes |
| --- | --- | --- |
| Zora desktop app | Downloadable Windows-first desktop app | Owns listening, wake phrases, memory bank, web research, scripts, Make export, Drive export, and state. |
| Face/avatar rig | Warudo | Chosen platform for Zora's visible 3D face/avatar rig; MVP can use a human avatar with fairy triggers. |
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
- [Protected drive and security model](docs/protected-drive-security.md)
- [Provider settings](docs/provider-settings.md)
- [Visual design](docs/visual-design.md)
- [Stream setup checklist](docs/stream-setup.md)
- [Personality and behavior guide](docs/personality.md)
- [Stream-to-YouTube content pipeline](docs/content-pipeline.md)
- [Make video automation integration](docs/make-video-automation.md)
- [Memory, transcript archive, and Google Drive export](docs/memory-and-drive.md)
- [Topic scope and discussion style](docs/topic-scope.md)
- [Web research and source handling](docs/web-research.md)

## Stream behavior principles

- Keep answers brief unless the streamer asks for detail.
- Express Zora as a practical helpful fairy who got extra nerdy with computers
  and information: bright, curious, lightly magical, studious, and kind without
  becoming childish or distracting.
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


## Desktop hub direction

Zora's app should feel like her control tower: a dark blue and pinky-purple hub
for listening state, Warudo triggers, OBS status, memory, scripts, sources, Drive
exports, Make automations, and personality settings.

During install, Zora should ask where to store her memory bank. The creator can
choose a specific drive or folder, and Zora should keep lightweight transcripts,
notes, downloaded stream videos, archives, scripts, source metadata, and Make
export packages under that location.

Zora's best security model is outbound-only: she can reach approved services like
STT, LLM, TTS, web search, Drive, and Make, but the memory bank drive should not
expose inbound network access. Secrets should use the operating system credential
vault or an encrypted vault, not plain text files.
