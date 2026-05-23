# Memory, Transcript Archive, and Google Drive Export

Zora needs a creator-selected memory bank plus two kinds of memory:

1. Heavy source material: full stream transcripts, summaries, highlights, and
   scripts.
2. Lightweight durable notes: a small text file that captures what should be easy
   for Zora to remember next time.

This keeps live performance low-impact while still making old conversations
useful. The downloadable Zora desktop app should own these local files and make
them easy to open, export, archive, or delete.

## Lightweight notes file

During install, Zora should ask which drive or folder should hold her memory
bank. Use a plain markdown file such as `zora-notes.md` inside that memory bank
for durable context.

Recommended sections:

```markdown
# Zora Notes

## Creator preferences
- Zora answers only after "hey Zora" unless manually triggered.
- "Zora rest" pauses background listening/logging.
- "Zora awaken" resumes background listening/logging.
- Approved scripts can be uploaded to Google Drive.

## Recurring projects
- Build Zora as a 3D streaming companion using Warudo or a similar avatar app.

## Content ideas
- Turn long stream rants into YouTube scripts and Shorts.
- Explore spirituality, history, religion, astrology, awakening, embodiment, and
  human-pattern topics with nuance.

## Decisions
- Raw transcripts stay local unless explicitly approved for upload.

## Open questions
- Which TTS provider should become Zora's voice?
```

Rules for this file:

- Keep it short enough to load at startup.
- Prefer facts, preferences, decisions, and recurring ideas.
- Avoid copying entire transcript sections into notes.
- Make it human-editable so the creator can correct Zora.
- Include dates only when useful.

## Transcript archive

Full transcripts should live outside the compact notes file. A simple local
folder structure is enough for the first version:

```text
zora-memory-bank/
  settings.json
  zora-notes.md
  sessions/
    2026-05-23-stream-001/
      transcript.jsonl
      summary.md
      talking-points.md
      video-ideas.md
      scripts/
        script-idea-1.md
      make-export.json
      drive-export.json
  archives/
    completed-series/
```

Zora can look up prior conversations by searching session summaries and tags
first, then reading only the relevant transcript segments.

## Lookup workflow

When the creator asks about an older conversation or wants a new script based on
past streams:

1. Search `zora-notes.md` for durable context.
2. Search `sessions/*/summary.md` and `talking-points.md` for matching topics.
3. Read exact transcript segments only for the best matches.
4. Quote or cite source timestamps in script drafts.
5. Add any durable new decision back to `zora-notes.md` after review.

## Google Drive export

Zora should upload reviewed script documents and planning files to a
creator-owned Google Drive folder.

Recommended Drive layout:

```text
Zora/
  Scripts/
  Streams/
    2026-05-23-stream-001/
      outline.md
      talking-points.md
      video-ideas.md
      scripts/
```

Upload by default:

- Reviewed YouTube scripts.
- Video idea lists.
- Talking point summaries.
- Editor notes or clip notes.

Do not upload by default:

- Raw transcripts.
- Raw audio.
- Private long-term notes.
- OAuth tokens or local config.

## Drive metadata

Keep a local record of uploaded files so Zora can find them again:

```json
{
  "sessionId": "2026-05-23-stream-001",
  "uploadedAt": "2026-05-24T02:15:00Z",
  "folderId": "google-drive-folder-id",
  "files": [
    {
      "localPath": "scripts/script-idea-1.md",
      "driveFileId": "google-drive-file-id",
      "driveUrl": "https://drive.google.com/..."
    }
  ]
}
```

## Safety controls

- Show whether Zora is logging a session.
- Let the creator pause logging with "Zora rest".
- Let the creator delete a session.
- Require approval before uploading raw transcripts or notes.
- Store Google OAuth tokens outside the repository.
- Keep all generated scripts editable before upload.


## Completed series archives

When a content series is finished, Zora should archive it out of the active work
area while keeping it searchable for future context.

Archive metadata should include:

- Series name.
- Date archived.
- Related sessions.
- Final scripts or information pages.
- Drive links.
- Make automation IDs or upload references when available.
- Notes on whether the series can be reused as future context.
