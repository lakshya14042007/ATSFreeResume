import React from 'react'
import logo from '../Assests/LogoResume.png'
import './Styles/ResumeBuilder.css'
import FormPannel from './FormPannel'
import LivePreview from './LivePreview'
import ResumePDFButton from './ResumePDFButton'
const ResumeBuilder = () => {
    const [ResumeData, setResumeData] = React.useState({
        personalInfo: {
            FullName: '',
            ProffesionalTitle: '',
            Email: '',
            Phone: '',
            city: '',
            state: '',
            country: '',
            linkedin: '',
            github: '',
            portfolio: '',
        },
        proffesionalSummary: '',
        skills: [],
        experience: [],
        projects: [],   
        Education: [],
        certificates: [],
        extraCirculam: [],
    })

    return (
        <div className="resumeBuilderWrapper">
        <nav className="navContainer">
        <img src={logo} className="logo" alt="Logo" />
        <ResumePDFButton ResumeData={ResumeData} />
        </nav>

        <div className="mainContainer">
            <FormPannel ResumeData={ResumeData} setResumeData={setResumeData} />
            <LivePreview ResumeData={ResumeData} />
        </div>
        </div>
    )
}

export default ResumeBuilder
