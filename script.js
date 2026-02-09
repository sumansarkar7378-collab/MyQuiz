const questionElement = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const scoreElement = document.getElementById('score');
const progressElement = document.getElementById('progress');

let score = 0;
let questionCount = 0;
const MAX_QUESTIONS = 10;
const categoryID = localStorage.getItem('selectedCategory');

async function fetchQuestion() {
    if (questionCount >= MAX_QUESTIONS) {
        showFinalResults();
        return;
    }
    answerButtons.innerHTML = "";
    questionElement.innerText = "Loading..."; 

    const url = `https://opentdb.com/api.php?amount=1&category=${categoryID}&type=multiple`;
    const response = await fetch(url);
    const data = await response.json();
    const result = data.results[0];
    questionElement.innerHTML = result.question; 
    questionCount++;
    progressElement.innerText = `Question number${questionCount}`;
    const choices = [...result.incorrect_answers, result.correct_answer];
    choices.sort(() => Math.random() - 0.5);
    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.innerHTML = choice;
        btn.onclick = () => {
            if (choice === result.correct_answer) {
                score++;
                scoreElement.innerText = score;
                alert("Correct!");
            } else {
                alert("Wrong! The correct answer was: " + result.correct_answer);
            }
            fetchQuestion();
        };
        answerButtons.appendChild(btn);
    });
}

function showFinalResults() {
    questionElement.innerText = "Quiz Over!";
    progressElement.innerText = "Finished";
    answerButtons.innerHTML = `
        <h2>Final Score: ${score} / 10</h2>
        <button onclick="window.location.href='index.html'">Play Again</button>
    `;
}
fetchQuestion();