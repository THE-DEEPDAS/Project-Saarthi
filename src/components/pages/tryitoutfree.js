import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function TryForFreePage() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState(null);
  const [showBuyNow, setShowBuyNow] = useState(false);
  const [pdfError, setPdfError] = useState(null);
  const { bookId } = useParams();
  const navigate = useNavigate();

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onDocumentLoadError = (error) => {
    console.error("Failed to load PDF", error);
    setPdfError("Failed to load PDF. Please try again later.");
  };

  useEffect(() => {
    const updatePageWidth = () => {
      const containerWidth = document.querySelector('.pdf-viewer').clientWidth;
      setPageWidth(containerWidth - 40); // Subtracting padding
    };

    window.addEventListener('resize', updatePageWidth);
    updatePageWidth();

    return () => window.removeEventListener('resize', updatePageWidth);
  }, []);

  useEffect(() => {
    if (pageNumber >= 8) {
      setShowBuyNow(true);
    } else {
      setShowBuyNow(false);
    }
  }, [pageNumber]);

  const handleBuyNow = () => {
    navigate(`/product/${bookId}`);
  };

  const handlePrevPage = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  };

  const handleNextPage = () => {
    setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages || 1));
  };

  return (
    <div className="container">
      <div className="content-wrapper">
        <div className={`pdf-container ${showBuyNow ? 'blurred' : ''}`}>
          <div className="pdf-viewer">
            {pdfError ? (
              <div className="error-message">{pdfError}</div>
            ) : (
              <Document
                file="/Sample Book Physics.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={<div>Loading PDF...</div>}
              >
                <Page 
                  pageNumber={pageNumber} 
                  width={pageWidth}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                />
              </Document>
            )}
          </div>
          <div className="navigation">
            <button
              className="nav-button prev"
              disabled={pageNumber <= 1}
              onClick={handlePrevPage}
              aria-label="Previous page"
            >
              ← Previous
            </button>
            <p>
              Page {pageNumber} of {numPages}
            </p>
            <button
              className="nav-button next"
              disabled={pageNumber >= numPages}
              onClick={handleNextPage}
              aria-label="Next page"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
      {showBuyNow && (
        <div className="buy-now-overlay">
          <div className="buy-now-message">
            <h2>Want to read more?</h2>
            <p>Purchase the full book to continue reading!</p>
            <button onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      )}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh;
          background-color: #121212;
          color: #fff;
        }

        .content-wrapper {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          display: flex;
          justify-content: center;
        }

        .pdf-container {
          width: 50%;
          max-width: 600px;
          height: 80vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: filter 0.5s ease;
          background-color: #1e1e1e;
          padding: 20px;
          border-radius: 8px;
          overflow: hidden;
        }

        .pdf-viewer {
          flex-grow: 1;
          width: 100%;
          overflow-y: auto;
          margin-bottom: 1rem;
          background-color: #2a2a2a;
          border-radius: 4px;
        }

        .pdf-container.blurred {
          filter: blur(5px);
        }

        .navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 0.5rem;
          background-color: #2a2a2a;
          border-radius: 4px;
        }

        .nav-button {
          background-color: #8b5cf6;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s;
          border-radius: 4px;
        }

        .nav-button:hover {
          background-color: #7c3aed;
        }

        .nav-button:disabled {
          background-color: #4b5563;
          cursor: not-allowed;
        }

        .buy-now-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .buy-now-message {
          background-color: #1f2937;
          padding: 2rem;
          border-radius: 0.5rem;
          text-align: center;
        }

        .buy-now-message h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #8b5cf6;
        }

        .buy-now-message p {
          margin-bottom: 1rem;
        }

        .buy-now-message button {
          background-color: #f97316;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s;
        }

        .buy-now-message button:hover {
          background-color: #ea580c;
        }

        .error-message {
          color: #ef4444;
          text-align: center;
          margin: 2rem 0;
        }

        @media (max-width: 768px) {
          .content-wrapper {
            padding: 1rem;
          }

          .pdf-container {
            width: 100%;
            height: 60vh;
          }

          .navigation {
            flex-direction: column;
            gap: 1rem;
          }

          .nav-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}