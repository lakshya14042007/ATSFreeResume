import React, { useState } from 'react'
import PersonalInfo1 from './FormComponents/PersonalInfo1'
import Objective2 from './FormComponents/Objective2'
import Skills3 from './FormComponents/Skills3'
import Experience4 from './FormComponents/Experience4'
import Projects5 from './FormComponents/Projects5'
import Education6 from './FormComponents/Education6'
import Certificate7 from './FormComponents/Certificate7'
import ExtraCirculam8 from './FormComponents/ExtraCirculam8'
import './Styles/FormPannel.css'

const steps = [
  { id: 1, label: 'Info', component: PersonalInfo1 },
  { id: 2, label: 'Summary', component: Objective2 },
  { id: 3, label: 'Skills', component: Skills3 },
  { id: 4, label: 'Exp', component: Experience4 },
  { id: 5, label: 'Proj', component: Projects5 },
  { id: 6, label: 'Edu', component: Education6 },
  { id: 7, label: 'Cert', component: Certificate7 },
  { id: 8, label: 'Extra', component: ExtraCirculam8 },
]

const FormPannel = ({ ResumeData, setResumeData }) => {
  const [activeStep, setActiveStep] = useState(1)
  console.log('ResumeData in FormPannel:', ResumeData) 

  const currentIndex = steps.findIndex(s => s.id === activeStep)
  const ActiveComponent = steps[currentIndex].component

  const goNext = () => {
    if (currentIndex < steps.length - 1) {
      setActiveStep(steps[currentIndex + 1].id)
    }
  }

  const goPrev = () => {
    if (currentIndex > 0) {
      setActiveStep(steps[currentIndex - 1].id)
    }
  }

  return (
    <div className="formPannel">
      {/* Top Tabs */}
      <div className="stepTabs">
        {steps.map((step, i) => (
            <button
            key={step.id}
            className={`stepTab ${activeStep === step.id ? 'activeTab' : ''} ${i < currentIndex ? 'completedTab' : ''}`}
            onClick={() => setActiveStep(step.id)}
            >
            <span className="stepNum">{String(step.id).padStart(2, '0')}</span>
            <span className="stepLabel">{step.label}</span>
            </button>
        ))}
        </div>

        <div className="progressRule">
        <div
            className="progressFill"
            style={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
        />
        </div>

      {/* Active Form Section */}
        <div className="stepContent">
        <ActiveComponent 
            ResumeData={ResumeData} 
            setResumeData={setResumeData} 
        />
        </div>

      {/* Bottom Navigation */}
      <div className="stepNav">
        <button
          className="navBtn prevBtn"
          onClick={goPrev}
          disabled={currentIndex === 0}
        >
          &lt; Previous Section
        </button>
        <button
          className="navBtn nextBtn"
          onClick={goNext}
          disabled={currentIndex === steps.length - 1}
        >
          Next Section &gt;
        </button>
      </div>
    </div>
  )
}

export default FormPannel