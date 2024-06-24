const quizBackground = document.getElementById('transparent-background')
const startQuizButton = document.getElementById('take-quiz')
let quizNumber = 1;

startQuizButton.addEventListener("click", startQuiz);

function startQuiz() {
    clearContent(quizBackground);
    quizBackground.innerHTML += `
    <div class="quiz-container"> 
    <h2 class="quiz-number">Q${quizNumber}</h2>`
}
function clearContent(outside) {
    outside.innerHTML = '';
}