# Provider Settings

Provider settings are the external or local services Zora uses to do specific
jobs. The reason to make them settings is simple: Zora should not be locked into
one vendor or one workflow.

## What providers mean

- **STT provider:** turns your voice into text.
- **LLM provider:** generates Zora's answers, summaries, and scripts.
- **TTS provider:** turns Zora's replies into spoken audio.
- **Web research provider:** lets Zora look things up on the internet.
- **Google Drive provider:** uploads approved scripts and planning documents.
- **Make provider:** sends approved video packages into Make automation.
- **OBS provider:** reads streaming/recording status and optionally controls OBS.
- **Warudo provider:** sends avatar expression and state triggers.

## Why this matters

Provider settings let the app answer questions like:

- Which speech-to-text service should Zora use?
- Which voice should Zora speak with?
- Which LLM should write scripts?
- Which search or browser tool is allowed?
- Which Drive folder receives approved documents?
- Which Make webhook receives video packages?

## Secrets

Provider settings can include two kinds of data:

- Non-secret config, such as folder names, device names, model choices, or webhook
  labels.
- Secrets, such as API keys, OAuth tokens, and webhook URLs.

Secrets should be stored in the operating system credential vault or an encrypted
vault, not raw plain text files in the memory bank.

## Safe defaults

Every provider should have:

- Enabled/disabled state.
- Test connection button.
- Last error.
- Clear permissions.
- Safe fallback if disabled or offline.
