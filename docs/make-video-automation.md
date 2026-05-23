# Make Video Automation Integration

Zora should work with Make when developing videos. The goal is to let Zora prepare
approved scripts or information pages, then hand them to a Make workflow that
turns them into videos and uploads them on a schedule.

## Intended workflow

1. Zora logs streams and drafts scripts or information pages.
2. The creator reviews and approves the document.
3. Zora packages the approved document with metadata and source notes.
4. Zora sends the package to Make by webhook or places it in a watched folder.
5. Make turns the package into a video through the creator's automation workflow.
6. Make uploads or schedules the video.
7. Zora records the Make run ID, output links, schedule, and status.
8. When a series is finished, Zora archives it out of active work.

## Export package

A Make handoff package should include:

```json
{
  "type": "youtube_video",
  "series": "example-series",
  "title": "Working title",
  "description": "Draft description",
  "scriptPath": "sessions/2026-05-23-stream-001/scripts/example.md",
  "infoPagePath": null,
  "sourceNotesPath": "sessions/2026-05-23-stream-001/source-notes.md",
  "publishWindow": "creator-selected schedule metadata",
  "format": "full_video",
  "approvedByCreator": true
}
```

## Supported inputs

- Approved YouTube scripts.
- Information pages.
- Source notes.
- Talking point summaries.
- Clip or B-roll notes.
- Title, description, and chapter drafts.

## Safety rules

- Zora should not send rough drafts to Make automatically.
- Raw transcripts should not be sent unless the creator explicitly approves them.
- Zora should keep a local record of every Make handoff.
- Failed Make runs should be retryable.
- Completed series should be archived but remain searchable.

## Archive behavior

Completed series can move to `archives/completed-series/` in the memory bank.
Archived series should keep:

- Final scripts or information pages.
- Make run IDs and output links.
- Upload schedule or publish date.
- Drive links.
- Source notes.
- Creator notes for future reference.


## End-of-stream handoff

After Zora compiles topics into video candidates, the creator can approve which
items enter Make.

Zora should prepare:

- Approved script or information page.
- Topic/category.
- Series name.
- Publish schedule metadata.
- Source notes and timestamps.
- Drive links if available.
- Local memory bank paths.

Make should never receive direct access to Zora's memory bank drive. It should
receive only the approved package by webhook or watched export folder.
