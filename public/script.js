const navButton2 = document.getElementById('nav2-button');
const navBar2 = document.getElementById('nav-bar2');
const navBar2String = navBar2.innerHTML;

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
    if (window.innerWidth <= 550) {
        navBar2.innerHTML = ""
        navBar2.innerHTML += `
        <h2 class="nav-bar-text2"><a class="nav-option" href="./jobs.html">Jobs</a></h2>
        <h2 class="nav-bar-text2"><a class="nav-option" href="https://fhs.fuhsd.org/">Cheap Housing</a></h2>
        <h2 class="nav-bar-text2"><a class="nav-option" href="https://fhs.fuhsd.org/">Training</a></h2>
        <h2 class="nav-bar-text2"><a class="nav-option" href="https://fhs.fuhsd.org/">Support</a></h2>
        `
    } else navBar2.innerHTML = navBar2String;
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
