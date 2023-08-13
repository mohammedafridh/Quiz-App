import React, { useEffect, useState } from 'react'
import './UserDetails.css'
import { Select, Input } from '@mantine/core';
import { useTaskContext } from '../context/TaskContext';

const UserDetails = ({ marks, showUserDetails, showTheResult, timeOver, data}) => {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [fullName, setFullName] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [currentWorkplace, setCurrentWorkplace] = useState('')
    const [jobRole, setJobRole] = useState('')
    const [result, setResult] = useState(marks)
    const { dispatch } = useTaskContext()
    const[messages,setMessages] = useState('')

    useEffect(() => {
        setResult(marks)
    }, [marks])

    const handleJobRoleChange = (value) => {
        setJobRole(value);
    };

    const saveAssessment = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        const assessmentDetails = { fullName, emailAddress, contactNumber, currentWorkplace, jobRole, result }
        const response = await fetch('/userRoute/create', {
            method: 'POST',
            body: JSON.stringify(assessmentDetails),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setLoading(false)
        } if (response.ok) {
            setError(null)
            setLoading(false)
            dispatch({ type: 'createWorkouts', payload: json })
            setFullName('')
            setEmailAddress('')
            setContactNumber('')
            setCurrentWorkplace('')
            setJobRole(null)
        }
    }

    const submitForm = () => {
        if (!fullName || !emailAddress || !contactNumber || !currentWorkplace || !jobRole) {
            return
        }if(contactNumber.length!==10){
            return
        }
        showTheResult()
    }

    return (
        <section className="userDetailsSection" style={{ display: `${showUserDetails ? 'block' : 'none'}` }}>

            <form onSubmit={saveAssessment}>
                <div className='userDetailsContainer'>

                    <div className={timeOver?'NotFinishedInTime':'finishedInTime'}>
                        {timeOver ?
                        <h5 className='finishedTime'>Sorry! Time’s up. Time allocated for this test is over 
                        Enter below details and Click “SHOW ME MY RESULTS” to see your results.</h5>
                        :<h5 className='notFinishedTime'>“Well done! You managed to complete the test on time. Now proceed forward to see
                        your results”</h5>
}
                    </div>

                    <div className="userDetails">
                        <h2>Personnal Information</h2>

                        {error ?
                            <p className='errorMsg'>{error}</p> : ''
                        }

                        <Input placeholder='Full Name' value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        <Input placeholder='Email Address' value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                        <Input type='number' placeholder='Mobile Phone Number' value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
                        <Input placeholder='Current Workplace' value={currentWorkplace} onChange={(e) => setCurrentWorkplace(e.target.value)} />
                        <Select
                            placeholder="Job Role"
                            data={[
                                { value: 'Marketing/Branding', label: 'Marketing/Branding' },
                                { value: 'Digital Marketting - Brand Side', label: 'Digital Marketting - Brand Side' },
                                { value: 'Digital Marketing - Agency Side', label: 'Digital Marketing - Agency Side' },
                                { value: 'Marketting Student', label: 'Marketting Student' },
                                { value: 'Not Employed', label: 'Not Employed' },
                                { value: 'Enterpreneur / Business Owner', label: 'Enterpreneur / Business Owner' },
                                { value: 'Other', label: 'Other' },
                            ]}
                            value={jobRole}
                            onChange={handleJobRoleChange}
                        />

                        <div className='btnContainer'>
                            <button type='submit' className='quizActionBtn' onClick={submitForm}>SHOW ME MY RESULTS</button>
                        </div>

                    </div>
                </div>
            </form>
        </section>
    )
}

export default UserDetails