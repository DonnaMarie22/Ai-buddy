# Stream-to-YouTube Content Pipeline

Zora's second major workflow is post-stream content creation. During a 3-4 hour
stream, she can log the conversation, then later compile the best talking points
and prepare YouTube scripts from the strongest sections.

## Goals

- Preserve the useful parts of long rants and live conversations.
- Reduce the work needed to find upload-worthy moments after stream.
- Turn scattered thoughts into structured video ideas.
- Keep the creator in control of what is saved, reviewed, uploaded, automated,
  and published.
- Upload reviewed script documents to Google Drive for editing and sharing.
- Hand approved scripts or information pages to Make workflows that turn them
  into videos and schedule uploads.

## Session capture

Each stream should become a single session with timestamped transcript segments.

Minimum session fields:

```json
{
  "sessionId": "2026-05-23-stream-001",
  "startedAt": "2026-05-23T18:00:00Z",
  "endedAt": "2026-05-23T21:42:00Z",
  "title": "Saturday stream",
  "segments": []
}
```

Recommended segment fields:

```json
{
  "start": "00:34:12",
  "end": "00:36:05",
  "speaker": "streamer",
  "text": "...",
  "summary": "The streamer compares two approaches to building Zora.",
  "tags": ["zora", "streaming", "ai companion"]
}
```

## Processing stages

### 1. Clean transcript

- Remove repeated filler only when it hurts readability.
- Keep the streamer's phrasing and point of view.
- Preserve timestamps so every generated idea links back to the source moment.
- Mark low-confidence transcription sections for review.

### 2. Segment into topics

Group the transcript into coherent topic blocks such as:

- Product ideas.
- Funny rants.
- Useful explanations.
- Strong opinions.
- Spirituality, history, religion, astrology, quantum science, embodiment,
  awakening, and human-pattern conversations.
- Questions from viewers.
- Moments that could become Shorts.

### 3. Score highlights

Score each segment with simple criteria:

| Criterion | What it means |
| --- | --- |
| Clarity | The point is easy to understand without too much setup. |
| Energy | The streamer sounds excited, funny, annoyed, or passionate. |
| Usefulness | The segment teaches, explains, or helps viewers decide something. |
| Novelty | The take feels specific rather than generic. |
| Nuance | Sensitive subjects separate fact, tradition, belief, and speculation. |
| Clipability | The moment can stand alone with minimal context. |

### 4. Extract talking points

For each strong segment, Zora should produce:

- Timestamp range.
- One-sentence summary.
- Key claims or opinions.
- Best quotes.
- Suggested video angle.
- Whether it fits a full video, Short, or community post.

### 5. Generate YouTube ideas

Group related talking points into video candidates.

Each candidate should include:

- Working title.
- Viewer promise: what the audience gets from watching.
- Source timestamps.
- Suggested clips or B-roll.
- Why the idea is worth making.

### 6. Draft scripts

A script draft should be editable, not final. Zora should preserve the streamer's
voice and give structure to the best ideas.

Recommended script format:

```markdown
# Working Title

## Hook
A punchy opening line based on the strongest stream moment.

## Setup
What the viewer needs to know before the main point.

## Main beats
1. First point with source timestamp.
2. Second point with source timestamp.
3. Third point with source timestamp.

## Suggested clips
- 00:34:12-00:36:05: comparison of the two options.
- 01:12:44-01:13:20: strongest quote.

## Ending
Short conclusion and call to action.
```

## Outputs

For each stream session, Zora can write:

- `transcript.jsonl`: timestamped transcript segments.
- `outline.md`: full-session topic outline.
- `talking-points.md`: strongest moments and quotes.
- `video-ideas.md`: grouped YouTube concepts.
- `scripts/*.md`: draft scripts for selected ideas.
- `shorts.md`: short-form clip candidates.
- `make-export.json`: Make automation payload and status for approved video
  workflows.
- `drive-export.json`: Google Drive upload results for approved documents.

## Transcript lookup across old streams

Zora can use previous streams as a research archive for new scripts and future
conversations.

Lookup flow:

1. Search session summaries and tags for relevant old topics.
2. Read the matching timestamped transcript segments.
3. Pull quotes or talking points with source timestamps.
4. Update the new script draft with references to the old material.
5. Add durable lessons or preferences to the compact notes file only when useful.

This avoids loading every old transcript into memory while still making past
conversations useful.

## Google Drive upload

After review, Zora should upload script documents to a creator-owned Google Drive
folder.

Suggested folder layout:

```text
Zora/
  Streams/
    2026-05-23-stream-001/
      outline.md
      talking-points.md
      video-ideas.md
      scripts/
        zora-origin-story.md
        stream-rant-highlight.md
```

Upload rules:

- Upload reviewed scripts and planning docs by default.
- Do not upload raw transcripts unless the creator asks.
- Keep a local record of Drive links and file IDs.
- If a Drive upload fails, keep local files and show a retryable error.

## Privacy and control

Long-form logging is powerful, so it needs explicit controls:

- Show when a stream session is being logged.
- Allow pause/resume during private moments.
- Allow deleting a session transcript.
- Avoid storing raw audio unless explicitly enabled.
- Do not publish or upload drafts automatically.
- Require manual review before a script is used.
- Require explicit approval before uploading raw transcripts or long-term notes.
- Allow old session lookup to be disabled for sensitive streams.

## Example post-stream request

"Zora, review tonight's stream. Pull the best talking points, find anything that
could become a YouTube video, and draft scripts for the top three ideas."


## Make video automation handoff

Zora should support a Make workflow that receives approved scripts or information
pages, turns them into videos, and uploads them according to a schedule.

Handoff rules:

- Only approved documents enter the Make queue.
- Zora includes source notes and timestamps when available.
- Zora includes schedule metadata if the creator has chosen a publish window.
- Make automation status should be saved back into the session or series folder.
- Failed automation attempts should remain retryable without regenerating the
  script.
