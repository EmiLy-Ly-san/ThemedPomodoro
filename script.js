//*****THEMES//
let alarmAudio = new Audio("alarms/Voicy_Star-Wars-Main-Theme-(Full).mp3");
let themeButtons = document.querySelectorAll("button[data-themeColors]");
let themeUserChoice;

class Theme {
  constructor(themeConfig) {
    this.id = themeConfig.id;
    this.ringSound = themeConfig.ringSound;
    this.ringPicture = themeConfig.ringPicture;
  }
}

const starWarsConfig = {
  id: "starwars",
  ringSound: "alarms/Voicy_Star-Wars-Main-Theme-(Full).mp3",
  ringPicture: "images/icons8-soldat-d-assaut.svg",
};

const strangerThingsConfig = {
  id: "strangerthings",
  ringSound: "alarms/Voicy_stranger-things-beat.mp3",
  ringPicture: "images/icons8-maxine-mayfield.svg",
};

const animalCrossingConfig = {
  id: "animalcrossing",
  ringSound: "alarms/Voicy_Animal-Crossing-New-Horizons-Theme-music.mp3",
  ringPicture: "images/Bluebear_NH_Villager_Icon.png",
};

const themeCollection = {
  starWars: new Theme(starWarsConfig),
  strangerThings: new Theme(strangerThingsConfig),
  animalCrossing: new Theme(animalCrossingConfig),
};

function setTheme() {
  //GENERALS COLORS
  [...themeButtons].forEach(function (themeButton) {
    themeButton.addEventListener("click", () => {
      themeUserChoice = themeCollection[themeButton.id];
      console.log(themeUserChoice);
      window.localStorage.setItem("themeUserPreference", themeButton.id); //save preferences
      const currentButtonThemeColors =
        themeButton.getAttribute("data-themeColors");
      const newBodyThemeClassName = `themeColors-${currentButtonThemeColors}`;
      document.body.classList = ""; //NEED TO LEARN REGEXP TO FIX IT BETTER LATER
      document.body.classList.add(newBodyThemeClassName);
      //ALARM SETTING
      stopAlarm(); //If user change theme during alarm song and so when timer out
      alarmAudio = new Audio(`${themeUserChoice.ringSound}`);
      document
        .querySelector(".iconAlarm")
        .setAttribute("src", `${themeUserChoice.ringPicture}`);
    });
  });
}

//*****ANIMATION CIRCLES */
const circlesStroke = document.querySelectorAll(".circleStroke");

//*****WORKSESSION AND NEW BREAK */
let breakSessionButton = document.querySelector(".breakSession");
let WorkSessionButton = document.querySelector(".workSession");

//WORKSESSIONBUTTON*/
function WorkSessionButtonAvailable() {
  WorkSessionButton.addEventListener("click", function () {
    timeCalled = 25 * 60 * 1000;
    setSession();
    WorkSessionButton.setAttribute("disabled", true);
    WorkSessionButton.classList.remove("hidden");
    breakSessionButton.removeAttribute("disabled");
  });
}

//BREAKSESSIONBUTTON*/
function breakSessionButtonAvailable() {
  breakSessionButton.addEventListener("click", function () {
    timeCalled = 4 * 60 * 1000;
    setSession();
    breakSessionButton.setAttribute("disabled", true);
    breakSessionButton.classList.remove("hidden");
    WorkSessionButton.removeAttribute("disabled");
  });
}

/*****TIMER*/
//TIMER GENERAL FUNCTION*/
let circles = document.querySelector(".circles");
let timerView = document.querySelector(".timerView");
let sessionTime;
let timeCalled;
let minutes = 25;
let secondes = "00";
let interval;

function setSession() {
  sessionTime = timeCalled;
  transformTimeAsADate(sessionTime);
  setTimeInTimerView(minutes, secondes);
  circles.classList.add("pom-stop");
  circles.classList.remove("pom-pause");
  circles.classList.remove("pom-play");
  buttonsBarVisible();
  playButtonAvailable();
  pauseButtonAvailable();
  stopButtonAvailable();
}

function transformTimeAsADate(sessionTime) {
  timeAsADate = new Date(sessionTime);
  minutes = timeAsADate.getMinutes();
  secondes = timeAsADate.getSeconds();
}

function setTimeInTimerView(minutes, secondes) {
  timerView.textContent = `${minutes} mn : ${
    secondes == 0 ? "00" : secondes
  } s`;
}

function countDown() {
  sessionTime = sessionTime - 1000;
  transformTimeAsADate(sessionTime);
  minutes = timeAsADate.getMinutes();
  secondes = timeAsADate.getSeconds();
  timerView.textContent = `${minutes} mn : ${secondes} s`;
  if (sessionTime < 0) {
    clearInterval(interval);
    buttonsBarHidden();
    timerView.textContent = `Time out`;
    WorkSessionButton.classList.add("hidden");
    breakSessionButton.classList.add("hidden");
    ringAlarm();
    animateIconAlarm();
    stopAlarmButtonVisible();
  }
}

//BUTTONSBAR PLAY PAUSE STOP TIMER*/
let buttonsBar = document.querySelector(".buttonsBar");
let playButton = document.querySelector(".buttonPlay");
let stopButton = document.querySelector(".buttonStop");
let pauseButton = document.querySelector(".buttonPause");

function buttonsBarHidden() {
  buttonsBar.classList.add("hidden");
}
function buttonsBarVisible() {
  buttonsBar.classList.remove("hidden");
}

//PLAYBUTTON*/
function playButtonAvailable() {
  playButton.removeAttribute("disabled");
}
function playButtonDisabled() {
  playButton.setAttribute("disabled", "true");
}

//PAUSEBUTTON*/
function pauseButtonAvailable() {
  pauseButton.removeAttribute("disabled");
}
function pauseButtonDisabled() {
  pauseButton.setAttribute("disabled", "true");
}

//STOPBUTTON*/
function stopButtonAvailable() {
  stopButton.removeAttribute("disabled");
}
function stopButtonDisabled() {
  stopButton.setAttribute("disabled", "true");
}

//RUN PLAY PAUSE OR STOP*/
function play() {
  console.log(timeCalled);
  circles.classList.remove("pom-stop");
  circles.classList.remove("pom-pause");
  circles.classList.add("pom-play");
  clearInterval(interval);
  interval = setInterval(countDown, 1000);
  playButtonDisabled();
  pauseButtonAvailable();
  stopButtonAvailable();
  [...circlesStroke].forEach(function (circleStroke) {
    circleStroke.style.animationDuration = `${timeCalled}ms`;
  });
}
function pause() {
  circles.classList.remove("pom-stop");
  circles.classList.remove("pom-play");
  circles.classList.add("pom-pause");
  clearInterval(interval);
  playButtonAvailable(); //PLAY PAUSE STOP BUTTONS can't take statements because of set/removeAttribute only possible in js
  pauseButtonDisabled();
  stopButtonAvailable();
}
function stop() {
  circles.classList.remove("pom-play");
  circles.classList.remove("pom-pause");
  circles.classList.add("pom-stop");
  clearInterval(interval);
  sessionTime = timeCalled;
  transformTimeAsADate(sessionTime);
  setTimeInTimerView(minutes, secondes);
  stopButtonDisabled();
  pauseButtonDisabled();
  playButtonAvailable();
}

/*****ALARM */
//ANIMATION ICON ALARM */
const iconAlarm = document.querySelector(".iconAlarm");
const containerAlarm = document.querySelector(".containerAlarm");

function animateIconAlarm() {
  iconAlarm.classList.add("animationRotation");
  containerAlarm.classList.add("doubleBorder");
}
function dontAnimateIconAlarm() {
  iconAlarm.classList.remove("animationRotation");
  containerAlarm.classList.remove("doubleBorder");
}

//AUDIO ALARM*/
const stopAlarmButton = document.querySelector(".stopAlarmButton");

function ringAlarm() {
  alarmAudio.loop = true;
  alarmAudio.play();
}
function stopAlarmButtonHidden() {
  stopAlarmButton.classList.add("hidden");
}
function stopAlarmButtonVisible() {
  stopAlarmButton.addEventListener("click", stopAlarm);
  stopAlarmButton.classList.remove("hidden");
}
function stopAlarm() {
  alarmAudio.pause();
  alarmAudio.loop = false;
  alarmAudio.currentTime = 0;
  stopAlarmButtonHidden();
  if (sessionTime < 0) {
    timerView.textContent = `New session ?`;
  }
  WorkSessionButton.classList.remove("hidden");
  breakSessionButton.classList.remove("hidden");
  WorkSessionButton.removeAttribute("disabled");
  breakSessionButton.removeAttribute("disabled");
  dontAnimateIconAlarm();
}

//STYLE AND CONTENT PRESET
function displayPomodoro() {
  //last theme user preference verfication
  if (window.localStorage.getItem("themeUserPreference")) {
    const themeIdFromLocalStorage = window.localStorage.getItem(
      "themeUserPreference"
    );
    themeUserChoice = themeCollection[themeIdFromLocalStorage]; //return so an object
    console.log(themeUserChoice);
    const newBodyThemeClassName = `themeColors-${themeIdFromLocalStorage}Colors`;
    document.body.classList = "";
    document.body.classList.add(newBodyThemeClassName);
    //ALARM SETTING
    alarmAudio = new Audio(`${themeUserChoice.ringSound}`);
    document
      .querySelector(".iconAlarm")
      .setAttribute("src", `${themeUserChoice.ringPicture}`);
  }
  setTimeInTimerView(minutes, secondes);
  WorkSessionButtonAvailable();
  breakSessionButtonAvailable();
  setTheme();
  playButton.addEventListener("click", play);
  pauseButton.addEventListener("click", pause);
  stopButton.addEventListener("click", stop);
}

displayPomodoro();
