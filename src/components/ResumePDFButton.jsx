import React, { useState, useEffect, useMemo } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import ResumePDF from './ResumePdf'

const styles = {
  link: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    padding: '9px 18px',
    borderRadius: 3,
    border: '1px solid #C1440E',
    backgroundColor: '#C1440E',
    color: '#FAF9F5',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    display: 'inline-block',
  },
  readyLink: {
    fontFamily: "'Courier New', monospace",
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    padding: '12px 24px',
    borderRadius: 4,
    border: '1px solid #16A34A',
    backgroundColor: '#16A34A',
    color: '#FFFFFF',
    textDecoration: 'none',
    cursor: 'pointer',
    display: 'block',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  errorLink: {
    fontFamily: "'Courier New', monospace",
    fontSize: 13,
    padding: '12px 24px',
    borderRadius: 4,
    border: '1px solid #DC2626',
    backgroundColor: '#FEE2E2',
    color: '#991B1B',
    display: 'block',
    width: '100%',
    textAlign: 'center',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(28, 36, 48, 0.85)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  modal: {
    backgroundColor: '#FFFFFF',
    padding: '28px',
    borderRadius: '8px',
    maxWidth: '420px',
    width: '90%',
    textAlign: 'center',
    borderTop: '4px solid #C1440E',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
    fontFamily: 'Georgia, "Times New Roman", serif',
    color: '#1C2430',
  },
}

const buildFileName = (personalInfo) => {
  const name = (personalInfo?.FullName || 'resume').trim().replace(/\s+/g, '_')
  return `${name}_Resume.pdf`
}

// Direct Link — Monetag dashboard se "Direct Link" card ka "+ Get tag" dabao,
// wahan se milega ek plain URL (jaise https://xyz.com/4/xxxxxxx), wahi yahan daalo
const MONETAG_DIRECT_LINK = "https://omg10.com/4/11346320"

const ResumePDFButton = ({ ResumeData }) => {
  const [showModal, setShowModal] = useState(false)
  const [timeLeft, setTimeLeft] = useState(10)
  const [canDownload, setCanDownload] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [snapshot, setSnapshot] = useState(null)

  const handleInitialClick = (e) => {
    e.preventDefault()

    if (!ResumeData) {
      console.error('ResumeData is missing — cannot generate PDF.')
      return
    }

    // Ek hi popunder, ek hi user-gesture pe — clean aur predictable
   // window.open(MONETAG_DIRECT_LINK, '_blank')

    setSnapshot(ResumeData)
    setShowModal(true)
    setTimeLeft(10)
    setCanDownload(false)
    setIsDownloading(false)
  }

  useEffect(() => {
   setCanDownload(true)
   {/* if (!showModal || canDownload) return

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanDownload(true)
    }*/}
  }, [showModal, timeLeft, canDownload])

  const handleDownloadClick = () => {
    setIsDownloading(true)
    setTimeout(() => {
      setShowModal(false)
      setIsDownloading(false)
    }, 2000)
  }

  const pdfDocument = useMemo(() => {
    if (!snapshot) return null
    return <ResumePDF ResumeData={snapshot} />
  }, [snapshot])

  return (
    <>
      <button onClick={handleInitialClick} style={styles.link}>
        Download PDF
      </button>

      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>

            <h3 style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: 'bold' }}>
              Preparing Your ATS Resume…
            </h3>

            <p style={{ fontSize: '13.5px', color: '#4A4438', lineHeight: '1.5', marginBottom: '20px' }}>
              Download your pdf
            </p>

      {!canDownload ? (
        <div style={{ backgroundColor: '#F7F5EE', padding: '16px', borderRadius: '6px', border: '1px solid #DAD5C8', marginBottom: '16px' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#C1440E', fontFamily: "'Courier New', monospace" }}>
            {String(timeLeft).padStart(2, '0')}s
          </div>
          <div style={{ fontSize: '11px', color: '#6B6558', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '4px' }}>
            Please wait while we format your clean A4 PDF
          </div>
        </div>
      ) : pdfDocument ? (
  // ...download button same rahega
              <div style={{ marginBottom: '12px' }}>
                <PDFDownloadLink
                  document={pdfDocument}
                  fileName={buildFileName(snapshot?.personalInfo)}
                  style={styles.readyLink}
                  onClick={handleDownloadClick}
                >
                  {({ loading, error }) => {
                    if (error) {
                      console.error('PDF generation error:', error)
                      return '⚠️ Failed — tap to retry'
                    }
                    if (loading) return 'Compiling File...'
                    if (isDownloading) return '🚀 Downloading Now...'
                    return '⬇️ Save PDF Now (Free)'
                  }}
                </PDFDownloadLink>
              </div>
            ) : (
              <div style={styles.errorLink}>No resume data found.</div>
            )}

            <button
              onClick={() => setShowModal(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#6B6558',
                fontSize: '12px',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontFamily: "'Courier New', monospace",
              }}
            >
              Cancel and return to editor
            </button>

          </div>
        </div>
      )}
    </>
  )
}

export default ResumePDFButton