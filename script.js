//*****THEMES//
let alarmAudio = new Audio("alarms/Voicy_Star Wars Main Theme (Full).mp3");
let themeButtons = document.querySelectorAll("button[data-themeColors]");
let themeUserChoice;

class Theme {
  constructor(themeConfig) {
    this.ringSound = themeConfig.ringSound;
    this.ringPicture = themeConfig.ringPicture;
  }
}

const starWarsConfig = {
  ringSound: "alarms/Voicy_Star Wars Main Theme (Full).mp3",
  ringPicture: "images/icons8-soldat-d'assaut.svg",
};

const strangerThingsConfig = {
  ringSound: "alarms/Voicy_stranger things beat.mp3",
  ringPicture: "images/icons8-maxine-mayfield.svg",
};

const animalCrossingConfig = {
  ringSound: "alarms/Voicy_Animal Crossing New Horizons Theme music.mp3",
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

function stopAnimationInitial() {
  [...circlesStroke].forEach(function (circleStroke) {
    circleStroke.classList.remove("animationInitial");
  });
}
function lauchAnimationInitial() {
  [...circlesStroke].forEach(function (circleStroke) {
    circleStroke.classList.add("animationInitial");
  });
}
function launchAnimationTimer() {
  [...circlesStroke].forEach(function (circleStroke) {
    circleStroke.classList.add("animationTimer");
    circleStroke.style.animationDuration = `${timeCalled}ms`;
    circleStroke.style.animationPlayState = "running";
  });
}

function pauseAnimationTimer() {
  [...circlesStroke].forEach(function (circleStroke) {
    circleStroke.style.animationPlayState = "paused";
  });
}

function stopAnimationTimer() {
  [...circlesStroke].forEach(function (circleStroke) {
    circleStroke.classList.remove("animationTimer");
  });
}

//*****WORKSESSION AND NEW BREAK */
let breakSessionButton = document.querySelector(".breakSession");
let WorkSessionButton = document.querySelector(".workSession");

//WORKSESSIONBUTTON*/
function WorkSessionButtonAvailable() {
  WorkSessionButton.addEventListener("click", function () {
    timeCalled = 30 * 1000;
    setSession();
    WorkSessionButton.removeAttribute("disabled");
    WorkSessionButton.classList.remove("hidden");
    breakSessionButton.setAttribute("disabled", "true");
  });
}

//BREAKSESSIONBUTTON*/
function breakSessionButtonAvailable() {
  breakSessionButton.addEventListener("click", function () {
    timeCalled = 30 * 1000;
    setSession();
    breakSessionButton.removeAttribute("disabled");
    breakSessionButton.classList.remove("hidden");
    WorkSessionButton.setAttribute("disabled", "true");
  });
}

/*****TIMER*/
//TIMER GENERAL FUNCTION*/
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
  document.body.classList.add("pom-stop");
  document.body.classList.remove("pom-pause");
  document.body.classList.remove("pom-play");
  buttonsBarVisible();
  breakSessionButtonAvailable();
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
  document.body.classList.remove("pom-stop");
  document.body.classList.remove("pom-pause");
  document.body.classList.add("pom-play");
  clearInterval(interval);
  interval = setInterval(countDown, 1000);
  playButtonDisabled();
  pauseButtonAvailable();
  stopButtonAvailable();
  stopAnimationInitial();
  launchAnimationTimer();
}
function pause() {
  document.body.classList.remove("pom-stop");
  document.body.classList.remove("pom-play");
  document.body.classList.add("pom-pause");
  clearInterval(interval);
  pauseButtonDisabled();
  playButtonAvailable();
  pauseAnimationTimer();
}
function stop() {
  document.body.classList.remove("pom-play");
  document.body.classList.remove("pom-pause");
  document.body.classList.add("pom-stop");
  clearInterval(interval);
  sessionTime = timeCalled;
  transformTimeAsADate(sessionTime);
  setTimeInTimerView(minutes, secondes);
  stopButtonDisabled();
  playButtonAvailable();
  pauseButtonDisabled();
  stopAnimationTimer();
  lauchAnimationInitial();
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
  timerView.textContent = `New session ?`;
  WorkSessionButton.classList.remove("hidden");
  WorkSessionButton.removeAttribute("disabled");
  breakSessionButton.classList.remove("hidden");
  breakSessionButton.removeAttribute("disabled");
  breakSessionButtonAvailable();
  dontAnimateIconAlarm();
}

//STYLE AND CONTENT PRESET
function displayDefaultPage() {
  setTimeInTimerView(minutes, secondes);
  WorkSessionButtonAvailable();
  breakSessionButtonAvailable();
  setTheme();
  playButton.addEventListener("click", play);
  pauseButton.addEventListener("click", pause);
  stopButton.addEventListener("click", stop);
}

displayDefaultPage();
