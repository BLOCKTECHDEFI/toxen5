# TOXEN

A polished Vite + React frontend for the Toxen autonomous execution concept.

## Run locally

1. Extract the ZIP.
2. Open the `toxen` folder in VS Code.
3. Open the integrated terminal.
4. Run:

```bash
npm install
npm run dev
```

5. Open the localhost URL Vite prints, usually `http://localhost:5173`.

## Included

- Responsive landing page
- Separate `src/assets/logo.svg`
- Animated metallic agent card
- Full-screen navigation
- Demo wallet connection state
- Agent marketplace cards + configuration modal
- Live execution terminal modal
- Copyable natural-language agent prompt
- Responsive mobile layout
- No Tailwind setup required

## Build for production

```bash
npm run build
npm run preview
```

The current UI is frontend-only. Wallet, agent execution, real Robinhood Chain transactions, APIs and backend services are intentionally mocked and can be integrated later.
