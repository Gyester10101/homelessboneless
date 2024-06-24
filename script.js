const navButton2 = document.getElementById('nav2-button');
const navBar2 = document.getElementById('nav-bar2');

function toggleNav() {
    if (navBar2.style.display === 'grid') {
        navBar2.style.display = 'none';
        navButton2.style.backgroundImage = 'url(./menu-arrow-down.png)';
    } else {
        navBar2.style.display = 'grid';
        navButton2.style.backgroundImage = 'url(./menu-arrow-up.png)';
    }
}

function checkWindowSize() {
    if (window.innerWidth > 1260) {
        navBar2.style.display = 'none';
        navButton2.style.backgroundImage = 'url(./menu-arrow-down.png)';
    }
}
navButton2.addEventListener("click", toggleNav);
window.addEventListener('resize', checkWindowSize);

checkWindowSize();
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
