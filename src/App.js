import React from 'react';
import Start from "./Components/Start";
import Quiz from "./Components/Quiz";

function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [difficulty, setDifficulty] = React.useState("easy");
  const [page, setPage] = React.useState("start");

  function handleChange(event){
    if( event.target.name === "category" ){
      setCategoryId(event.target.value);
    }
    else if( event.target.name === "type" ){
      setDifficulty(event.target.value);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if( categoryId === 0 ) return;
    setPage("quiz");
  }

  function handlePlayAgain() {
    setPage("start");
  }

  return (
    <div className="container">
      {
        page === "start" ? <Start handleChange={handleChange} handleSubmit={handleSubmit} categoryId={categoryId} difficulty={difficulty}  />
                         : <Quiz categoryId={categoryId} difficulty={difficulty} handlePlayAgain={handlePlayAgain} />
      } 
    </div>
  );
}

export default App;
