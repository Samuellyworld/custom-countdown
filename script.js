const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownEltitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle ='';
let countdownDate = '';
let countdownValue= new Date();
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second *60;
const hour = minute*60;
const day = hour*24;


// populate countdown /complete UI
function updateDom() {
	countdownActive = setInterval(() => {
	const now = new Date().getTime();
	const distance = countdownValue - now;
	const days = Math.floor(distance/day);
	const hours = Math.floor((distance%day)/hour);
	const minutes = Math.floor((distance%hour)/minute);
	const seconds = Math.floor((distance%minute)/second);
	// hide input
	inputContainer.hidden = true;
	// if the countdown has ended, show complete 
	if(distance < 0) {
		countdownEl.hidden = true;
		clearInterval(countdownActive);
		completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
        completeEl.hidden = false;
	} else {
     // else show the countdown in progress
    countdownEltitle.textContent = `${countdownTitle}`;
	timeElements[0].textContent= `${days}`;
	timeElements[1].textContent= `${hours}`;
	timeElements[2].textContent= `${minutes}`;
	timeElements[3].textContent= `${seconds}`;
	completeEl.hidden= true;
	countdownEl.hidden = false;
}

}, second)
}
// set Date input min with today's date
const today= new Date().toISOString().split('T')[0];
console.log(today)
dateEl.setAttribute('min', today);

function updateCountdown(e) {
	e.preventDefault();
	countdownTitle= e.srcElement[0].value;
	countdownDate=e.srcElement[1].value;
	savedCountdown = {
		title: countdownTitle,
		date: countdownDate
	}
	localStorage.setItem('countdown', JSON.stringify(savedCountdown));
  if (countdownDate === '') {
  	alert('please select a date for the countdown.')
  } else {
  	// get number version of current date & updateDOM
	countdownValue = new Date(countdownDate).getTime();
	updateDom();
  }
}

// reset all values
function reset() {
	// hide countdowns, show input
	completeEl.hidden= true;
	countdownEl.hidden= true;
	inputContainer.hidden= false;
	// stop the countdown
	clearInterval(countdownActive);
	// reset values
	console.log(countdownTitle)
	countdownTitle = '';
	countdownDate= '';
	localStorage.removeItem('countdown');
}
function restorePreviousCountdown() {
	// get countdown from localstorage if available
	if(localStorage.getItem('countdown')){
		inputContainer.hidden= true;
		savedCountdown= JSON.parse(localStorage.getItem('countdown'));
		countdownTitle = savedCountdown.title;
		countdownDate = savedCountdown.date;
		countdownValue = new Date(countdownDate);
		updateDom();
	}
}
// event Listeners

countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// onload, check localstorage
restorePreviousCountdown();