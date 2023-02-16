import React from "react";
import Answer from "./Answer";

export default function Question(props) {
    function decodeEntity(str) {
        let text = document.createElement("textarea");
        text.innerHTML = str;
        return text.value;
    }

    const [answers, setAnswers] = React.useState([]);

    React.useEffect(() => {
        setAnswers(prev => props.answers.map((el,i) => (
            <Answer
                key={`answer-${props.question_index + 1}-${i + 1}`}
                text={el}
                question_index={props.question_index}
                userAnswer={props.userAnswer}
                handleClick={props.handleClick}
                end={props.end}
                correct_answer={props.correct_answer}
                decodeEntity={decodeEntity}
            />
        )));
    }, [props.userAnswer, props.end, props.question]);

    return (
        <div className="question">
            <h3 className="text">
                { decodeEntity(props.question) }
            </h3>

            <div className="answers">
                { answers }
            </div>
        </div>
    )
}