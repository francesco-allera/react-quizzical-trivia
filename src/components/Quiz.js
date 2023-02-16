import React from "react";
import Question from "./Question";

export default function Quiz() {
    function fetchingData() {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => {
                setData(prev => data.results.map(el => {
                    const { question, correct_answer, incorrect_answers } = el;
                    const answers = [correct_answer, ...incorrect_answers];
                    for (let i = 0; i < answers.length; i++) {
                        const x = Math.floor(Math.random() * answers.length);
                        [answers[i], answers[x]] = [answers[x], answers[i]];
                    }
                    return { question, correct_answer, answers }
                }));
            });
    }
    function handleClick(el, i) {
        setUserAnswers(prev => {
            const arr = [...prev];
            arr[i] = el;
            return arr;
        });
    }
    function submit() {
        if (end) {
            setUserAnswers(prev => []);
            setCount(prev => 0);
            setEnd(prev => false);
            fetchingData();
        } else {
            if (data.length !== userAnswers.filter(el => el).length)
                return;

            data.forEach((el,i) => {
                if (el.correct_answer === userAnswers[i])
                    setCount(prev => prev + 1);
            });
            setEnd(true);
        }
    }

    const [data, setData] = React.useState([]);
    const [userAnswers, setUserAnswers] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const [end, setEnd] = React.useState(false);

    React.useEffect(() => fetchingData(), []);

    const questions = data.map((el,i) => (
        <Question
            key={`question-${i + 1}`}
            {...el}
            question_index={i}
            userAnswer={userAnswers[i]}
            handleClick={handleClick}
            end={end}
        />
    ));

    let countStyle = {
        color: count >= 4 ? "#008000" : (count <= 1 ? "#800000" : "#b0b000")
    };
    let buttonStyle = {
        cursor: data.length === userAnswers.filter(el => el).length ? "pointer" : "not-allowed"
    };

    return (
        <div className="quiz">
            { questions }

            {
                end && <h2 className="result">
                    You scored <span style={countStyle}>{count}/5</span> correct answers
                </h2>
            }

            <button
                style={buttonStyle}
                onClick={() => submit()}
            >
                { end ? "play again" : "check answers" }
            </button>
        </div>
    )
}