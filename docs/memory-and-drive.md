# Memory, Transcript Archive, and Google Drive Export

Zora needs a creator-selected memory bank drive/folder plus two kinds of memory:

1. Heavy source material: full stream transcripts, summaries, highlights, and
   scripts.
2. Lightweight durable notes: a small text file that captures what should be easy
   for Zora to remember next time.

This keeps live performance low-impact while still making old conversations
useful. The downloadable Zora desktop app should own these local files and make
them easy to open, export, archive, or delete.

## Lightweight notes file

During install, Zora should ask which drive or folder should hold her memory
bank. This drive is Zora's local home base. Use lightweight transcripts,
summaries, and a plain markdown file such as `zora-notes.md` inside that memory
bank for active durable context.

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
  lightweight-transcripts/
  downloaded-streams/
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
    2026-05/
      topic-name/
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


## Outbound-only drive model

Zora's memory bank should not be exposed as a server or shared folder that the
internet can reach. The recommended model is outbound-only:

- Zora reads and writes local files on the memory bank drive.
- Zora reaches out to approved services when needed.
- No external service receives direct inbound access to the drive.
- Make and Drive receive approved export packages, not drive access.
- Firewall rules should block unsolicited inbound traffic to the Zora app.

## Keys and tokens

It is tempting to place all keys and tokens in Zora's drive, but raw secrets in a
plain folder are risky. Better options:

1. Store secrets in the operating system credential vault.
2. Store non-secret provider settings in `settings.json`.
3. If secrets must travel with the memory bank, store them in an encrypted vault
   that requires a passphrase or OS unlock.
4. Never include secrets in transcripts, notes, Make packages, or Drive exports.

## Lightweight memory and heavy archive policy

Lightweight transcripts should serve as Zora's memory. Heavy information should
be archived after 3 months.

Active memory:

- `zora-notes.md`.
- Lightweight transcripts.
- Session summaries.
- Talking point summaries.
- Source notes.

Heavy archive after 3 months:

- Downloaded stream videos.
- Raw or large transcript exports.
- Old generated media assets.
- Completed series production folders.

Archive organization:

```text
archives/
  2026-05/
    zora-build-series/
    spirituality-human-patterns/
  2026-06/
    quantum-and-consciousness/
```

Archived material should remain searchable by summaries and tags, but should not
clutter active dashboards.

## Video backup transcript fallback

Downloaded stream videos can live in the memory bank. If a lightweight transcript
is missing or corrupted, Zora can extract or regenerate a transcript from the
saved video as a recovery path.
