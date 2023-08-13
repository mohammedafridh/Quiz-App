import React from 'react';
import './Result.css'

const Result = ({ showResult, quizs, marks, startOver }) => {

    const calculateScore = ()=>{
        const total = (marks / 50) * 100

        if(total<50){
            return <h2>Your are a digital marketing novice.</h2>
        }else if(total>51 && total<60){
            return <h2>Your are a digital marketing seed.</h2>
        }else if(total>61 && total<70){
            return <h2>Your are a digital marketing rising star.</h2>
        }else if(total>71 && total<80){
            return <h2>Your are a digital marketing star.</h2>
        }else{
            return <h2>Your are a digital marketing rock star.</h2>
        }
    }

    const resultHandler = ()=>{
    }

    return (
        <section className="resultSection" style={{ display: `${showResult ? 'block' : 'none'}` }}>
            <form className="container" onSubmit = {resultHandler}>
                <div className="resultsContainer">
                    <div className="results">
                        <div className={`marksContainer ${marks > 24 ? 'good' : 'bad'}`}>
                            <h1 className='resultStatus'>{calculateScore()}</h1>
                            <h3 className={`resultText ${marks > 24 ? 'high' : 'low'}`}>Your score is {marks} out of {quizs.length * 5}</h3>

                            <button type = 'submit' className='btn startOverBtn'>Start Over</button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default Result;