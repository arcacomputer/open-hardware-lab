# Contributing

Contributions that improve test definitions, privacy boundaries, reproducibility, accessibility or hardware records are welcome.

## Before opening a change

- Keep claims tied to evidence.
- Do not publish serial numbers, MAC addresses, credentials, personal addresses or unrelated logs.
- Separate observed behavior from interpretation.
- Disclose relevant hardware or vendor relationships.
- Do not promise upstream acceptance.

## Website checks

```bash
npm ci
npm run check
npm run build
npm run validate
```

Use focused commits. Reports that concern a security vulnerability should follow [SECURITY.md](SECURITY.md), not a public issue.
