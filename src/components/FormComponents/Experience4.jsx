import React from 'react'

const styles = {
  sectionTitle: { fontFamily: 'Georgia, serif', fontSize: 22, color: '#1C2430', margin: '0 0 4px' },
  sectionMeta: { fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A9384', marginBottom: 24 },
  card: { border: '1px solid #DAD5C8', borderRadius: 6, padding: 16, marginBottom: 16, backgroundColor: '#F7F5EE', position: 'relative' },
  cardHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardLabel: { fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: '0.08em', color: '#C1440E', textTransform: 'uppercase' },
  removeBtn: { fontFamily: "'Courier New', monospace", fontSize: 11, color: '#9A9384', background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  fullRow: { gridColumn: '1 / -1' },
  field: { display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 },
  label: { fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6B6558' },
  input: { fontFamily: 'Georgia, serif', fontSize: 14, padding: '8px 10px', border: '1px solid #DAD5C8', borderRadius: 4, backgroundColor: '#FFFFFF', color: '#1C2430', outline: 'none' },
  textarea: { fontFamily: 'Georgia, serif', fontSize: 14, lineHeight: 1.5, padding: '8px 10px', border: '1px solid #DAD5C8', borderRadius: 4, backgroundColor: '#FFFFFF', color: '#1C2430', outline: 'none', minHeight: 70, resize: 'vertical', gridColumn: '1 / -1' },
  addBtn: { fontFamily: "'Courier New', monospace", fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '10px 16px', borderRadius: 3, border: '1px dashed #C1440E', backgroundColor: 'transparent', color: '#C1440E', cursor: 'pointer', width: '100%' },
}

const emptyEntry = { company: '', role: '', location: '', startDate: '', endDate: '', description: '' }

const Experience4 = ({ ResumeData, setResumeData }) => {
  const addEntry = () => {
    setResumeData(prev => ({ ...prev, experience: [...prev.experience, { ...emptyEntry }] }))
  }

  const updateEntry = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((entry, i) => i === index ? { ...entry, [field]: value } : entry)
    }))
  }

  const removeEntry = (index) => {
    setResumeData(prev => ({ ...prev, experience: prev.experience.filter((_, i) => i !== index) }))
  }

  return (
    <div>
      <h2 style={styles.sectionTitle}>Experience</h2>
      <p style={styles.sectionMeta}>Section 04 — Most recent role first</p>

      {ResumeData.experience.map((entry, i) => (
        <div key={i} style={styles.card}>
          <div style={styles.cardHead}>
            <span style={styles.cardLabel}>Role {String(i + 1).padStart(2, '0')}</span>
            <button style={styles.removeBtn} onClick={() => removeEntry(i)}>Remove</button>
          </div>
          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={styles.label}>Company</label>
              <input style={styles.input} value={entry.company} onChange={(e) => updateEntry(i, 'company', e.target.value)} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Role</label>
              <input style={styles.input} value={entry.role} onChange={(e) => updateEntry(i, 'role', e.target.value)} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Location</label>
              <input style={styles.input} value={entry.location} onChange={(e) => updateEntry(i, 'location', e.target.value)} />
            </div>
            <div style={{ ...styles.field, display: 'flex', flexDirection: 'row', gap: 8 }}>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>Start</label>
                <input style={styles.input} placeholder="Jan 2023" value={entry.startDate} onChange={(e) => updateEntry(i, 'startDate', e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>End</label>
                <input style={styles.input} placeholder="Present" value={entry.endDate} onChange={(e) => updateEntry(i, 'endDate', e.target.value)} />
              </div>
            </div>
            <textarea
              style={styles.textarea}
              placeholder="What did you build/ship/own..."
              value={entry.description}
              onChange={(e) => updateEntry(i, 'description', e.target.value)}
            />
          </div>
        </div>
      ))}

      <button style={styles.addBtn} onClick={addEntry}>+ Add Experience</button>
    </div>
  )
}

export default Experience4