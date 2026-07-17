import React from 'react'

const styles = {
  sectionTitle: { fontFamily: 'Georgia, serif', fontSize: 22, color: '#1C2430', margin: '0 0 4px' },
  sectionMeta: { fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A9384', marginBottom: 24 },
  card: { border: '1px solid #DAD5C8', borderRadius: 6, padding: 16, marginBottom: 16, backgroundColor: '#F7F5EE' },
  cardHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardLabel: { fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: '0.08em', color: '#C1440E', textTransform: 'uppercase' },
  removeBtn: { fontFamily: "'Courier New', monospace", fontSize: 11, color: '#9A9384', background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  field: { display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 },
  label: { fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6B6558' },
  input: { fontFamily: 'Georgia, serif', fontSize: 14, padding: '8px 10px', border: '1px solid #DAD5C8', borderRadius: 4, backgroundColor: '#FFFFFF', color: '#1C2430', outline: 'none' },
  addBtn: { fontFamily: "'Courier New', monospace", fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '10px 16px', borderRadius: 3, border: '1px dashed #C1440E', backgroundColor: 'transparent', color: '#C1440E', cursor: 'pointer', width: '100%' },
}

const emptyEdu = { school: '', degree: '', field: '', startYear: '', endYear: '' }

const Education6 = ({ ResumeData, setResumeData }) => {
  const addEntry = () => {
    setResumeData(prev => ({ ...prev, Education: [...prev.Education, { ...emptyEdu }] }))
  }

  const updateEntry = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      Education: prev.Education.map((edu, i) => i === index ? { ...edu, [field]: value } : edu)
    }))
  }

  const removeEntry = (index) => {
    setResumeData(prev => ({ ...prev, Education: prev.Education.filter((_, i) => i !== index) }))
  }

  return (
    <div>
      <h2 style={styles.sectionTitle}>Education</h2>
      <p style={styles.sectionMeta}>Section 06 — Most recent first</p>

      {ResumeData.Education.map((entry, i) => (
        <div key={i} style={styles.card}>
          <div style={styles.cardHead}>
            <span style={styles.cardLabel}>School {String(i + 1).padStart(2, '0')}</span>
            <button style={styles.removeBtn} onClick={() => removeEntry(i)}>Remove</button>
          </div>
          <div style={styles.grid}>
            <div style={{ ...styles.field, gridColumn: '1 / -1' }}>
              <label style={styles.label}>School / University</label>
              <input style={styles.input} value={entry.school} onChange={(e) => updateEntry(i, 'school', e.target.value)} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Degree</label>
              <input style={styles.input} placeholder="BCA" value={entry.degree} onChange={(e) => updateEntry(i, 'degree', e.target.value)} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Field of Study</label>
              <input style={styles.input} value={entry.field} onChange={(e) => updateEntry(i, 'field', e.target.value)} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Start Year</label>
              <input style={styles.input} value={entry.startYear} onChange={(e) => updateEntry(i, 'startYear', e.target.value)} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>End Year</label>
              <input style={styles.input} value={entry.endYear} onChange={(e) => updateEntry(i, 'endYear', e.target.value)} />
            </div>
          </div>
        </div>
      ))}

      <button style={styles.addBtn} onClick={addEntry}>+ Add Education</button>
    </div>
  )
}

export default Education6