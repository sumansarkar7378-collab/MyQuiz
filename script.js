const questionText = document.getElementById('question-text');
const answerBox = document.getElementById('answer-buttons');
const scoreEl = document.getElementById('score');
const progressEl = document.getElementById('progress');

let score = 0;
let count = 0;
const MAX = 10;
const catID = localStorage.getItem('selectedCategory') || 9;

async function getNextQuestion() {
    if (count >= MAX) return showEnd();
    answerBox.innerHTML = "";
    questionText.innerText = "Loading Question...";
    const res = await fetch(`https://opentdb.com/api.php?amount=1&category=${catID}&type=multiple`);
    const { results } = await res.json();
    const q = results[0];
    count++;
    progressEl.innerText = `Question ${count} of ${MAX}`;
    questionText.innerHTML = q.question;
    const choices = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);
    choices.forEach(text => {
        const btn = document.createElement('button');
        btn.innerHTML = text;
        btn.onclick = () => {
            if (text === q.correct_answer) {
                score++;
                scoreEl.innerText = score;
                alert("Correct! ✨");
            } else {
                alert(`Wrong! The answer was: ${q.correct_answer}`);
            }
            getNextQuestion();
        };
        answerBox.appendChild(btn);
    });
}
function showEnd() {
    progressEl.innerText = "Complete!";
    questionText.innerText = "Game Over!";
    answerBox.innerHTML = `
        <h2>Final Score: ${score} / ${MAX}</h2>`;
}
getNextQuestion();
