# QuorAI – AI-powered Document Question Answering

<!-- <img width="1336" height="683" alt="QuorAI Application Screenshot" src="https://github.com/user-attachments/assets/d7f810fa-3cee-4b18-bd99-df5e8d20f748" />  -->
<!-- <img width="415" height="521" alt="image" src="https://github.com/user-attachments/assets/83cc1da0-556b-4f55-8e8b-5180b0cb3734" /> -->
<img width="1210" height="616" alt="image" src="https://github.com/user-attachments/assets/57ded09f-0ea2-428a-b0a3-140d0c69b171" />


## Description
QuorAI is an AI-driven RAG (Retrieval-Augmented Generation) platform that allows users to upload PDFs and interact with them through natural language questions. Instead of manually searching through long documents, users can query QuorAI to extract precise answers using advanced NLP techniques. The application is designed for students, researchers, and professionals who need efficient knowledge retrieval from large documents.

## Key Features

- **PDF Upload & Processing**: Real-time text extraction and document processing
- **AI-Powered Q&A**: Ask questions about uploaded document content using natural language
- **Intelligent Text Chunking**: Documents are split into manageable chunks for better processing
- **Question History**: Track all previous questions and answers in each session
- **Real-time Processing**: Get instant answers using DistilBERT model
- **Error Handling & Loading States**: Smooth UX with proper feedback
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI**: Clean, professional interface with animations and gradients

## Tech Stack

**Frontend:**
- React (functional components, hooks)
- Axios (HTTP client)
- Modern CSS with animations and responsive design

**Backend:**
- Flask (Python web framework)
- Flask-CORS (Cross-Origin Resource Sharing)
- RESTful API design

**AI/NLP:**
- Hugging Face Transformers (distilbert-base-uncased-distilled-squad)
- LangChain (document processing and Q&A chains)
- PyPDF2 (PDF text extraction)
- RecursiveCharacterTextSplitter (intelligent text chunking)

**Data Handling:**
- JSON-based client-server communication
- In-memory session store (demo setup)

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 14+
- Git

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/badrinagarjun/QuorAI.git
   cd QuorAI
   ```

2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   # or
   source venv/bin/activate  # macOS/Linux
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Flask server:**
   ```bash
   python main.py
   ```
   The backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:3000`

## Usage

1. **Start both servers** (backend on port 5000, frontend on port 3000)
2. **Open your browser** and go to `http://localhost:3000`
3. **Upload a PDF** using the drag-and-drop interface or file selector
4. **Wait for processing** - the system will extract text and prepare it for Q&A
5. **Ask questions** about the document content in natural language
6. **View AI-generated answers** with proper formatting
7. **Browse question history** to see all previous Q&A pairs with timestamps
