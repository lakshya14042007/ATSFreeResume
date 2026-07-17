import React, { useState } from 'react'

const styles = {
  sectionTitle: { fontFamily: 'Georgia, serif', fontSize: 22, color: '#1C2430', margin: '0 0 4px' },
  sectionMeta: { fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A9384', marginBottom: 24 },
  label: { fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6B6558', display: 'block', marginBottom: 6 },
  inputRow: { display: 'flex', gap: 8, marginBottom: 20 },
  input: { flex: 1, fontFamily: 'Georgia, serif', fontSize: 14, padding: '10px 12px', border: '1px solid #DAD5C8', borderRadius: 4, backgroundColor: '#FFFFFF', color: '#1C2430', outline: 'none' },
  addBtn: { fontFamily: "'Courier New', monospace", fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '0 18px', borderRadius: 3, border: '1px solid #C1440E', backgroundColor: 'transparent', color: '#C1440E', cursor: 'pointer' },
  tagWrap: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  tag: { display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px 7px 14px', backgroundColor: '#F0EDE4', border: '1px solid #DAD5C8', borderRadius: 20, fontSize: 13, fontFamily: 'Georgia, serif', color: '#1C2430' },
  removeX: { cursor: 'pointer', color: '#9A9384', fontWeight: 'bold', fontFamily: "'Courier New', monospace", width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' },
}

const Skills3 = ({ ResumeData, setResumeData }) => {
  const [draft, setDraft] = useState('')

  const addSkill = () => {
    const trimmed = draft.trim()
    if (!trimmed) return
    setResumeData(prev => ({ ...prev, skills: [...prev.skills, trimmed] }))
    setDraft('')
  }

  const removeSkill = (index) => {
    setResumeData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div>
      <h2 style={styles.sectionTitle}>Skills</h2>
      <p style={styles.sectionMeta}>Section 03 — Languages, frameworks, tools</p>
      <div style={styles.inputRow}>
        <input
          style={styles.input}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. React"
        />
        <button style={styles.addBtn} onClick={addSkill}>+ Add</button>
      </div>
      <div style={styles.tagWrap}>
        {ResumeData.skills.map((skill, i) => (
          <span key={i} style={styles.tag}>
            {skill}
            <span style={styles.removeX} onClick={() => removeSkill(i)}>×</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Skills3