
const navButton2 = document.getElementById('nav2-button');
const navBar2 = document.getElementById('nav-bar2');
const navBar2String = navBar2.innerHTML;
let nav2Open = false;

function toggleNav() {
    if (navBar2.style.display === 'grid') {
        navBar2.style.display = 'none';
        navButton2.style.backgroundImage = 'url(./menu-arrow-down.png)';
        if (window.innerWidth <= 840) {
            navButton2.style.top = "73px";
        } else navButton2.style.top = "113px";
        nav2Open = false;
    } else {
        navBar2.style.display = 'grid';
        navButton2.style.backgroundImage = 'url(./menu-arrow-up.png)';
        if (window.innerWidth <= 840) {
            navButton2.style.top = "136px";
        } else navButton2.style.top = "216px";
        nav2Open = true;
    }
}

function checkWindowSize() {
    if (window.innerWidth > 1260) {
        navBar2.style.display = 'none';
        navButton2.style.backgroundImage = 'url(./menu-arrow-down.png)';
        navButton2.style.top = "113px";
        nav2Open = false;
    }
    if (window.innerWidth <= 840) {
        if (nav2Open) {
            navButton2.style.top ="136px"
        } else navButton2.style.top = "73px";
    } else {
        if (nav2Open) {
            navButton2.style.top ="216px"
        } else navButton2.style.top = "113px"
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
//


// jobs.html scripts


//

//quiz scripts


//
const backgroundContainer = document.getElementById('transparent-background');
const quizSubmitContainer = document.querySelector('.quiz-submit-container')
let quizNumber = 1;
const startQuizButton = document.getElementById('take-quiz');
startQuizButton.addEventListener("click", startQuiz);
const quizQuestions = [
    {
        question: "Do you have any current restrictions due to parole or probation?",
        options: ["Yes","No"],
        // numbers for easy access to types index
        indexes: [[0], [0]],
        effect: [[500], [0]]
    },
    {
        question: "Do you have any pending charges or legal matters?",
        options: ["Yes", "No"],
        indexes: [[0],[0]],
        effect: [[500],[0]]
    },
    {
        question: "Out of these services, which are you most interested in?",
        options: ["Customer service", "Construction and trades", "Healthcare", "Retail","Manufacturing","Transportation and delivery","Technology"],
        indexes: [[1,4], [2], [3], [4,1], [5,13], [6], [7,12]],
        effect: [[100,40],[100],[100],[100,40],[100,40],[100],[100,30]]
    },
    {
        question: "Are you interested in part-time or full-time work?",
        options: ["Part-time","Full-time","Either"],
        indexes: [[8], [8], [8]],
        effect: [[100],[0],[50]]
    },
    {
        question: "Do you prefer to work indoors or outdoors?",
        options: ["Indoors", "Outdoors", "No Preference"],
        indexes: [[9], [9], [9]],
        effect:[[100],[0],[50]]
    },
    {
        question: "What are your primary skills or areas of expertise?",
        options: ["Customer service","Manual labor","Administrative tasks","Technical skills (e.g., IT, machinery)",
            "Cooking and food service", "Sales"],
        indexes:[[1,4],[13,5],[7,1],[7,5],[14],[1,4,2]],
        effect:[[50,20],[50,20],[25,40],[50,10],[50],[40,25,30]]
    },
    {
        question: "Do you have any vocational training or certifications",
        options: ["Yes","No"],
        indexes: [[10],[10]],
        effect:[[70],[0]]
    },
    {
        question: "Are you interested in pursuing further education or vocational training?",
        options: ["Yes", "No","Maybe"],
        indexes: [[10,11],[10,11],[10,11]],
        effect:[[15,15],[0,0],[8.8,8.8]]
    },
    {
        question: "What is your highest level of education?",
        options: ["No High School Diploma", "High School Diploma or GED","Some college","Associate's Degree","Bachelor's Degree"],
        indexes: [[11,10],[11,10],[11,10],[11,10],[11,10]],
        effect:[[0,0],[30,7],[45,10],[67,12],[80,35]]
    },
    {
        question: "Are you willing to work shifts or irregular hours?",
        options: ["Yes","No"],
        indexes: [[8],[8]],
        effect:[[0],[30]]
    },
    {
        question: "Are you able to perform physically demanding work",
        options: ["Yes", "No", "Limited ability"],
        indexes: [[13,5],[13,5],[13,5]],
        effect:[[0,0],[-70,-50],[-40,-40]]
    },
    {
        question: "Do you have reliable transportation to get to work?",
        options: ["Yes", "No", "Only public transportation"],
        indexes: [[8],[8],[8]],
        effect: [[0],[60],[20]]
    },
    {
        question: "Do you prefer working indepndently or as part of a team?",
        options: ["Independently","As part of a team", "Either"],
        indexes:[[12,7,6],[12,14,2],[4]],
        effect:[[70,20,20],[0,25,25],[40]]
    },
    {
        question: "Do you have any preferences for the size of the company you work for?",
        options: ["Small business", "Medium-sized company","Large corporation","No preference"],
        indexes:[[15],[15],[15],[15]],
        effect:[[0],[50],[100],[50]]
    },
    {
        question: "What challenges have you faced in finding employment? (Select all that apply)",
        options: ["Lack of experience", "Criminal Record", "Lack of skills or training", "Transportation issues", "Health problems"],
        indexes:[[10],[0],[10],[6],[13]],
        effect:[[-20],[50],[-20],[20],[-100]]
    }
];
const scores = [
    {
        name: "legalSeverity",
        points: 0
    },
    {
        name: "customerService",
        points: 0
    },
    {
        name: "constructionTrades",
        points: 0
    },
    {
        name: "healthcare",
        points: 0
    },
    {
        name: "retail",
        points: 0
    },
    {
        name: "manufacturing",
        points: 0
    },
    {
        name: "transportationDelivery",
        points: 0
    },
    {
        name: "technology",
        points: 0
    },
    {
        name: "flexibleNeeds",
        points: 0
    },
    {
        name: "indoorPref",
        points: 0
    },
    {
        name: "expertise",
        points: 0
    },
    {
        name: "education",
        points: 0
    },
    {
        name: "independence",
        points: 0
    },
    {
        name: "manualLabor",
        points: 0
    },
    {
        name: "food",
        points: 0
    },
    {
        name: "largeCompany",
        points: 0
    }
]
function startQuiz() {
    quizSubmitContainer.innerHTML = `
    <div class="quiz-container"> 
    <h2 class="quiz-number">Q${quizNumber}.</h2>
    <h3 class="question">${quizQuestions[quizNumber-1].question}</h3>
    <div class="answers-container">
        ${displayAnswers()}
    </div>
    </div>
    <div class="question-buttons">
    ${createNextButton()}
    </div>
    `
    setupQuizFunctions();
}
function setupQuizFunctions() {
    const nextButton = document.getElementById('next');
    nextButton.addEventListener("click", goNext);
}
function goNext() {
    if (document.querySelector('input[name="answers"]:checked') !== null) {
        useSelectedAnswer();
        quizNumber++;
        if (quizNumber > quizQuestions.length) {
            console.log('quiz finished');
            console.log(convertScoresToJSON());
            createlocationMenu();
        } else startQuiz();
    } else alert('missing an answer')
}
// uses the selected value and edits the points correlated to its type
// ex: can you do manual labor? answer="yes" which is index 0 of the answers attribute
// you take index 0 of the questions type attribute, which links to the correct index of
// the typesPoints array, which contains all the points. which is also correlated to the
// types[] sorry veyr confusing know cleaner way but already used too muc time
function useSelectedAnswer() {
    const answer = document.querySelector('input[name="answers"]:checked').value
    console.log(answer);
    let optionIndex = -1;
    for(let i = 0; i < quizQuestions[quizNumber-1].options.length; i++) {
        console.log(quizQuestions[quizNumber-1].options[i])
        if (quizQuestions[quizNumber-1].options[i] == answer) {
            optionIndex = i;
        }
    }
    console.log(optionIndex);
    editScore(optionIndex);
}
function editScore(optionIndex) {
    /*option: "Customer service",
     indexes: [1,4],                      indexes[optionIndex] theoretically equals this (array in array in object skull emoji)
     effect: [100, 40]
    scores[1].name = customer service
     scores[1].points = 0
     scores[1].points + effect[1] = 100
     */
    const correlatingIndexes = quizQuestions[quizNumber-1].indexes[optionIndex];
    for(let i = 0; i < correlatingIndexes.length; i++) {
        const correctIndex = correlatingIndexes[i];
        console.log(`${scores[correctIndex].name}: ${scores[correctIndex].points}`);
        const add = quizQuestions[quizNumber-1].effect[optionIndex][i];
        scores[correctIndex].points += add;
        console.log(`${scores[correctIndex].name}: ${scores[correctIndex].points}`);
    }
}
function goBack() {
    deleteLatestQuizAnswer();
    quizNumber--;
    startQuiz();
}
function createNextButton() {
    return `<button id="next" class="quiz-button" type="button">Next</button>`;
}
function createSubmitButton() {
    if (quizNumber === quizQuestions.length) {
        return `<button id="submit" class="quiz-button" type="button">Submit</button>`;
    } else return "";
}
function displayAnswers() {
    let answerList ="";
    for(let i = 0; i < quizQuestions[quizNumber-1].options.length; i++) {
        const answer = quizQuestions[quizNumber-1].options[i];
        answerList += `<label class="answer-label" for="${answer}"><input class="answer" name="answers" type="radio" value="${answer}" required/>${answer}</label>`
    }
    return answerList;
}
function convertScoresToJSON() {
    return (`{ "scores" :
{
${loopThroughScores()}
}
}`);
}
function loopThroughScores() {
    let str = "";
    str += `"${scores[0].name}" : ${scores[0].points},`
    for(i = 1; i < scores.length-1; i++) {
        str += `\n"${scores[i].name}" : ${scores[i].points},`
    }
    str += `\n"${scores[scores.length-1].name}" : ${scores[scores.length-1].points}`
    console.log(str);
    return(str);
}
//
//ask for location scripts

//
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
    locationButton.addEventListener('click', clickedLocationButton);
    distance.addEventListener("input", () => {
        document.getElementById('distance-value').textContent = distance.value ;
    });
}
function clickedLocationButton() { 
    const distance = document.getElementById('distance');
    // if any of the elements are empty, then it shouldn't look for the coords
    if (!document.getElementById('city').value || !document.getElementById('address').value || !document.getElementById('zipcode').value ) {
        alert("Please fill out all information.")
    } else {
        pullCoords(distance.value);
    }
}
function loadingScreen() {
    backgroundContainer.innerHTML = `
    <div id="jobs-background">
        <p id="loading">please wait. is loading.</p>
    </div>`
    console.log("we in the loading screen boys")
}
async function pullCoords(distance) {
    const address = getFullAddress();
    await addressToCoords(address)
    .then(response => response.json())
    .then(data => {
        if (data) {
            console.log(`long: ${data.lat}`);
            console.log(`lat ${data.lng}`);
            loadingScreen();
            pullEntriesPage(distance, data.lat, data.lng);
        } else {
            console.log('No coords were found for the address', address);
        }
    })
}
function getFullAddress() {
    const stateVal = document.getElementById('state').value || '';
    const cityVal = document.getElementById('city').value || '';
    const addrVal = document.getElementById('address').value || '';
    const zipVal = document.getElementById('zipcode').value || '';
    return `${addrVal}, ${cityVal}, ${stateVal}, ${zipVal}`
}
async function addressToCoords(address) {
    try {
    const longLat = await fetch(`/addressToCoords?address=${address}`)
    return longLat;
    }
    catch(error) {
        console.error('turning address to coords did not go right' + error);
    }
}   
async function coordsToAddress(coords) {
    try {
        const response = await fetch(`/coordsToAddress?coords=${coords}`)
        const data = await response.json();
        const locationInfo = data.results[0].formatted;
        return locationInfo;
    }
    catch (error) {
        console.error('Error fetching address:', error);
    }
}
//


// job entries script


//
let allEntries = [];
let entriesHTML = "";
let jobLocations;
let allElements;
let entryContainer;
let selectedInfo;
async function pullEntriesPage(distance, lat, lng) {
    await fetch(`/giveLocations?distance=${distance}&lat=${lat}&lng=${lng}&userScore=${btoa(convertScoresToJSON())}`)
        .then(response => response.json())
        .then(data => replaceLocationPage(data))
        .catch(error => {
            console.error('Error fetching locations', error);
        });
}


async function replaceLocationPage(data) {
    const strongMatches = data.strong;
    const weakMatches = data.weak;
    await fillAllEntries(strongMatches, weakMatches);
    updateEntriesHTML();
    // the backgorund
    const entriesBackground = document.getElementById('jobs-background');
    entriesBackground.innerHTML = `
    <div id="jobs-header">
    <h2 id="jobs-text">Job Entries</h2>
    </div>
    <div id="jobs-container"> 
    <div id="selected-entry">
        <div id="logo-container">
        </div>
        <div id="selected-info">
        </div>
    </div>
    <div id="entries-container">
    ${entriesHTML} 
    </div>
    </div>
    `;
    logoContainer = document.getElementById('logo-container');
    selectedInfo = document.getElementById('selected-info');
    entryContainer = document.getElementById('entries-container');
    createSelectedFunction();
}
function createSelectedFunction() {
    entryContainer.addEventListener('click', function(event) {
    const entryElement = event.target.closest('.entry');
    if (entryElement) {
        const entries = Array.from(entryContainer.getElementsByClassName('entry'));
        const index = entries.indexOf(entryElement);
        selectedInfo.innerHTML = `${takeEntryInfo(index)}`
    }
    })
}
function takeEntryInfo(index) {
    const entryInList = allEntries[index];
    logoContainer.innerHTML = `
        <img src="${getLogoURL(allEntries[index].company)}" alt="company logo"/>
    `;
    return `
    <div id="selected-text-container">
    ${checkIfExistsThenText(entryInList, 'company')}
    ${checkIfExistsThenText(entryInList, 'amenity')}
    ${checkIfExistsThenText(entryInList, 'cuisine')}
    ${checkIfExistsThenText(entryInList, 'hour')}
    ${checkIfExistsThenText(entryInList, 'address')}
    ${checkIfExistsThenText(entryInList, 'phone')}
    ${checkIfExistsThenText(entryInList, 'website')}
    </div>
    `
}
async function getLogoURL(brandName) {
    console.log("so we got the" + brandName);
    await fetch(`/getLogo?brandName=${brandName}`)
    .then (response => response.json())
    .then(data => {
        const logoUrl = data.logoUrl;
        return logoUrl
    })
    .catch(error => {
        console.error("did not take logoURL properly", error);
    })
}
function checkIfExistsThenText(entryInList, _tagName) {
    if (entryInList[_tagName]) {
        if (_tagName === 'website') {
            return `<p class="selected-text"><span class="bold">${_tagName[0].toUpperCase() + _tagName.slice(1)}</span>: <a href="${entryInList[_tagName]}">${entryInList[_tagName]}</a></p>`
        } else return `<p class="selected-text"><span class="bold">${_tagName[0].toUpperCase() + _tagName.slice(1)}</span>: ${entryInList[_tagName]}</p>`;
    } else return "";
}
function updateEntriesHTML() {
    for(let i = 0; i < allEntries.length; i++) {
        entriesHTML += `<div class="entry"> ${displayEntryData(i)}</div>`
    }
}
function displayEntryData(indexOfEntry) {
    return `
    ${displayRightEntries(indexOfEntry)}
    ${displayLeftEntries(indexOfEntry)}
    `
}
function displayRightEntries(indexOfEntry) {
    let rightEntries = `<div class="entry-right">`;
    rightEntries += `<p class="entry-right-text" id="entry-address"><span class="bold">Address</span>: ${allEntries[indexOfEntry].address}</p>`;
    if (allEntries[indexOfEntry].phone) {
        rightEntries += `<p class="entry-right-text" id="entry-phone"><span class="bold">Phone</span>: ${allEntries[indexOfEntry].phone}</p>`;
    }
    return rightEntries += "</div>";
}
function displayLeftEntries(indexOfEntry) {
    let leftEntries = `<div class="entry-left">`;
    if (allEntries[indexOfEntry].company) {
        leftEntries += `<p class="entry-left-text" id="entry-company"><span class="bold big-entry-text">Company</span>: ${allEntries[indexOfEntry].company}</p>`;
    }
    if (allEntries[indexOfEntry].amenity) {
        leftEntries += `<p class="entry-right-text" id="entry-amenity"><span class="bold">Amenity</span>: ${allEntries[indexOfEntry].amenity}</p>`;
    }
    if (allEntries[indexOfEntry].hours) {
        leftEntries += `<p class="entry-right-text" id="entry-hours"><span class="bold">Hours</span>: ${allEntries[indexOfEntry].hours}</p>`;
    }
    return leftEntries += "</div>";
}

async function fillAllEntries(strongMatches, weakMatches) {
    for(let i = 0; i < strongMatches.elements.length; i++) {
    console.log(i);
    let entry = {
        company: "",
        address: "",
        amenity: "",
        hours: "",
        phone: "",
        website: "",
        cuisine: ""
    };
    // set properties of the entry with that of i-indexes properties
    await setEntryProperties(strongMatches.elements[i], entry, i);
    allEntries.push(entry);
    } 
    for(let i = 0; i < weakMatches.elements.length; i++) {
        let entry = {
            company: "",
            address: "",
            amenity: "",
            hours: "",
            phone: "",
            website: "",
            cuisine: ""
        };
        await setEntryProperties(weakMatches.elements[i], entry, i);
        allEntries.push(entry);
    }
}
async function setEntryProperties(element, entry, counter) {
    console.log("this is the counter" + counter);
    entry.company = element.tags['brand'];
    entry.amenity = element.tags['amenity'];
    entry.hours = element.tags['opening_hours'];
    entry.phone = element.tags['phone'];
    entry.cuisine = element.tags['cuisine'];
    entry.website = element.tags['website'];
    await setEntryAddress(element, entry, counter);
}
async function setEntryAddress(element, entry, counter) {
    const city = returnIfExists(element, 'addr:city', counter);
    const housenumber = returnIfExists(element, 'addr:housenumber', counter);
    const postcode = returnIfExists(element, 'addr:postcode', counter);
    const state = returnIfExists(element, 'addr:state', counter);
    const street = returnIfExists(element, 'addr:street', counter);
    if (!street) {
        const addressVal = await stringFromCoords(element, counter);
        entry.address = addressVal;
    } else {
    const addressString = `${housenumber} ${street}, ${city}, ${state}, ${postcode}`
    entry.address = addressString;
    }
}
async function stringFromCoords(element, counter) {
    let lat = element.lat;
    let lon = element.lon;
    if (!lat) {
        lat = element.geometry[0].lat;
        lon = element.geometry[0].lon;
    }
    const coords = `${lat} ${lon}`;
    const address = await coordsToAddress(coords)
    return address.substring(0, address.length-26);
}

function returnIfExists(element, tagName, counter) {
    const val = element.tags[tagName];
    if (val) {
        return val
    } else return "";
}







/* (async () => {
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
  })()) 
} */
