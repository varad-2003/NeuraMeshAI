# NeuraMesh AI 🤖

NeuraMesh AI is a full-stack AI assistant platform built around a microservices architecture and a multi-agent AI workflow.

It provides an AI-powered conversational interface with specialized agents for general chat, coding, web search, image generation, image analysis, PDF processing, PDF-based RAG, and PowerPoint generation.

## 🚀 Features

- 🤖 Multi-Agent AI Architecture
- 💬 AI-powered conversational chat
- 💻 Coding assistance
- 🔎 Web search
- 🖼️ AI image generation
- 👁️ Image analysis
- 📄 PDF generation
- 📚 PDF-based RAG
- 📊 PowerPoint generation
- 🔐 Firebase authentication
- 💳 Credit-based billing system
- 💰 Razorpay payment integration
- ☁️ AWS S3 file storage
- ⚡ Redis integration
- 🐳 Dockerized microservices
- 🌐 API Gateway architecture
- 🗃️ MongoDB persistence



## 🏗️ Architecture

NeuraMesh AI follows a microservices-based backend architecture.

```text
                    ┌─────────────────┐
                    │     React       │
                    │    Frontend     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   API Gateway   │
                    └────────┬────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼
    ┌───────────┐      ┌───────────┐      ┌───────────┐
    │   Auth    │      │   Chat    │      │  Billing  │
    │  Service  │      │  Service  │      │  Service  │
    └───────────┘      └───────────┘      └───────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  Agent Service  │
                    └────────┬────────┘
                             │
          ┌──────────────────┼──────────────────┐
          ▼                  ▼                  ▼
       Chat Agent       Coding Agent       Search Agent
          │
          ├──────────── PDF Agent
          ├──────────── PDF RAG Agent
          ├──────────── Image Generation Agent
          ├──────────── Image Analysis Agent
          └──────────── PPT Agent
```

## 🤖 AI Agent System

The Agent Service contains multiple specialized agents:

| Agent | Purpose |
|---|---|
| Chat Agent | General AI conversations |
| Coding Agent | Code generation, explanation, debugging and optimization |
| Search Agent | Web search and information retrieval |
| Image Generation Agent | AI image generation |
| Image Analysis Agent | Analyze uploaded images |
| PDF Agent | Generate and process PDF documents |
| PDF RAG Agent | Question answering over uploaded PDF documents |
| PPT Agent | Generate PowerPoint presentations |

## 🧠 Agent Workflow

The agent system is organized around a graph-based workflow.

```text
                    User Request
                         │
                         ▼
                    API Gateway
                         │
                         ▼
                   Agent Service
                         │
                         ▼
                       Router
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
       Chat Agent    Coding Agent    Search Agent
          │
          ├──────────── PDF Agent
          ├──────────── PDF RAG Agent
          ├──────────── Image Agent
          └──────────── PPT Agent
```

## 📚 PDF RAG Pipeline

NeuraMesh AI supports retrieval-augmented generation over uploaded PDF documents.

```text
Upload PDF
    ↓
Extract Document Content
    ↓
Split Into Chunks
    ↓
Generate Embeddings
    ↓
Store in Vector Database
    ↓
Similarity Search
    ↓
Retrieve Relevant Context
    ↓
LLM
    ↓
Grounded Answer
```

## 💻 Coding Agent

The Coding Agent provides programming assistance including:

- Code generation
- Code explanation
- Debugging
- Code review
- Optimization
- Programming-related problem solving

## 🖼️ Image Analysis

Users can upload images and ask questions about them.

The image analysis workflow processes the uploaded image and sends it along with the user's prompt to a vision-capable AI model.

## 📄 PDF Generation

NeuraMesh AI can generate structured PDF documents from user requests.

```text
User Prompt
     ↓
AI Processing
     ↓
Structured Content
     ↓
PDF Generation
     ↓
AWS S3
     ↓
Signed Download URL
```

## 📊 PowerPoint Generation

The PPT Agent can generate structured presentations from user prompts.

Generated presentations can contain:

- Title slides
- Content slides
- Structured bullet points
- Slide numbering
- Closing slides

Generated files are stored in AWS S3 and accessed through signed URLs.

## 🔐 Authentication

Authentication is implemented using Firebase.

The backend verifies authenticated users before allowing access to protected application functionality.

## 💳 Billing & Credits

NeuraMesh AI uses a credit-based usage model.

Different AI capabilities can consume different amounts of credits.

The billing service handles:

- Payment creation
- Payment verification
- Plan handling
- Credit allocation
- Credit deduction

Payments are integrated using Razorpay.

## ⚡ Redis

Redis is used as a shared backend service for application requirements such as:

- Session-related data
- Rate limiting
- Temporary/shared state
- Service-level caching requirements

## ☁️ AWS S3

AWS S3 is used for storing generated and uploaded files.

The application can generate temporary signed URLs so users can access generated files without exposing permanent public storage links.

## 🐳 Docker

The backend services are containerized using Docker.

Docker Compose is used to orchestrate the backend environment.

Each major backend service contains its own Docker configuration.

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Redux Toolkit
- Axios
- Firebase

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Redis
- Docker
- Docker Compose
- Microservices Architecture

### AI

- LangChain
- LangGraph
- LLM APIs
- Vector Database
- Embeddings
- Tavily Search

### Cloud & Integrations

- AWS S3
- Firebase
- Razorpay
- Redis

## 📁 Project Structure

```text
NeuraMeshAI/
│
├── backend/
│   ├── gateway/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── utils/
│   │   ├── Dockerfile
│   │   └── index.js
│   │
│   ├── services/
│   │   ├── agent/
│   │   │   ├── agents/
│   │   │   ├── config/
│   │   │   ├── controllers/
│   │   │   ├── graph/
│   │   │   ├── routes/
│   │   │   └── utils/
│   │   ├── auth/
│   │   ├── billing/
│   │   └── chat/
│   │
│   ├── shared/
│   │   └── redis/
│   │
│   └── docker-compose.yml
│
├── frontend/
│   ├── features/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── assets/
│   └── utils/
│
├── .gitignore
└── README.md
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/varad-2003/NeuraMeshAI.git
cd NeuraMeshAI
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

```bash
cd ../backend
npm install
```

Individual backend services also contain their own package.json files and dependencies.

### 4. Configure Environment Variables

Create the required `.env` files locally for the frontend and backend services.

Typical configuration includes:

- MongoDB connection
- Firebase credentials
- AI/LLM API keys
- Tavily API key
- AWS credentials
- S3 bucket configuration
- Redis configuration
- Razorpay credentials

> Never commit API keys, private keys, passwords, Firebase service-account files, or other secrets to GitHub.

### 5. Run Backend with Docker

```bash
cd backend
docker compose up --build
```

### 6. Run Frontend

```bash
cd frontend
npm run dev
```

## 🔒 Security

Sensitive credentials are excluded from the repository using `.gitignore`.

The project keeps secrets such as API keys, database credentials, Firebase credentials, AWS credentials, Razorpay credentials, and Redis credentials outside the source code.

## 🎯 Project Highlights

NeuraMesh AI demonstrates the implementation of a modern AI application combining:

- Multi-agent AI workflows
- Microservices architecture
- API Gateway
- Graph-based agent routing
- Retrieval-Augmented Generation
- Vector search
- AI-powered file generation
- Cloud storage
- Authentication
- Payments
- Credit-based usage
- Redis-backed services
- Docker containerization

## 📌 Project Status

NeuraMesh AI is currently a development/portfolio project.

The application is not publicly deployed yet. A demonstration video is planned to showcase the application's main AI capabilities and user experience.

## 👨‍💻 Author

**Varad**

GitHub: https://github.com/varad-2003/NeuraMeshAI

---

⭐ If you find this project interesting, consider giving the repository a star.
