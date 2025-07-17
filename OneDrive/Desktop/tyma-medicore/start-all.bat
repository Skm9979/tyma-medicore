@echo off
start cmd /k "cd ai-service && venv\Scripts\activate && python app.py"
start cmd /k "cd backend && npm run dev"
start cmd /k "cd frontend && npm start" 