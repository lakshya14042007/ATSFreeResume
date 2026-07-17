import React from 'react'
import {
  Document,
  Page,
  View,
  Text,
  Link,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer'

// ============ STYLES ============
const ACCENT_BLUE = '#1E4FA3'

const styles = StyleSheet.create({
  page: {
    paddingTop: 42,
    paddingBottom: 42,
    paddingHorizontal: 40,
    fontFamily: 'Times-Roman',
    fontSize: 10.5,
    color: '#1C2430',
  },

  // ---- Header ----
  header: {
    textAlign: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#1C2430',
    paddingBottom: 10,
    marginBottom: 14,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Times-Bold',
    marginBottom: 3,
  },
  title: {
    fontSize: 10,
    fontFamily: 'Courier',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#333333',
    marginBottom: 6,
  },
  // contact row: was cramped — added top margin, tighter line height, smaller gap between items
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    fontSize: 9,
    color: '#333333',
    marginTop: 4,
    paddingHorizontal: 10,
  },
  contactItem: {
    marginHorizontal: 4,
    lineHeight: 1.4,
  },

  // ---- Section ----
  section: {
    marginBottom: 11,
  },
  // section headings now blue, letterSpacing brought way down (1.4 was rendering
  // as huge gaps between letters), underline also blue to match
  sectionHeading: {
    fontSize: 10.5,
    fontFamily: 'Courier-Bold',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: ACCENT_BLUE,
    borderBottomWidth: 1,
    borderBottomColor: ACCENT_BLUE,
    paddingBottom: 3,
    marginBottom: 6,
  },

  // ---- Summary ----
  bodyText: {
    fontSize: 10.5,
    lineHeight: 1.45,
  },

  // ---- Skills ----
  skillsText: {
    fontSize: 10.5,
    lineHeight: 1.5,
  },

  // ---- Entry blocks ----
  entryBlock: {
    marginBottom: 8,
  },
  entryHeadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  entryTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    flexGrow: 1,
    paddingRight: 8,
  },
  entryDate: {
    fontSize: 9,
    fontFamily: 'Courier',
    color: '#444444',
    whiteSpace: 'nowrap',
  },
  entrySub: {
    fontSize: 10,
    fontFamily: 'Times-Italic',
    color: '#333333',
    marginTop: 1,
    marginBottom: 3,
  },
  entryLink: {
    fontSize: 9.5,
    fontFamily: 'Courier',
    color: '#333333',
    marginBottom: 3,
    textDecoration: 'none',
  },
  entryDesc: {
    fontSize: 10,
    lineHeight: 1.45,
  },

  emptyState: {
    fontSize: 10,
    fontFamily: 'Times-Italic',
    color: '#666666',
  },
})

// ============ HELPERS ============

const hasContent = (val) => {
  if (Array.isArray(val)) return val.length > 0
  if (typeof val === 'string') return val.trim().length > 0
  return false
}

const isUrl = (str = '') => /^https?:\/\//i.test(str) || /\.(com|io|dev|org|net)/i.test(str)

// ============ PDF DOCUMENT ============

const ResumePDF = ({ ResumeData }) => {
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

  const nothingFilled =
    !hasContent(personalInfo.FullName) &&
    !hasContent(proffesionalSummary) &&
    !hasContent(skills) &&
    !hasContent(experience)

  return (
    <Document title={`${personalInfo.FullName || 'Resume'}`} author={personalInfo.FullName || ''}>
      <Page size="A4" style={styles.page}>

        {/* ---- Header ---- */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.FullName || 'Your Name'}</Text>

          {hasContent(personalInfo.ProffesionalTitle) && (
            <Text style={styles.title}>{personalInfo.ProffesionalTitle}</Text>
          )}

          {contactParts.length > 0 && (
            <View style={styles.contactRow}>
              {contactParts.map((part, i) => (
                <Text key={i} style={styles.contactItem}>
                  {part}{i < contactParts.length - 1 ? '  \u00B7' : ''}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* ---- Professional Summary ---- */}
        {hasContent(proffesionalSummary) && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Professional Summary</Text>
            <Text style={styles.bodyText}>{proffesionalSummary}</Text>
          </View>
        )}

        {/* ---- Skills ---- */}
        {hasContent(skills) && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Skills</Text>
            <Text style={styles.skillsText}>{skills.join('  \u2022  ')}</Text>
          </View>
        )}

        {/* ---- Experience ---- */}
        {hasContent(experience) && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Experience</Text>
            {experience.map((entry, i) => (
              <View key={i} style={styles.entryBlock} wrap={false}>
                <View style={styles.entryHeadRow}>
                  <Text style={styles.entryTitle}>
                    {entry.role || 'Role'}{entry.company ? `, ${entry.company}` : ''}
                  </Text>
                  {(entry.startDate || entry.endDate) && (
                    <Text style={styles.entryDate}>
                      {entry.startDate} — {entry.endDate}
                    </Text>
                  )}
                </View>
                {entry.location && <Text style={styles.entrySub}>{entry.location}</Text>}
                {entry.description && <Text style={styles.entryDesc}>{entry.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* ---- Projects ---- */}
        {hasContent(projects) && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Projects</Text>
            {projects.map((entry, i) => (
              <View key={i} style={styles.entryBlock} wrap={false}>
                <View style={styles.entryHeadRow}>
                  <Text style={styles.entryTitle}>{entry.title || 'Project'}</Text>
                </View>
                {entry.techStack && <Text style={styles.entrySub}>{entry.techStack}</Text>}
                {entry.link && (
                  isUrl(entry.link) ? (
                    <Link src={entry.link.startsWith('http') ? entry.link : `https://${entry.link}`} style={styles.entryLink}>
                      {entry.link}
                    </Link>
                  ) : (
                    <Text style={styles.entryLink}>{entry.link}</Text>
                  )
                )}
                {entry.description && <Text style={styles.entryDesc}>{entry.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* ---- Education ---- */}
        {hasContent(Education) && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Education</Text>
            {Education.map((entry, i) => (
              <View key={i} style={styles.entryBlock} wrap={false}>
                <View style={styles.entryHeadRow}>
                  <Text style={styles.entryTitle}>
                    {entry.degree || 'Degree'}{entry.field ? ` in ${entry.field}` : ''}
                  </Text>
                  {(entry.startYear || entry.endYear) && (
                    <Text style={styles.entryDate}>
                      {entry.startYear} — {entry.endYear}
                    </Text>
                  )}
                </View>
                {entry.school && <Text style={styles.entrySub}>{entry.school}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* ---- Certificates ---- */}
        {hasContent(certificates) && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Certificates</Text>
            {certificates.map((entry, i) => (
              <View key={i} style={styles.entryBlock} wrap={false}>
                <View style={styles.entryHeadRow}>
                  <Text style={styles.entryTitle}>{entry.title || 'Certificate'}</Text>
                  {entry.date && <Text style={styles.entryDate}>{entry.date}</Text>}
                </View>
                {entry.issuer && <Text style={styles.entrySub}>{entry.issuer}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* ---- Extra-Curricular ---- */}
        {hasContent(extraCirculam) && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Extra-Curricular</Text>
            {extraCirculam.map((entry, i) => (
              <View key={i} style={styles.entryBlock} wrap={false}>
                <Text style={styles.entryTitle}>{entry.title || 'Activity'}</Text>
                {entry.description && <Text style={styles.entryDesc}>{entry.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {nothingFilled && (
          <Text style={styles.emptyState}>No content added yet.</Text>
        )}

      </Page>
    </Document>
  )
}

export default ResumePDF