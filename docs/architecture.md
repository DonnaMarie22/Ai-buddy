# AI Buddy Architecture

This document describes the first practical architecture for the streaming AI
buddy. It favors clear local control, low stream risk, and replaceable services.

## High-level flow

```text
Streamer mic
  -> wake phrase or push-to-talk gate
  -> speech-to-text
  -> conversation controller
  -> LLM response
  -> safety/pacing filter
  -> text-to-speech
  -> OBS audio source
  -> avatar app expression and mouth movement
```

## Components

### 1. Input gate

The buddy should not continuously answer everything it hears on stream. Start
with push-to-talk because it is predictable during a live broadcast.

Supported trigger options:

- Push-to-talk hotkey.
- Wake phrase such as "hey buddy".
- Manual OBS/Stream Deck button.
- Chat command later, if chat participation is wanted.

### 2. Speech-to-text

The STT layer converts a short captured audio clip into a transcript. Keep the
clip boundary simple for the MVP: start recording when the hotkey is pressed and
stop when released.

Implementation notes:

- Return both transcript text and confidence if the provider supports it.
- Ignore empty or very low-confidence transcripts.
- Display the transcript in the local console for debugging.

### 3. Conversation controller

The controller owns the buddy state and the prompt sent to the LLM.

Recommended responsibilities:

- Maintain a short rolling conversation history.
- Add the personality prompt.
- Enforce short answer length.
- Track current state: `idle`, `listening`, `thinking`, `speaking`, `muted`.
- Reject new requests while speaking unless interruption is enabled.

### 4. LLM response

The LLM should answer in the buddy's voice while staying useful to the stream.

Response constraints:

- Default to one to three sentences.
- Say when information is uncertain.
- Avoid long lists unless asked.
- Do not claim to see the game, desktop, or chat unless those integrations are
  explicitly enabled.

### 5. Safety and pacing filter

Before speech output, apply a small final pass to protect the live stream.

The MVP filter can:

- Trim overly long responses.
- Remove markdown formatting that sounds awkward when spoken.
- Block empty responses.
- Convert links into "I found a link, but I will not read the full URL on
  stream."

### 6. Text-to-speech

TTS produces the buddy's spoken response. Choose a voice that is clearly not the
streamer's voice so viewers understand who is talking.

Operational needs:

- Fast enough for live conversation.
- Stable output volume.
- Optional audio ducking so the buddy does not overpower the stream.
- A local mute switch.

### 7. Avatar bridge

The bridge maps buddy state to the avatar application.

Minimum states:

| Buddy state | Avatar behavior |
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

### 8. OBS integration

OBS composes the final stream.

Recommended sources:

- Avatar capture source with transparency if available.
- Dedicated buddy audio source for volume control.
- Optional caption/subtitle browser source for the buddy's response.

Keep the buddy in a separate OBS scene group so it can be hidden instantly.

## First prototype contract

A local prototype can expose the following simple internal events:

```json
{
  "state": "thinking",
  "transcript": "What is the tallest mountain in the world?",
  "response": null
}
```

```json
{
  "state": "speaking",
  "transcript": "What is the tallest mountain in the world?",
  "response": "Mount Everest is the tallest mountain above sea level at about 8,849 meters."
}
```

These events can later be sent to Warudo, OBS, a browser overlay, or a Stream
Deck plugin without changing the conversation logic.
