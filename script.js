const navButton2 = document.getElementById('nav2-button');
const navBar2 = document.getElementById('nav-bar2');
const navBar2String = navBar2.innerHTML;

function toggleNav() {
    if (navBar2.style.display === 'grid') {
        navBar2.style.display = 'none';
        navButton2.style.backgroundImage = 'url(./menu-arrow-down.png)';
        navButton2.style.top = "113px";
    } else {
        navBar2.style.display = 'grid';
        navButton2.style.backgroundImage = 'url(./menu-arrow-up.png)';
        navButton2.style.top = "216px";
    }
}

function checkWindowSize() {
    if (window.innerWidth > 1260) {
        navBar2.style.display = 'none';
        navButton2.style.backgroundImage = 'url(./menu-arrow-down.png)';
        navButton2.style.top = "113px";
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

// jobs.html functions
const quizSubmitContainer = document.querySelector('.quiz-submit-container')
let quizNumber = 1;
const startQuizButton = document.getElementById('take-quiz')
startQuizButton.addEventListener("click", startQuiz); 
const quizQuestions = [
    {
        question: "How severe is your criminal record?",
        options: ["Severe","Weak"]
    },
    {
        question: "Do you have any restrictions by parole or probation?",
        options: ["Yes", "No"]
    },
    {
        question: "What is your education level?",
        options: ["Associate's or Higher", "High School Diploma/GED", "No High School Diploma/GED"]
    },
    {
        question: "What skills do you have?",
        options: ["TechnicaL Skills (IT, Machinery)", "Sales & Customer Service", "Neither"]
    },
    {
        question: "What is your commitment level?",
        options: ["Full-Time", "Part-Time"]
    },
    {
        question: "High or low manual labor?",
        options: ["High", "Low"]
    },
    {
        question: "Would you like to work indoor or outdoors",
        options: ["Indoors", "Outdoors"]
    },
    {
        question: "Do you prefer to work independently or collaboratively?",
        options: ["Independent", "Collaboratively"]
    }
];

//
const quizAnswers = [];
//
function startQuiz() {
    quizSubmitContainer.innerHTML = `
    <div class="quiz-container"> 
    <h2 class="quiz-number">Q${quizNumber}.</h2>
    <h3 class="question">${quizQuestions[quizNumber-1].question}</h3>
    <div class="answers-container">
        ${outputAnswers()}
    </div>
    </div>
    <div class="question-buttons">
    ${createBackButton()}
    ${createNextButton()}
    </div>
    `
    setupQuizFunctions();
}
function setupQuizFunctions() {
    const nextButton = document.getElementById('next');
    nextButton.addEventListener("click", goNext);

    if (quizNumber >= 2) {
        const backButton = document.getElementById('back');
        backButton.addEventListener("click", goBack);
    }
}
function goNext() {
    if (document.querySelector('input[name="answers"]:checked') !== null) {
    storeRadioData();
    quizNumber++;
    if (quizNumber > quizQuestions.length) {
        console.log(quizAnswers);
        createlocationMenu();
    } else startQuiz();
    } else alert('missing an answer')
}
function storeRadioData() {
    console.log(document.querySelector('input[name="answers"]:checked').value);
    quizAnswers.push(document.querySelector('input[name="answers"]:checked').value);
}
function deleteLatestQuizAnswer() {
    console.log(quizAnswers.pop());
}
function goBack() {
    deleteLatestQuizAnswer();
    quizNumber--;
    startQuiz();
}
function createBackButton() {
    if (quizNumber >=  2) {
        return `<button id="back" class="quiz-button" type ="button">Back</button>`;
    } else return "";
}
function createNextButton() {
    return `<button id="next" class="quiz-button" type="button">Next</button>`;
}
function createSubmitButton() {
    if (quizNumber === quizQuestions.length) {
        return `<button id="submit" class="quiz-button" type="button">Submit</button>`;
    } else return "";
}
function outputAnswers() {
    let answerList ="";
    for(let i = 0; i < quizQuestions[quizNumber-1].options.length; i++) {
        const answer = quizQuestions[quizNumber-1].options[i];
        answerList += `<label class="answer-label" for="${answer}"><input class="answer" name="answers" type="radio" value="${answer}" required/>${answer}</label>`
    }
    return answerList;
}
function createlocationMenu() {
    quizSubmitContainer.innerHTML = "";
    quizSubmitContainer.innerHTML += `
    <div class="quiz-container flex-column">
        <div id="address-header">
            <h2 id="address-title">Address?</h2>
        </div>
        <form id="location-container">
            <label class="location-label" for="state">State: 
            <select id="state" class="location-input">
	        <option value="AL">Alabama</option>
	        <option value="AK">Alaska</option>
	        <option value="AZ">Arizona</option>
	        <option value="AR">Arkansas</option>
	        <option value="CA">California</option>
	        <option value="CO">Colorado</option>
	        <option value="CT">Connecticut</option>
	        <option value="DE">Delaware</option>
	        <option value="DC">District Of Columbia</option>
	        <option value="FL">Florida</option>
	        <option value="GA">Georgia</option>
	        <option value="HI">Hawaii</option>
	        <option value="ID">Idaho</option>
	        <option value="IL">Illinois</option>
	        <option value="IN">Indiana</option>
	        <option value="IA">Iowa</option>
	        <option value="KS">Kansas</option>
	        <option value="KY">Kentucky</option>
	        <option value="LA">Louisiana</option>
	        <option value="ME">Maine</option>
	        <option value="MD">Maryland</option>
	        <option value="MA">Massachusetts</option>
	        <option value="MI">Michigan</option>
	        <option value="MN">Minnesota</option>
	        <option value="MS">Mississippi</option>
	        <option value="MO">Missouri</option>
	        <option value="MT">Montana</option>
	        <option value="NE">Nebraska</option>
	        <option value="NV">Nevada</option>
	        <option value="NH">New Hampshire</option>
	        <option value="NJ">New Jersey</option>
	        <option value="NM">New Mexico</option>
	        <option value="NY">New York</option>
	        <option value="NC">North Carolina</option>
	        <option value="ND">North Dakota</option>
	        <option value="OH">Ohio</option>
	        <option value="OK">Oklahoma</option>
	        <option value="OR">Oregon</option>
	        <option value="PA">Pennsylvania</option>
	        <option value="RI">Rhode Island</option>
	        <option value="SC">South Carolina</option>
	        <option value="SD">South Dakota</option>
	        <option value="TN">Tennessee</option>
	        <option value="TX">Texas</option>
	        <option value="UT">Utah</option>
	        <option value="VT">Vermont</option>
	        <option value="VA">Virginia</option>
	        <option value="WA">Washington</option>
	        <option value="WV">West Virginia</option>
	        <option value="WI">Wisconsin</option>
	        <option value="WY">Wyoming</option>
        </select>
        </label>
        <label class="location-label" for="city"> City: <input class="location-input" id="city" type="text" autocomplete="on" required/></label>
        <label class="location-label" for="address"> Address: <input class="location-input" id="address"  type="text" autocomplete="on" required/></label>
        <label class="location-label" for="zipcode"> Zip: <input class="location-input" id="zipcode"  type="text" autocomplete="on" required/></label>
        <label class="location-label" for="distance"> 
        Max Distance (<span id="distance-value">5.5</span> miles): 
        <input class="location-input" id="distance" type="range" min="1" max="10" 
        step="0.1"/></label>
        </form>
    </div>
    <div class="question-buttons">
        <button class="quiz-button" id="location-button">Submit</button>
    </div>
    `;
    //sets up those variables AFTER THIS LOCATION MENU RUNS
    setupLocationFunctions();
}
function setupLocationFunctions() {
    const locationButton = document.getElementById('location-button');
    const distance = document.getElementById('distance');
    locationButton.addEventListener('click', findCoords);
    distance.addEventListener("input", () => {
        document.getElementById('distance-value').textContent = distance.value ;
    });
}
function findCoords() {
    // if any of the elements are empty, then it shouldn't look for the coords
    if (!document.getElementById('city').value || !document.getElementById('address').value || !document.getElementById('zipcode').value ) {
        alert("Please fill out all information.")
    } else {
    // THESE ARE COORDS OF WHATEVER ADDRESS THEY TYPE. WHAT IS THE NEXT STEP ?!?!?!?
    addressToCoords(getFullAddress());
    }
}
function getFullAddress() {
    const stateVal = document.getElementById('state').value || '';
    const cityVal = document.getElementById('city').value || '';
    const addrVal = document.getElementById('address').value || '';
    const zipVal = document.getElementById('zipcode').value || '';
    return `${addrVal}, ${cityVal}, ${stateVal}, ${zipVal}`
}
async function addressToCoords(address) {
    const apiKey = '6ee983379d584d39b26638affc74f3b3';
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // extract latitude and longitude
        if (data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry;
            console.log(`${lat}, ${lng}`)
            return { lat, lng }; 
        } else {
            throw new Error('No results found');
        }
    } catch (error) {
        console.error('Error geocoding:', error);
        return null;
    }
}   
(async () => {
    const api = await fetch('https://www.overpass-api.de/api/interpreter?', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:"[out:json];node(48.865,2.25,48.9,2.27)[amenity=restaurant];out;"
    });
    const answer = await api.json();
    console.log(answer);
  })()
