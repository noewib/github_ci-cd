# Gemini Chat - GitHub Actions CI/CD

Application ChatGPT-like utilisant Google Gemini AI.

## Structure

- `backend/` - API Express.js avec Gemini AI
- `frontend/` - Interface React avec Vite
- `.github/workflows/` - Pipeline CI/CD GitHub Actions

## Démarrage local

```bash
# Backend
cd backend && npm install && npm run dev

# Frontend
cd frontend && npm install && npm run dev
```

## Docker

```bash
docker-compose up --build
```

## Variables d'environnement

- `GEMINI_API_KEY` - Clé API Google AI Studio
