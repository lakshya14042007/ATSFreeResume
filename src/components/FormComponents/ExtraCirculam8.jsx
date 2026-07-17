import React from 'react'

const styles = {
  sectionTitle: { fontFamily: 'Georgia, serif', fontSize: 22, color: '#1C2430', margin: '0 0 4px' },
  sectionMeta: { fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A9384', marginBottom: 24 },
  card: { border: '1px solid #DAD5C8', borderRadius: 6, padding: 16, marginBottom: 16, backgroundColor: '#F7F5EE' },
  cardHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardLabel: { fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: '0.08em', color: '#C1440E', textTransform: 'uppercase' },
  removeBtn: { fontFamily: "'Courier New', monospace", fontSize: 11, color: '#9A9384', background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase' },
  field: { display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 },
  label: { fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6B6558' },
  input: { fontFamily: 'Georgia, serif', fontSize: 14, padding: '8px 10px', border: '1px solid #DAD5C8', borderRadius: 4, backgroundColor: '#FFFFFF', color: '#1C2430', outline: 'none' },
  textarea: { fontFamily: 'Georgia, serif', fontSize: 14, lineHeight: 1.5, padding: '8px 10px', border: '1px solid #DAD5C8', borderRadius: 4, backgroundColor: '#FFFFFF', color: '#1C2430', outline: 'none', minHeight: 60, resize: 'vertical', width: '100%', boxSizing: 'border-box' },
  addBtn: { fontFamily: "'Courier New', monospace", fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '10px 16px', borderRadius: 3, border: '1px dashed #C1440E', backgroundColor: 'transparent', color: '#C1440E', cursor: 'pointer', width: '100%' },
}

const emptyActivity = { title: '', description: '' }

const ExtraCirculam8 = ({ ResumeData, setResumeData }) => {
  const addEntry = () => {
    setResumeData(prev => ({ ...prev, extraCirculam: [...prev.extraCirculam, { ...emptyActivity }] }))
  }

  const updateEntry = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      extraCirculam: prev.extraCirculam.map((a, i) => i === index ? { ...a, [field]: value } : a)
    }))
  }

  const removeEntry = (index) => {
    setResumeData(prev => ({ ...prev, extraCirculam: prev.extraCirculam.filter((_, i) => i !== index) }))
  }

  return (
    <div>
      <h2 style={styles.sectionTitle}>Extra-Curricular</h2>
      <p style={styles.sectionMeta}>Section 08 — Clubs, volunteering, hackathons</p>

      {ResumeData.extraCirculam.map((entry, i) => (
        <div key={i} style={styles.card}>
          <div style={styles.cardHead}>
            <span style={styles.cardLabel}>Activity {String(i + 1).padStart(2, '0')}</span>
            <button style={styles.removeBtn} onClick={() => removeEntry(i)}>Remove</button>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Title</label>
            <input style={styles.input} value={entry.title} onChange={(e) => updateEntry(i, 'title', e.target.value)} />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Description</label>
            <textarea style={styles.textarea} value={entry.description} onChange={(e) => updateEntry(i, 'description', e.target.value)} />
          </div>
        </div>
      ))}

      <button style={styles.addBtn} onClick={addEntry}>+ Add Activity</button>
    </div>
  )
}

export default ExtraCirculam8