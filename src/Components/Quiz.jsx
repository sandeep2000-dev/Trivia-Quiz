import React from 'react';
import Ques from "./Ques";
import {nanoid} from "nanoid";

export default function Quiz(props){
    const [quesArray, setQuesArray] = React.useState([]);
    const [submitted, setSubmitted] = React.useState(false);
    const [score, setScore] = React.useState(0);

    React.useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=5&category=${props.categoryId}&difficulty=${props.difficulty}&type=multiple`)
            .then(res => res.json())
            .then(data => setQuesArray(data.results.map(ques => ({question: ques.question, correct_answer: ques.correct_answer, choices: choices(ques), answered: "", id: nanoid()}))));
    }, []);

    function choices(ques) {
        const ind = Math.floor( Math.random()*4 );
        const choices = [...ques.incorrect_answers];
        choices.splice(ind, 0, ques.correct_answer);
        return choices;
    }

    function handleChoiceClicked(event, id){
        if( submitted ) return;
        setQuesArray((prevQuesArray) => prevQuesArray.map(ques => ques.id === id ? {...ques, answered: event.target.innerText} : ques));
    }

    function computeScore() {
        let count = 0;
        quesArray.forEach( ques => ques.correct_answer === ques.answered && count++ );
        return count;
    }

    function handleQuizSubmit() {
        setSubmitted(true);
        setScore(computeScore());
    }

    function playAgain() {
        setSubmitted(false);
        props.handlePlayAgain();
    }

    return (
        <div className="quiz">
            {quesArray.map(ques => <Ques ques={ques} key={ques.id} handleChoiceClicked={handleChoiceClicked} submitted={submitted}/>)}
            {submitted ? 
                <div className="score">
                    <span>You scored {submitted && score} / 5 correct answers</span>
                    <button onClick={playAgain}>Play Again</button>
                </div>
                :
                <button onClick={handleQuizSubmit}>Submit</button>
            }
        </div>
    );
}