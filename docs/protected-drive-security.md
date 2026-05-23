# Protected Drive and Security Model

Zora should live on a drive or folder of her own: her memory bank. This is where
she stores lightweight transcripts, notes, downloaded stream videos, archives,
scripts, source notes, Drive export metadata, and Make handoff packages.

## Best model: outbound-only

The safest practical model is outbound-only:

- Zora can reach out to approved services.
- No outside service can reach into the memory bank drive.
- Make and Google Drive receive explicit export packages, not drive access.
- The app should not expose a public web server for local files.
- Local firewall rules should block unsolicited inbound connections.

This gives Zora internet usefulness without turning her memory bank into an
internet-facing target.

## Where secrets should live

Raw keys and tokens should not be stored as plain text in the drive.

Recommended order:

1. Use the operating system credential vault for API keys and OAuth tokens.
2. Keep non-secret settings in the memory bank.
3. If secrets must move with the drive, use an encrypted vault that requires a
   passphrase or OS unlock.
4. Never place secrets in transcripts, notes, Drive exports, or Make packages.

## Memory bank contents

```text
zora-memory-bank/
  settings.json
  zora-notes.md
  lightweight-transcripts/
  downloaded-streams/
  sessions/
  archives/
    2026-05/
      topic-name/
  make/
    outgoing/
    processed/
  logs/
```

## Retention policy

Lightweight transcripts serve as Zora's active memory. Heavy information moves to
archives after 3 months.

Keep active:

- Lightweight transcripts.
- Summaries.
- Notes.
- Source notes.
- Active scripts and Make packages.

Archive after 3 months:

- Downloaded stream videos.
- Heavy transcript exports.
- Completed production folders.
- Old generated media assets.

Archive folders should use month and topic names, such as:

```text
archives/
  2026-05/
    zora-build-series/
    spirituality-human-patterns/
```

## Video transcript recovery

Downloaded stream videos should be stored in the memory bank. If a lightweight
transcript is missing or corrupted, Zora can extract or regenerate the transcript
from the saved video.
