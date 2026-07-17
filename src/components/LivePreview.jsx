import React from 'react'

const styles = {
  outer: {
    height: '100%',
    overflowY: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 32,
    backgroundColor: '#E5E1D6',
  },
  page: {
    width: '210mm',
    minHeight: '297mm',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 0 16px rgba(28,36,48,0.12)',
    padding: '18mm 16mm',
    boxSizing: 'border-box',
    fontFamily: 'Georgia, "Times New Roman", serif',
    color: '#1C2430',
  },
  header: {
    textAlign: 'center',
    borderBottom: '2px solid #1C2430',
    paddingBottom: 12,
    marginBottom: 18,
  },
  name: {
    fontSize: 26,
    fontWeight: 700,
    letterSpacing: '0.02em',
    margin: 0,
  },
  title: {
    fontSize: 13,
    color: '#C1440E',
    fontFamily: "'Courier New', monospace",
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    margin: '4px 0 8px',
  },
  contactRow: {
    fontSize: 11.5,
    color: '#4A4438',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '4px 10px',
  },
  section: { marginBottom: 16 },
  sectionHeading: {
    fontSize: 12.5,
    fontFamily: "'Courier New', monospace",
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#1C2430',
    borderBottom: '1px solid #DAD5C8',
    paddingBottom: 4,
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 13,
    lineHeight: 1.55,
    margin: 0,
    color: '#2B3340',
  },
  skillsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillPill: {
    fontSize: 11.5,
    padding: '3px 10px',
    border: '1px solid #DAD5C8',
    borderRadius: 3,
    color: '#2B3340',
    backgroundColor: '#F7F5EE',
  },
  entryBlock: { marginBottom: 12 },
  entryHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  entryTitle: {
    fontSize: 14,
    fontWeight: 700,
    margin: 0,
  },
  entryDate: {
    fontSize: 11,
    fontFamily: "'Courier New', monospace",
    color: '#6B6558',
    whiteSpace: 'nowrap',
  },
  entrySub: {
    fontSize: 12.5,
    fontStyle: 'italic',
    color: '#4A4438',
    margin: '0 0 6px',
  },
  entryDesc: {
    fontSize: 12.5,
    lineHeight: 1.5,
    color: '#2B3340',
    margin: 0,
    whiteSpace: 'pre-line',
  },
  link: {
    fontSize: 11.5,
    color: '#C1440E',
    marginBottom: 4,
    fontFamily: "'Courier New', monospace",
  },
  emptyState: {
    fontSize: 12,
    color: '#B5AF9F',
    fontStyle: 'italic',
  },
}

const hasContent = (val) => {
  if (Array.isArray(val)) return val.length > 0
  if (typeof val === 'string') return val.trim().length > 0
  return false
}

const LivePreview = ({ ResumeData }) => {
  const {
    personalInfo,
    proffesionalSummary,
    skills,
    experience,
    projects,
    Education,
    certificates,
    extraCirculam,
  } = ResumeData

  const contactParts = [
    personalInfo.Email,
    personalInfo.Phone,
    [personalInfo.city, personalInfo.state, personalInfo.country].filter(Boolean).join(', '),
    personalInfo.linkedin,
    personalInfo.github,
    personalInfo.portfolio,
  ].filter(Boolean)

  return (
    <div style={styles.outer}>
      <div style={styles.page}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.name}>{personalInfo.FullName || 'Your Name'}</h1>
          {personalInfo.ProffesionalTitle && (
            <p style={styles.title}>{personalInfo.ProffesionalTitle}</p>
          )}
          {contactParts.length > 0 && (
            <div style={styles.contactRow}>
              {contactParts.map((part, i) => (
                <span key={i}>
                  {part}{i < contactParts.length - 1 ? ' \u00B7' : ''}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        {hasContent(proffesionalSummary) && (
          <div style={styles.section}>
            <h3 style={styles.sectionHeading}>Summary</h3>
            <p style={styles.summaryText}>{proffesionalSummary}</p>
          </div>
        )}

        {/* Skills */}
        {hasContent(skills) && (
          <div style={styles.section}>
            <h3 style={styles.sectionHeading}>Skills</h3>
            <div style={styles.skillsRow}>
              {skills.map((skill, i) => (
                <span key={i} style={styles.skillPill}>{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {hasContent(experience) && (
          <div style={styles.section}>
            <h3 style={styles.sectionHeading}>Experience</h3>
            {experience.map((entry, i) => (
              <div key={i} style={styles.entryBlock}>
                <div style={styles.entryHead}>
                  <p style={styles.entryTitle}>{entry.role || 'Role'}{entry.company ? `, ${entry.company}` : ''}</p>
                  {(entry.startDate || entry.endDate) && (
                    <span style={styles.entryDate}>{entry.startDate} — {entry.endDate}</span>
                  )}
                </div>
                {entry.location && <p style={styles.entrySub}>{entry.location}</p>}
                {entry.description && <p style={styles.entryDesc}>{entry.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {hasContent(projects) && (
          <div style={styles.section}>
            <h3 style={styles.sectionHeading}>Projects</h3>
            {projects.map((entry, i) => (
              <div key={i} style={styles.entryBlock}>
                <div style={styles.entryHead}>
                  <p style={styles.entryTitle}>{entry.title || 'Project'}</p>
                </div>
                {entry.techStack && <p style={styles.entrySub}>{entry.techStack}</p>}
                {entry.link && <p style={styles.link}>{entry.link}</p>}
                {entry.description && <p style={styles.entryDesc}>{entry.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {hasContent(Education) && (
          <div style={styles.section}>
            <h3 style={styles.sectionHeading}>Education</h3>
            {Education.map((entry, i) => (
              <div key={i} style={styles.entryBlock}>
                <div style={styles.entryHead}>
                  <p style={styles.entryTitle}>
                    {entry.degree || 'Degree'}{entry.field ? ` in ${entry.field}` : ''}
                  </p>
                  {(entry.startYear || entry.endYear) && (
                    <span style={styles.entryDate}>{entry.startYear} — {entry.endYear}</span>
                  )}
                </div>
                {entry.school && <p style={styles.entrySub}>{entry.school}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Certificates */}
        {hasContent(certificates) && (
          <div style={styles.section}>
            <h3 style={styles.sectionHeading}>Certificates</h3>
            {certificates.map((entry, i) => (
              <div key={i} style={styles.entryBlock}>
                <div style={styles.entryHead}>
                  <p style={styles.entryTitle}>{entry.title || 'Certificate'}</p>
                  {entry.date && <span style={styles.entryDate}>{entry.date}</span>}
                </div>
                {entry.issuer && <p style={styles.entrySub}>{entry.issuer}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Extra-curricular */}
        {hasContent(extraCirculam) && (
          <div style={styles.section}>
            <h3 style={styles.sectionHeading}>Extra-Curricular</h3>
            {extraCirculam.map((entry, i) => (
              <div key={i} style={styles.entryBlock}>
                <p style={styles.entryTitle}>{entry.title || 'Activity'}</p>
                {entry.description && <p style={styles.entryDesc}>{entry.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Empty state when nothing filled yet */}
        {!hasContent(personalInfo.FullName) &&
          !hasContent(proffesionalSummary) &&
          !hasContent(skills) &&
          !hasContent(experience) && (
            <p style={styles.emptyState}>Start filling the form — your resume builds itself here.</p>
          )}
      </div>
    </div>
  )
}

export default LivePreview