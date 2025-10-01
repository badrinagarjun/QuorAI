import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css';

const FileUpload = ({ onUploadSuccess, isUploading, setIsUploading }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setUploadStatus('');
    } else {
      setUploadStatus('Please select a valid PDF file.');
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a PDF file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    setIsUploading(true);
    setUploadStatus('Uploading and processing...');

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadStatus(`Success: ${response.data.message}`);
      onUploadSuccess(selectedFile.name, response.data.num_chunks);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus(
        error.response?.data?.error || 'Upload failed. Please try again.'
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="file-upload">
      <h2>Upload PDF Document</h2>
      <div className="upload-area">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          disabled={isUploading}
          className="file-input"
          id="file-input"
        />
        <label htmlFor="file-input" className="file-label">
          {selectedFile ? selectedFile.name : 'Choose PDF file...'}
        </label>
        <button
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
          className="upload-button"
        >
          {isUploading ? 'Processing...' : 'Upload & Process'}
        </button>
      </div>
      {uploadStatus && (
        <div className={`status ${uploadStatus.startsWith('Success') ? 'success' : 'error'}`}>
          {uploadStatus}
        </div>
      )}
    </div>
  );
};

export default FileUpload;