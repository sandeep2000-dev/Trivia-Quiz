import React from 'react';

export default function Start(props) {
    const [categoryList, setCategoryList] = React.useState([]);

    React.useEffect(() => {
        fetch("https://opentdb.com/api_category.php")
            .then(res => res.json())
            .then(data => setCategoryList(data.trivia_categories));
    }, []);

    return (
        <div>
            <h1 className="title">Trivia Quiz</h1>
            <form onSubmit={(event) => props.handleSubmit(event)} className="form">
                <label htmlFor="category">
                    Category
                </label>
                <select
                    id="category"
                    name="category"
                    value={props.category}
                    onChange={(event) => props.handleChange(event)}
                >
                    <option value={0}>Choose Category</option>
                    {categoryList.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>

                <label htmlFor="difficult">
                    Difficulty
                </label>
                <select
                    id="difficult"
                    name="difficulty"
                    value={props.difficulty}
                    onChange={(event) => props.handleChange(event)}
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <button>Start Quiz</button>
            </form>
        </div>
    );
}