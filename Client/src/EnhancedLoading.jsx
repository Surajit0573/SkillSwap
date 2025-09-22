import React from 'react';

const EnhancedLoading = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        {/* Main spinner */}
        <div className="spinner-wrapper">
          <div className="main-spinner"></div>
          <div className="spinner-ring"></div>
        </div>
        
        {/* Animated text */}
        <div className="loading-text">
          <span className="loading-word">Loading</span>
          <div className="dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="progress-container">
          <div className="progress-bar"></div>
        </div>
        
        {/* Floating particles */}
        <div className="particles">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}></div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .loading-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #0f1419 0%, #1a1f36 50%, #000000 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          overflow: hidden;
        }
        
        .loading-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }
        
        /* Main Spinner */
        .spinner-wrapper {
          position: relative;
          width: 120px;
          height: 120px;
        }
        
        .main-spinner {
          width: 100%;
          height: 100%;
          border: 4px solid rgba(96, 165, 250, 0.3);
          border-top: 4px solid #60a5fa;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          position: relative;
          box-shadow: 0 0 30px rgba(96, 165, 250, 0.4);
        }
        
        .spinner-ring {
          position: absolute;
          top: -10px;
          left: -10px;
          width: 140px;
          height: 140px;
          border: 2px solid transparent;
          border-top: 2px solid rgba(147, 197, 253, 0.6);
          border-radius: 50%;
          animation: spin 2s linear infinite reverse;
          box-shadow: 0 0 20px rgba(147, 197, 253, 0.3);
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Loading Text */
        .loading-text {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .loading-word {
          color: #e2e8f0;
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          animation: pulse 2s ease-in-out infinite;
          text-shadow: 0 0 10px rgba(96, 165, 250, 0.5);
        }
        
        .dots {
          display: flex;
          gap: 0.25rem;
        }
        
        .dot {
          width: 8px;
          height: 8px;
          background-color: #60a5fa;
          border-radius: 50%;
          animation: bounce 1.4s ease-in-out infinite both;
          box-shadow: 0 0 8px rgba(96, 165, 250, 0.6);
        }
        
        .dot:nth-child(1) { animation-delay: -0.32s; }
        .dot:nth-child(2) { animation-delay: -0.16s; }
        .dot:nth-child(3) { animation-delay: 0s; }
        
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        /* Progress Bar */
        .progress-container {
          width: 200px;
          height: 4px;
          background-color: rgba(30, 41, 59, 0.8);
          border-radius: 2px;
          overflow: hidden;
          border: 1px solid rgba(96, 165, 250, 0.2);
        }
        
        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #1e3a8a, #3b82f6, #60a5fa, #93c5fd);
          background-size: 200% 100%;
          border-radius: 2px;
          animation: progress 2s ease-in-out infinite, shimmer 1.5s linear infinite;
          box-shadow: 0 0 10px rgba(96, 165, 250, 0.5);
        }
        
        @keyframes progress {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        /* Floating Particles */
        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        
        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background-color: rgba(96, 165, 250, 0.7);
          border-radius: 50%;
          animation: float 4s ease-in-out infinite;
          box-shadow: 0 0 12px rgba(96, 165, 250, 0.8);
        }
        
        .particle-1 { top: 20%; left: 10%; animation-delay: 0s; }
        .particle-2 { top: 80%; left: 20%; animation-delay: 0.5s; }
        .particle-3 { top: 40%; right: 10%; animation-delay: 1s; }
        .particle-4 { bottom: 30%; right: 20%; animation-delay: 1.5s; }
        .particle-5 { top: 60%; left: 50%; animation-delay: 2s; }
        .particle-6 { top: 10%; right: 30%; animation-delay: 2.5s; }
        .particle-7 { bottom: 10%; left: 30%; animation-delay: 3s; }
        .particle-8 { top: 30%; left: 70%; animation-delay: 3.5s; }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .spinner-wrapper {
            width: 80px;
            height: 80px;
          }
          
          .spinner-ring {
            top: -8px;
            left: -8px;
            width: 96px;
            height: 96px;
          }
          
          .loading-word {
            font-size: 1.25rem;
          }
          
          .progress-container {
            width: 150px;
          }
        }
      `}</style>
    </div>
  );
};

export default EnhancedLoading;