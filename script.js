//VARIABLES
let timerView = document.querySelector(".timerView");
//Buttons
let playButton = document.querySelector(".play");
let backPlayButton = document.querySelector(".buttonPlay");
let stopButton = document.querySelector(".stop");
let backStopButton = document.querySelector(".buttonStop");
let pauseButton = document.querySelector(".pause");
let backPauseButton = document.querySelector(".buttonPause");
let breakSessionButton = document.querySelector(".breakSession");
let WorkSessionButton = document.querySelector(".workSession");
/*//workRainbow
let workLimeRainbow = document.querySelector(".lime");
let workPeachRainbow = document.querySelector(".peach");
let workCorailRainbow = document.querySelector(".corail");
let workRoseRainbow = document.querySelector(".rose");
let workPurpleRainbow = document.querySelector(".purple");
//breakRainbow
let breakRainbow = document.querySelector(".breakRainbow");
let breakBlueRainbow = document.querySelector(".blue");
let breakSkyBlueRainbow = document.querySelector(".skyBlue");
let breakLightBlueRainbow = document.querySelector(".lightBlue");
let breakGreenRainbow = document.querySelector(".green");
let breakLimeGreenRainbow = document.querySelector(".limeGreen");*/
let sessionTime;
let timeCalled;
let minutes = 25;
let secondes = "00";
let interval;

let alarmAudio = new Audio("alarms/Voicy_Star Wars Main Theme (Full).mp3");
let stopAlarmButton = document.querySelector(".stopAlarmButton");

//THEMES//
class Theme {
  constructor(themeConfig) {
    this.circle1 = themeConfig.circle1;
    this.circle2 = themeConfig.circle2;
    this.circle3 = themeConfig.circle3;
    this.circle4 = themeConfig.circle4;
    this.circle5 = themeConfig.circle5;
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

let themeButtons = document.querySelectorAll(".choiceTheme");
let themeUserChoice;

function themeUserSet() {
  themeButtons.forEach(function (themeButton) {
    themeButton.addEventListener("click", () => {
      themeUserChoice = themeCollection[themeButton.id];
      console.log(themeUserChoice);
      letTheme(themeUserChoice);
    });
  });
}

function letTheme(themeUserChoice) {
  //GENERALS COLORS
  const themeButtons = document.querySelectorAll("button[data-themeColors]");
  [...themeButtons].forEach(function (button) {
    button.addEventListener("click", () => {
      const currentButtonThemeColors = button.getAttribute("data-themeColors");
      const newBodyThemeClassName = `themeColors-${currentButtonThemeColors}`;
      document.body.classList = ""; //NEED TO LEARN REGEXP TO FIX IT BETTER
      document.body.classList.add(newBodyThemeClassName);
    });
  });
  //ALARM SETTING
  alarmAudio = new Audio(`${themeUserChoice.ringSound}`);
  document
    .querySelector(".iconAlarm")
    .setAttribute("src", `${themeUserChoice.ringPicture}`);
}

//STYLE AND CONTENT PRESET
timerView.textContent = `${minutes} mn : ${secondes} s`;
WorkSessionButtonDisplayFlex();
WorkSessionButtonActiv();
breakSessionButtonDisplayFlex();
breakSessionButtonActiv();
document.querySelector(".buttonsBar").style.display = "none";
stopAlarmButton.style.display = "none";
//containerAlarm.style.display = "none";

// FUNCTION INTERACTIVITY
/******RAINBOWS*/
/*function workRainbowInitalColor() {
  workLimeRainbow.style.background = "#FBF8CC";
  workPeachRainbow.style.background = "#FDE4CF";
  workCorailRainbow.style.background = "#FFCFD2";
  workRoseRainbow.style.background = "#F1C0E8";
  workPurpleRainbow.style.background = "#CFBAF0";
}

function workRainbowPink() {
  workLimeRainbow.style.background = "var(--shadowColor)";
  workPeachRainbow.style.background = "var(--shadowColor)";
  workCorailRainbow.style.background = "var(--shadowColor)";
  workRoseRainbow.style.background = "var(--shadowColor)";
  workPurpleRainbow.style.background = "var(--shadowColor)";
}

function breakRainbowInitialColor() {
  breakBlueRainbow.style.background = "#A3C4F3";
  breakSkyBlueRainbow.style.background = "#90DBF4";
  breakLightBlueRainbow.style.background = "#8EECF5";
  breakGreenRainbow.style.background = "#98F5E1";
  breakLimeGreenRainbow.style.background = "#B9FBC0";
}

function breakRainbowPink() {
  breakBlueRainbow.style.background = "var(--shadowColor)";
  breakSkyBlueRainbow.style.background = "var(--shadowColor)";
  breakLightBlueRainbow.style.background = "var(--shadowColor)";
  breakGreenRainbow.style.background = "var(--shadowColor)";
  breakLimeGreenRainbow.style.background = "var(--shadowColor)";
}*/

/******PLAYBUTTON*/
function playButtonActiv() {
  playButton.addEventListener("click", startSession);
  playButton.style.cursor = "pointer";
  backPlayButton.style.border = "solid 3px var(--secondaryColor)";
  backPlayButton.style.background = "var(--primaryColor)";
}

function playButtonInactiv() {
  playButton.removeEventListener("click", startSession);
  playButton.style.cursor = "none";
  backPlayButton.style.border = "solid 1px var(--secondaryColor)";
  backPlayButton.style.background = "var(--shadowColor)";
}

function playButtonDisplayBlock() {
  playButton.style.display = "block";
}

function playButtonDisplayNone() {
  playButton.style.display = "none";
}

/******PAUSEBUTTON*/
function pauseButtonActiv() {
  pauseButton.addEventListener("click", pauseSession);
  pauseButton.style.cursor = "pointer";
  backPauseButton.style.border = "solid 3px var(--secondaryColor)";
  backPauseButton.style.background = "var(--primaryColor)";
}

function pauseButtonInactiv() {
  pauseButton.removeEventListener("click", pauseSession);
  pauseButton.style.cursor = "none";
  backPauseButton.style.border = "solid 1px var(--secondaryColor)";
  backPauseButton.style.background = "var(--shadowColor)";
}

function pauseButtonDisplayBlock() {
  pauseButton.style.display = "block";
}

function pauseButtonDisplayNone() {
  pauseButton.style.display = "none";
}

/******STOPBUTTON*/
function stopButtonActiv() {
  stopButton.addEventListener("click", stop);
  stopButton.style.cursor = "pointer";
  backStopButton.style.border = "solid 3px var(--secondaryColor)";
  backStopButton.style.background = "var(--primaryColor)";
}

function stopButtonInactiv() {
  stopButton.removeEventListener("click", stop);
  stopButton.style.cursor = "none";
  backStopButton.style.border = "solid 1px var(--secondaryColor)";
  backStopButton.style.background = "var(--shadowColor)";
}

function stopButtonDisplayBlock() {
  stopButton.style.display = "block";
}

function stopButtonDisplayNone() {
  stopButton.style.display = "none";
}

/******WORKSESSIONBUTTON*/
function WorkSessionButtonActiv() {
  WorkSessionButton.addEventListener("click", onclickNewWorkSession);
  WorkSessionButton.style.cursor = "pointer";
  WorkSessionButton.style.border = "solid 3px var(--secondaryColor)";
  WorkSessionButton.style.background = "var(--primaryColor)";
}

function WorkSessionButtonInactiv() {
  WorkSessionButton.removeEventListener("click", onclickNewWorkSession);
  WorkSessionButton.style.cursor = "none";
  WorkSessionButton.style.border = "solid 1px var(--secondaryColor)";
  WorkSessionButton.style.background = "var(--shadowColor)";
}

function WorkSessionButtonDisplayFlex() {
  WorkSessionButton.style.display = "flex";
}

function WorkSessionButtonDisplayNone() {
  WorkSessionButton.style.display = "none";
}

/******BREAKSESSIONBUTTON*/
function breakSessionButtonActiv() {
  breakSessionButton.addEventListener("click", onclickBreakCallButton);
  breakSessionButton.style.cursor = "pointer";
  breakSessionButton.style.border = "solid 3px var(--secondaryColor)";
  breakSessionButton.style.background = "var(--primaryColor)";
}

function breakSessionButtonInactiv() {
  breakSessionButton.removeEventListener("click", onclickBreakCallButton);
  breakSessionButton.style.cursor = "none";
  breakSessionButton.style.border = "solid 1px var(--secondaryColor)";
  breakSessionButton.style.background = "var(--shadowColor)";
}

function breakSessionButtonDisplayFlex() {
  breakSessionButton.style.display = "flex";
}

function breakSessionButtonDisplayNone() {
  breakSessionButton.style.display = "none";
}

/******ANIMATION ICON ALARM */
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

/******AUDIO ALARM*/
function ringAlarm() {
  alarmAudio.loop = true;
  alarmAudio.play();
}

function stopAlarm() {
  alarmAudio.pause();
  document.querySelector(".workSession").style.display = "flex";
  document.querySelector(".breakSession").style.display = "flex";
  stopAlarmButton.style.display = "none";
  timerView.textContent = `New session ?`;
  breakSessionButtonActiv();
  dontAnimateIconAlarm();
}

////FUNCTIONS GENERAL

function transformTimeAsADate(sessionTime) {
  timeAsADate = new Date(sessionTime);
  minutes = timeAsADate.getMinutes();
  secondes = timeAsADate.getSeconds();
}

function onclickNewWorkSession() {
  timeCalled = 25 * 60 * 1000;
  sessionTime = timeCalled;
  transformTimeAsADate(sessionTime);
  timerView.textContent = `${minutes} mn : ${secondes} s`;
  startSession();
  document.querySelector(".buttonsBar").style.display = "flex";

  WorkSessionButtonInactiv();
  breakSessionButtonActiv();
  playButtonInactiv();
  pauseButtonActiv();
  stopButtonActiv();
}

function onclickBreakCallButton() {
  timeCalled = 5 * 1000;
  sessionTime = timeCalled;
  transformTimeAsADate(sessionTime);
  timerView.textContent = `${minutes} mn : ${secondes} s`;
  startSession();
  document.querySelector(".buttonsBar").style.display = "flex";
  breakSessionButtonInactiv();
  WorkSessionButtonActiv();
  playButtonInactiv();
  pauseButtonActiv();
  stopButtonActiv();
}

function startSession() {
  clearInterval(interval);
  interval = setInterval(countDown, 1000);
  playButtonInactiv();
  pauseButtonActiv();
  stopButtonActiv();
}

function countDown() {
  sessionTime = sessionTime - 1000;
  transformTimeAsADate(sessionTime);
  minutes = timeAsADate.getMinutes();
  secondes = timeAsADate.getSeconds();
  timerView.textContent = `${minutes} mn : ${secondes} s`;
  if (sessionTime < 0) {
    clearInterval(interval);
    document.querySelector(".buttonsBar").style.display = "none";
    timerView.textContent = `Time out`;
    stopAlarmButton.style.display = "flex";
    ringAlarm();
    animateIconAlarm();
    stopAlarmButton.addEventListener("click", stopAlarm);
    WorkSessionButtonDisplayNone();
    breakSessionButtonDisplayNone();
  }
}

function stop() {
  clearInterval(interval);
  sessionTime = timeCalled;
  transformTimeAsADate(sessionTime);
  timerView.textContent = `${minutes} mn : ${secondes} s`;
  stopButtonInactiv();
  playButtonActiv();
  pauseButtonInactiv();
}

function pauseSession() {
  clearInterval(interval);
  pauseButtonInactiv();
  playButtonActiv();
}

themeUserSet();
