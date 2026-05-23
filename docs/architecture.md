# Zora Architecture

This document describes the first practical architecture for Zora, a standalone
background app that can follow the streamer's recent rant and respond only when
addressed. Warudo is the face/avatar rig Zora drives for visual presence; it is
not the application brain. The architecture favors clear local control, low
stream risk, and replaceable services.

## High-level flow

```text
Zora background app
  -> owns listening, memory, research, scripts, Drive export, and state
  -> drives Warudo as the visible face/avatar rig
  -> exposes audio and visual sources to OBS

Streamer mic
  -> control phrase detector
  -> local background listener
  -> timestamped stream transcript
  -> rolling transcript/context summary
  -> "hey Zora" wake phrase gate
  -> speech-to-text for the active question
  -> conversation controller
  -> optional web research tool
  -> LLM response
  -> safety/pacing filter
  -> text-to-speech
  -> OBS audio source
  -> Warudo expression and mouth movement

Post-stream transcript
  -> archive lookup
  -> segmenter
  -> talking point extractor
  -> highlight scorer
  -> YouTube script generator
  -> compact memory notes updater
  -> Google Drive export
  -> draft titles, descriptions, chapters, and clip notes
```

## Application boundary

Zora should be built as her own local background app or service. Warudo should be
treated as the visual layer: Zora sends state changes, expression triggers, and
TTS audio to Warudo, while Zora itself owns listening, wake/control commands,
transcripts, memory, web lookup, script generation, and Google Drive export.

This separation matters because Zora should still be able to log transcripts,
prepare scripts, search archives, or upload approved documents even when the
Warudo scene is not currently visible.

## Components

### 1. Background listener

Zora can listen in the background so she understands what the streamer has been
ranting about before the direct question arrives. This should be implemented as a
short local memory, not as an always-publishing transcript.

Recommended MVP behavior:

- Continuously capture microphone audio locally.
- Build a rolling transcript or summary of the last few minutes for live answers.
- Save a timestamped full-stream transcript for post-stream content creation.
- Keep the rolling context private by default.
- Do not speak until the wake phrase is detected.
- Pause listening/logging immediately when "Zora rest" is heard.
- Resume listening/logging when "Zora awaken" is heard.
- If OBS is streaming while Zora is resting, keep the Warudo avatar visible in a
  sleeping animation as a visual cue.
- Provide an obvious mute/pause control for live-stream safety.

### 2. Control phrase and wake phrase gate

Zora has two phrase layers:

- Control phrases change whether she is listening/logging.
- The wake phrase starts an active request that should receive an answer.

"Zora rest" pauses background listening and transcript logging. "Zora awaken"
resumes background listening and transcript logging. "Hey Zora" is the boundary
between passive context and an active request. Zora should answer only after
hearing "hey Zora" or after a manual hotkey/button trigger.

Supported trigger options:

- Pause command: "Zora rest".
- Resume command: "Zora awaken".
- Wake phrase: "hey Zora".
- Push-to-talk hotkey as a reliable fallback.
- Manual OBS/Stream Deck button.
- Chat command later, if chat participation is wanted.

Example active requests:

- "Hey Zora, what do you think about that?"
- "Hey Zora, does this build or that build make more sense?"
- "Hey Zora, is this explanation accurate?"
- "Hey Zora, what was the point I was circling around?"

### 3. Speech-to-text

The STT layer converts both passive context and active questions into text. The
MVP can treat these as two different modes:

- Passive mode updates a short rolling context summary.
- Active mode captures the wake phrase and the direct question to answer.

Implementation notes:

- Return both transcript text and confidence if the provider supports it.
- Ignore empty or very low-confidence transcripts.
- Display the active transcript in the local console for debugging.
- Make it clear when background listening is paused.

### 4. Stream transcript store

The transcript store records a full 3-4 hour stream so Zora can help turn the
conversation into content after the broadcast.

Recommended data model:

- `session_id`: one stream or recording session.
- `started_at` and `ended_at`: stream boundaries.
- `segments`: timestamped transcript chunks with speaker labels when available.
- `live_context_summary`: short rolling summary used for live Zora responses.
- `post_stream_summary`: longer outline generated after the session.
- `highlights`: selected moments with timestamps, reasons, and suggested formats.
- `scripts`: generated YouTube script drafts linked back to source segments.
- `drive_exports`: approved documents uploaded to Google Drive, including Drive
  file IDs and export timestamps.

Storage can start as local JSONL or SQLite. Avoid keeping raw audio by default
unless the creator explicitly enables it.

### 5. Long-term notes and transcript archive

Zora should be able to use older conversations without loading every full
transcript into live context. The archive layer separates heavy source material
from compact durable memory.

Recommended files:

- `zora-notes.md`: compact, human-editable memory for recurring preferences,
  ongoing projects, decisions, names, and content ideas.
- `sessions/{session_id}/transcript.jsonl`: timestamped transcript chunks.
- `sessions/{session_id}/summary.md`: searchable session outline.
- `sessions/{session_id}/talking-points.md`: best moments and quotes.
- `sessions/{session_id}/scripts/*.md`: draft scripts generated from that stream.

Lookup behavior:

- Search old session summaries first.
- Pull exact transcript segments only when needed.
- Cite timestamps when using old transcripts for a new script.
- Ask before treating sensitive or private notes as stream material.
- Keep `zora-notes.md` short enough to load quickly at startup.

### 6. Conversation controller

The controller is the core of the Zora background app. It owns Zora's state,
memory window, and prompt sent to the LLM.

Recommended responsibilities:

- Maintain a short rolling summary of recent rant context.
- Maintain a short rolling conversation history of direct Zora interactions.
- Add the Zora personality prompt.
- Enforce short answer length.
- Track current state: `idle`, `listening`, `resting`, `thinking`, `speaking`,
  `muted`.
- Reject new requests while speaking unless interruption is enabled.

### 7. Web research tool

Zora should be able to look things up on the internet when the streamer asks for
current information, source checks, definitions, recent events, or deeper
research. Web lookup should be a tool the controller can call, not a replacement
for Zora's own response style.

Use web research when:

- A question depends on current information.
- Zora needs a source, date, quote, or reference.
- The streamer asks her to look something up.
- A quantum science, history, religion, health, or public-claim topic needs
  careful verification.

Response rules:

- Summarize sources in stream-friendly language.
- Mention when information comes from a quick lookup.
- Prefer reputable sources for science and history.
- Do not read long URLs aloud unless asked.
- Say when sources disagree or when a claim is speculative.

### 8. LLM response

The LLM should answer in Zora's voice while using only the information available
to it.

Response constraints:

- Default to one to three sentences.
- Use recent rant context when the question says "that", "this", or "what I was
  just saying".
- For "this or that" questions, compare the options clearly and make a practical
  recommendation when possible.
- Say when information is uncertain.
- Avoid long lists unless asked.
- Do not claim to see the game, desktop, chat, or internet unless those
  integrations are explicitly enabled.
- For quantum science topics, separate established physics from philosophical or
  spiritual interpretations.

### 9. Safety and pacing filter

Before speech output, apply a small final pass to protect the live stream.

The MVP filter can:

- Trim overly long responses.
- Remove markdown formatting that sounds awkward when spoken.
- Block empty responses.
- Avoid repeating private rant context unless the streamer asked for a recap.
- Convert links into "I found a link, but I will not read the full URL on
  stream."

### 10. Text-to-speech

TTS produces Zora's spoken response. Choose a voice that is clearly not the
streamer's voice so viewers understand who is talking.

Operational needs:

- Fast enough for live conversation.
- Stable output volume.
- Optional audio ducking so Zora does not overpower the stream.
- A local mute switch.

### 11. Avatar bridge

The bridge maps Zora state to the avatar application.

Minimum states:

| Zora state | Warudo avatar behavior |
| --- | --- |
| `idle` | Idle animation, occasional blink or subtle motion. |
| `listening` | Attentive expression or small "recording" animation. |
| `resting` | Sleeping, dimmed, powered-down, or relaxed pose after "Zora rest". If OBS is live, prefer a visible sleeping loop. |
| `thinking` | Processing expression, loading animation, or eye movement. |
| `speaking` | Talk animation and lip sync from TTS audio. |
| `muted` | Silent pose for hard mute or emergency stop. |

Warudo is the chosen face/avatar rig because it can combine a 3D avatar, props,
scene layout, and triggers in a streamer-friendly workflow. The Zora background
app remains the brain; Warudo is the face. The bridge should map Zora's state
changes to Warudo triggers, including a distinct resting pose for "Zora rest" and
an awake/listening transition for "Zora awaken".

### 12. OBS integration

OBS composes the final stream. Zora's background app should be aware of whether
OBS is currently streaming so her Warudo visual state can communicate what is
happening.

Recommended sources:

- Warudo avatar capture source with transparency if available.
- Dedicated Zora audio source for volume control.
- Optional caption/subtitle browser source for Zora's response.

Keep Zora in a separate OBS scene group so she can be hidden instantly.

OBS-aware state rule:

- If OBS is streaming and Zora is `resting`, keep the Warudo source visible and
  play a sleeping animation.
- If OBS is not streaming and Zora is `resting`, the local controller may keep
  her hidden, dimmed, or asleep depending on the creator's preference.
- A hard `muted` or emergency-stop state can still hide or silence Zora even
  during a live stream.

### 13. Post-stream content pipeline

After a stream ends, Zora can run a batch job over the full transcript.

Pipeline stages:

1. Segment the transcript into coherent topics.
2. Score segments for clarity, energy, usefulness, novelty, and clip potential.
3. Extract the strongest talking points with timestamps and supporting quotes.
4. Group related moments into video ideas.
5. Draft YouTube scripts with hooks, beats, clip notes, and calls to action.
6. Produce optional Shorts/TikTok prompts from the highest-energy moments.

This mode should not talk live on stream. It can run after the broadcast and
write drafts into local markdown files for review.

### 14. Google Drive export

Google Drive export should happen after script generation and creator review.
Zora can upload approved documents into a Drive folder such as
`Zora/Streams/{session_id}/`.

Exportable files:

- Final or reviewed script drafts.
- `video-ideas.md`.
- `talking-points.md`.
- `outline.md`.
- Optional clip notes for editors.

Implementation notes:

- Use OAuth with a creator-owned Google account.
- Store tokens outside the repository.
- Keep Drive folder IDs in local config, not hard-coded prompts.
- Record uploaded Drive file IDs in the session metadata.
- Do not upload raw transcripts or private notes unless explicitly requested.

## First prototype contract

A local prototype can expose the following simple internal events:

```json
{
  "state": "listening",
  "wakePhrase": false,
  "contextSummary": "The streamer is weighing two character builds for survivability versus damage.",
  "activeQuestion": null,
  "response": null
}
```

```json
{
  "state": "speaking",
  "wakePhrase": true,
  "contextSummary": "The streamer is weighing two character builds for survivability versus damage.",
  "activeQuestion": "Does this build or that build make more sense?",
  "response": "If you are still learning the fight, the survivability build makes more sense. The damage build is better once you know the timing."
}
```

These events can later be sent to Warudo, OBS, a browser overlay, or a Stream
Deck plugin without changing the conversation logic.
