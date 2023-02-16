import React from "react";

export default function Answer(props) {
    function handleClick(el, i) {
        if (!props.end)
            props.handleClick(el, i);
    }

    function classes() {
        let classes = "answer";
        if (!props.end) {
            if (props.userAnswer === props.text)
                classes += " selected";
        } else {
            if (props.correct_answer === props.text)
                classes += " correct";
            else if (props.userAnswer === props.text)
                classes += " incorrect";
        }
        return classes;
    }

    let style = {
        cursor: props.end ? "default" : "pointer"
    }

    return (
        <div
            className={classes()}
            style={style}
            onClick={() => handleClick(props.text, props.question_index)}
        >
            { props.decodeEntity(props.text) }
        </div>
    )
}