import React from "react";
import Quiz from "./components/Quiz";

export default function App() {
    const [start, setStart] = React.useState(false);

    return (
        <main>
            {
                start
                ? <Quiz />
                : <div className="start">
                    <h1>
                        Quizzical
                    </h1>
                    <p>
                        Trivia game with 5 questions on a wide variety of topics
                    </p>
                    <button onClick={() => setStart(true)}>
                        start quiz
                    </button>
                </div>
            }

            <img src="./src/img/blob-1.png" className="blob-1" alt="blob" />
            <img src="./src/img/blob-2.png" className="blob-2" alt="blob" />
        </main>
    )
}