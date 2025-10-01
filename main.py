import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.question_answering import load_qa_chain
from langchain_community.llms import HuggingFacePipeline
from langchain.schema import Document
from transformers import pipeline

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
UPLOAD_FOLDER = "./resources"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Initialize Hugging Face QA pipeline
hf_qa = pipeline("question-answering", model="distilbert-base-uncased-distilled-squad")
llm = HuggingFacePipeline(pipeline=hf_qa)
qa_chain = load_qa_chain(llm, chain_type="stuff")

# Simple in-memory store (demo only)
SESSION = {}

def extract_text(pdf_file_path):
    reader = PdfReader(pdf_file_path)
    text = ""
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"
    return text

@app.route("/upload", methods=["POST"])
def upload():
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    text = extract_text(file_path)
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    chunks = splitter.split_text(text)

    # Convert chunks to LangChain Documents
    documents = [Document(page_content=chunk) for chunk in chunks]

    SESSION["documents"] = documents
    SESSION["filename"] = file.filename

    return jsonify({"message": f"{file.filename} uploaded and processed.", "num_chunks": len(chunks)})

@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    question = data.get("question")
    if not question:
        return jsonify({"error": "No question provided"}), 400

    documents = SESSION.get("documents", [])
    if not documents:
        return jsonify({"error": "No document uploaded."}), 400

    # Run QA chain
    answer = qa_chain.run(input_documents=documents, question=question)

    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(debug=True)
