import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './ui/TryForFree.css'

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
    </div>
  );
}