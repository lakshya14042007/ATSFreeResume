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

    setSnapshot(ResumeData)
    setShowModal(true)
    setTimeLeft(10)
    setCanDownload(false)
    setIsDownloading(false)
  }

  // 10-Second Timer Logic
  useEffect(() => {
    if (!showModal || canDownload) return

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanDownload(true)
    }
  }, [showModal, timeLeft, canDownload])

  // In-Page Push banner — appended into our own container instead of document.body,
  // so it renders inside the box under the timer, not floating on the whole page.
  useEffect(() => {
    if (showModal && !canDownload) {
      const adContainer = document.getElementById('monetag-modal-ad-zone')

      if (adContainer && adContainer.children.length === 0) {
        const script = document.createElement('script')
        script.dataset.zone = '11344297'
        script.src = 'https://nap5k.com/tag.min.js'
        script.async = true
        adContainer.appendChild(script)
      }
    }
  }, [showModal, canDownload])

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
              To keep our ATS Resume Builder 100% free with <b>no paywalls or watermarks</b>, we show a brief sponsor message during download.
            </p>

            {!canDownload ? (
              <>
                {/* 10 Second Timer Box */}
                <div style={{ backgroundColor: '#F7F5EE', padding: '16px', borderRadius: '6px', border: '1px solid #DAD5C8', marginBottom: '12px' }}>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#C1440E', fontFamily: "'Courier New', monospace" }}>
                    {String(timeLeft).padStart(2, '0')}s
                  </div>
                  <div style={{ fontSize: '11px', color: '#6B6558', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '4px' }}>
                    Please wait while we format your clean A4 PDF
                  </div>
                </div>

                {/* Banner ad renders here — timer ke neeche */}
                <div
                  id="monetag-modal-ad-zone"
                  style={{
                    minHeight: '80px',
                    width: '100%',
                    backgroundColor: '#FAFAFA',
                    border: '1px dashed #CCC',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  {/* Script append hote hi ad yahan dikhega */}
                </div>
              </>
            ) : pdfDocument ? (
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