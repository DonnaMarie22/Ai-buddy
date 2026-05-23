# Zora Architecture

This document describes the first practical architecture for Zora, a streaming AI
buddy that can follow the streamer's recent rant and respond only when addressed.
It favors clear local control, low stream risk, and replaceable services.

## High-level flow

```text
Streamer mic
  -> local background listener
  -> timestamped stream transcript
  -> rolling transcript/context summary
  -> "hey Zora" wake phrase gate
  -> speech-to-text for the active question
  -> conversation controller
  -> LLM response
  -> safety/pacing filter
  -> text-to-speech
  -> OBS audio source
  -> avatar app expression and mouth movement

Post-stream transcript
  -> segmenter
  -> talking point extractor
  -> highlight scorer
  -> YouTube script generator
  -> draft titles, descriptions, chapters, and clip notes
```

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
- Provide an obvious mute/pause control for live-stream safety.

### 2. Wake phrase gate

The wake phrase is the boundary between passive context and an active request.
Zora should answer only after hearing "hey Zora" or after a manual hotkey/button
trigger.

Supported trigger options:

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

Storage can start as local JSONL or SQLite. Avoid keeping raw audio by default
unless the creator explicitly enables it.

### 5. Conversation controller

The controller owns Zora's state, memory window, and prompt sent to the LLM.

Recommended responsibilities:

- Maintain a short rolling summary of recent rant context.
- Maintain a short rolling conversation history of direct Zora interactions.
- Add the Zora personality prompt.
- Enforce short answer length.
- Track current state: `idle`, `listening`, `thinking`, `speaking`, `muted`.
- Reject new requests while speaking unless interruption is enabled.

### 6. LLM response

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
- Do not claim to see the game, desktop, or chat unless those integrations are
  explicitly enabled.

### 7. Safety and pacing filter

Before speech output, apply a small final pass to protect the live stream.

The MVP filter can:

- Trim overly long responses.
- Remove markdown formatting that sounds awkward when spoken.
- Block empty responses.
- Avoid repeating private rant context unless the streamer asked for a recap.
- Convert links into "I found a link, but I will not read the full URL on
  stream."

### 8. Text-to-speech

TTS produces Zora's spoken response. Choose a voice that is clearly not the
streamer's voice so viewers understand who is talking.

Operational needs:

- Fast enough for live conversation.
- Stable output volume.
- Optional audio ducking so Zora does not overpower the stream.
- A local mute switch.

### 9. Avatar bridge

The bridge maps Zora state to the avatar application.

Minimum states:

| Zora state | Avatar behavior |
| --- | --- |
| `idle` | Idle animation, occasional blink or subtle motion. |
| `listening` | Attentive expression or small "recording" animation. |
| `thinking` | Processing expression, loading animation, or eye movement. |
| `speaking` | Talk animation and lip sync from TTS audio. |
| `muted` | Idle or sleeping pose. |

Warudo is the preferred first target because it can combine a 3D avatar, props,
scene layout, and triggers in a streamer-friendly workflow. VSeeFace, Animaze,
or legacy FaceRig can also work if the bridge only needs to provide audio for lip
sync and a few hotkey/expression triggers.

### 10. OBS integration

OBS composes the final stream.

Recommended sources:

- Avatar capture source with transparency if available.
- Dedicated Zora audio source for volume control.
- Optional caption/subtitle browser source for Zora's response.

Keep Zora in a separate OBS scene group so she can be hidden instantly.

### 11. Post-stream content pipeline

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
