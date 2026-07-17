import React from 'react'

const styles = {
  sectionTitle: { fontFamily: 'Georgia, serif', fontSize: 22, color: '#1C2430', margin: '0 0 4px' },
  sectionMeta: { fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A9384', marginBottom: 24 },
  label: { fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6B6558', display: 'block', marginBottom: 6 },
  textarea: { fontFamily: 'Georgia, serif', fontSize: 14, lineHeight: 1.6, padding: '12px 14px', border: '1px solid #DAD5C8', borderRadius: 4, backgroundColor: '#FFFFFF', color: '#1C2430', outline: 'none', width: '100%', minHeight: 160, resize: 'vertical', boxSizing: 'border-box' },
  counter: { fontFamily: "'Courier New', monospace", fontSize: 11, color: '#9A9384', marginTop: 8, textAlign: 'right' },
}

const Objective2 = ({ ResumeData, setResumeData }) => {
  const value = ResumeData.proffesionalSummary

  const handleChange = (e) => {
    setResumeData(prev => ({ ...prev, proffesionalSummary: e.target.value }))
  }

  return (
    <div>
      <h2 style={styles.sectionTitle}>Professional Summary</h2>
      <p style={styles.sectionMeta}>Section 02 — 2 to 4 sentences, no fluff</p>
      <label style={styles.label}>Summary</label>
      <textarea
        style={styles.textarea}
        value={value}
        onChange={handleChange}
        placeholder="Full-stack developer with 2+ years building..."
      />
      <div style={styles.counter}>{value.length} characters</div>
    </div>
  )
}

export default Objective2