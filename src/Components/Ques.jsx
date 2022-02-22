import React from 'react';

export default function Ques(props){

    function setStyle(choice) {
        if( choice === props.ques.answered ){
            if( props.submitted ){
                return choice === props.ques.correct_answer ? {backgroundColor: "#4dff4d", fontWeight: "bold"} : {backgroundColor: "#ff6666"};
            }  
            return {backgroundColor: "#ffff80"}
        }
        if( props.submitted && choice === props.ques.correct_answer ) return {backgroundColor: "#4dff4d", fontWeight: "bold"}
        return {}
    }

    return (
        <div className="ques">
            <p className="ques--desc">{props.ques.question}</p>
            <div className="ques--choices">
                {
                    props.ques.choices.map(choice => <div style={setStyle(choice)} onClick={(event) => props.handleChoiceClicked(event, props.ques.id)} key={choice}>{choice}</div>)
                }
            </div>
        </div>
    );
}