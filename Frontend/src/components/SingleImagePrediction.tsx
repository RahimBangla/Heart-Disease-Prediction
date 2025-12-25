import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import './SingleImagePrediction.css';

interface PredictionResult {
  prediction: string;
  confidence: number;
}

const SingleImagePrediction: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setResult(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp']
    },
    multiple: false
  });

  const handleRemoveImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
  };

  const handlePredict = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(' https://api.ml.yfbd.org/api/predict/single', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data);
      toast.success('Analysis completed successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error analyzing image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="single-image-prediction">
      <div className="prediction-layout">
        <div className="upload-section">
          <div className="section-header">
            <h2>Single Image Analysis</h2>
            <p>Upload a chest X-ray image to detect heart disease</p>
          </div>

          {!previewUrl ? (
            <div
              {...getRootProps()}
              className={`upload-area ${isDragActive ? 'dragover' : ''}`}
            >
              <input {...getInputProps()} />
              <div className="upload-content">
                <i className="fas fa-cloud-upload-alt"></i>
                <h3>Drop your image here</h3>
                <p>or click to browse</p>
              </div>
            </div>
          ) : (
            <div className="preview-area">
              <img src={previewUrl} alt="Preview" />
              <button className="remove-btn" onClick={handleRemoveImage}>
                <i className="fas fa-times"></i>
              </button>
            </div>
          )}

          <button
            className="predict-btn"
            onClick={handlePredict}
            disabled={!selectedFile || isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Analyzing...
              </>
            ) : (
              <>
                <i className="fas fa-search"></i>
                Analyze Image
              </>
            )}
          </button>
        </div>

        <div className="results-section">
          {result ? (
            <div className="result-card">
              <div className="result-header">
                <h3>
                  <i className="fas fa-chart-line"></i>
                  Analysis Results
                </h3>
              </div>
              <div className="result-content">
                <div className="prediction">
                  <div className="result-label">
                    <i className="fas fa-diagnoses"></i>
                    <span>Prediction</span>
                  </div>
                  <span
                    className={`value ${result.prediction === 'Cardiomegaly' ? 'positive' : 'negative'}`}
                  >
                    {result.prediction}
                  </span>
                </div>
                <div className="confidence">
                  <div className="result-label">
                    <i className="fas fa-percentage"></i>
                    <span>Confidence</span>
                  </div>
                  <span className="value">
                    {(result.confidence * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="confidence-bar">
                  <div 
                    className="confidence-fill" 
                    style={{ width: `${result.confidence * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="result-placeholder">
              <div className="placeholder-content">
                <i className="fas fa-microscope"></i>
                <h3>Analysis Results</h3>
                <p>Upload and analyze an image to see results here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleImagePrediction; 