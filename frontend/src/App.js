import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import QuestionAnswer from './components/QuestionAnswer';
import './App.css';

function App() {
  const [documentName, setDocumentName] = useState('');
  const [documentChunks, setDocumentChunks] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);

  const handleUploadSuccess = (filename, numChunks) => {
    setDocumentName(filename);
    setDocumentChunks(numChunks);
    setIsDocumentUploaded(true);
  };

  const handleReset = () => {
    setDocumentName('');
    setDocumentChunks(0);
    setIsDocumentUploaded(false);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>PDF Question & Answer System</h1>
        <p>Upload a PDF document and ask questions about its content using AI</p>
      </header>

      <main className="app-main">
        <div className="container">
          {/* Upload Section */}
          <section className="upload-section">
            <FileUpload
              onUploadSuccess={handleUploadSuccess}
              isUploading={isUploading}
              setIsUploading={setIsUploading}
            />
            
            {isDocumentUploaded && (
              <div className="document-info">
                <div className="info-card">
                  <h3>Document Processed Successfully!</h3>
                  <p><strong>File:</strong> {documentName}</p>
                  <p><strong>Text Chunks:</strong> {documentChunks}</p>
                  <button onClick={handleReset} className="reset-button">
                    Upload Different Document
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Q&A Section */}
          <section className="qa-section">
            <QuestionAnswer
              documentName={documentName}
              isDocumentUploaded={isDocumentUploaded}
            />
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 PDF Q&A System - Powered by Flask & React</p>
      </footer>
    </div>
  );
}

export default App;