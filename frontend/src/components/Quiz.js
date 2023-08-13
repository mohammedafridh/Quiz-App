import React, { useState, useEffect } from 'react';
import './Quiz.css'
import UserDetails from './UserDetails';

const Quiz = ({ showQuiz, question, quizs, checkAnswer, correctAnswer, selectedAnswer, details, questionIndex, nextQuestion, showTheResult, timeTrue, timeFalse }) => {


    const [remainingTime, setRemainingTime] = useState(600);

    //redict user to information page when the time is over. 
    useEffect(() => {
        if (remainingTime === 0) {
            details()
            timeTrue()
        }
    }, [remainingTime])

    //time implementation
    useEffect(() => {
        //condition to make time run if the showQuiz is true
        if (showQuiz) {
            const timerInterval = setInterval(() => {
                setRemainingTime((prevTime) => prevTime - 1);
            }, 1000);

            return () => {
                clearInterval(timerInterval);
            };
        }
    }, [showQuiz]);

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    // Format minutes and seconds with leading zeros
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    const detailsHandler = () => {
        details()
        timeFalse()
    }

    return (
        <section className="quizContainer" style={{ display: `${showQuiz ? 'block' : 'none'}` }}>
            <div className="container">
                <div className="quizContainerDetails">
                    <div className="quizDetails">
                        <div className="detailsCard">
                            <div className='timeContainer'>
                                {formattedMinutes}:{formattedSeconds}
                            </div>
                            <div className="quizHeading">
                                <h5>{question?.question}</h5>
                                <h5>Q{quizs.indexOf(question) + 1}</h5>
                            </div>
                            <div>
                                {
                                    question?.options?.map((item, index) => <button
                                        key={index}
                                        className={`options ${correctAnswer === item && 'bg-success'}`}
                                        onClick={(event) => checkAnswer(event, item)}
                                    >
                                        {item}
                                    </button>)
                                }
                            </div>

                            {
                                (questionIndex + 1) !== quizs.length ?
                                    <button className='quizActionBtn' onClick={nextQuestion} disabled={!selectedAnswer}>Next Question</button>
                                    :
                                    <button className='quizActionBtnFinish' onClick={detailsHandler} disabled={!selectedAnswer}>Go Forward</button>

                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Quiz;