import React from 'react'

const styles = {
  sectionTitle: { fontFamily: 'Georgia, serif', fontSize: 22, color: '#1C2430', margin: '0 0 4px' },
  sectionMeta: { fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A9384', marginBottom: 24 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  fullRow: { gridColumn: '1 / -1' },
  field: { display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 },
  label: { fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6B6558' },
  input: { fontFamily: 'Georgia, serif', fontSize: 14, padding: '10px 12px', border: '1px solid #DAD5C8', borderRadius: 4, backgroundColor: '#FFFFFF', color: '#1C2430', outline: 'none' },
}

const PersonalInfo1 = ({ ResumeData, setResumeData }) => {
  const handleChange = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }))
  }

  const fields = [
    { key: 'FullName', label: 'Full Name', full: true },
    { key: 'ProffesionalTitle', label: 'Professional Title', full: true },
    { key: 'Email', label: 'Email' },
    { key: 'Phone', label: 'Phone' },
    { key: 'city', label: 'City' },
    { key: 'state', label: 'State' },
    { key: 'country', label: 'Country' },
    { key: 'linkedin', label: 'LinkedIn' },
    { key: 'github', label: 'GitHub' },
    { key: 'portfolio', label: 'Portfolio' },
  ]

  return (
    <div>
      <h2 style={styles.sectionTitle}>Personal Information</h2>
      <p style={styles.sectionMeta}>Section 01 — Contact Details</p>
      <div style={styles.grid}>
        {fields.map(f => (
          <div key={f.key} style={{ ...styles.field, ...(f.full ? styles.fullRow : {}) }}>
            <label style={styles.label}>{f.label}</label>
            <input
              style={styles.input}
              type="text"
              value={ResumeData.personalInfo[f.key]}
              onChange={(e) => handleChange(f.key, e.target.value)}
              placeholder={f.label}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PersonalInfo1