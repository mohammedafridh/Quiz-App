import React from 'react';
import './Start.css'

const Start = ({ startQuiz, showStart }) => {
    return (
        <section className='startSection' style={{ display: `${showStart ? 'block' : 'none'}` }}>
            <div className="container">
                <div className="containerDetails">
                    <div className="homepageDetails">
                        <h1>How skilled are you in Digital Marketting?</h1>
                        <h3>Answer these questions with maximum accuracy possible,
                            to get an assessment about your digital marketting skills level
                        </h3>
                        <h6>In this section you have 10 Multiple Choice Questions to be answered within 10 minutes</h6>
                        <button onClick={startQuiz} className='assessmentBtn'>TAKE ASSESSMENT</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Start;