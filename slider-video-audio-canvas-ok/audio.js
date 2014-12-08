document.addEventListener("DOMContentLoaded", function(){
    iniciar();
}, false);

var music, duration, pButton, playhead, timeline, timelineWidth, onplayhead;

function iniciar(){
    
    music = document.getElementById('music'); // id for audio element
    duration; // Duration of audio clip
    pButton = document.getElementById('pButton'); // play button

    playhead = document.getElementById('playhead'); // playhead

    timeline = document.getElementById('timeline'); // timeline
    // timeline width adjusted for playhead
    timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

    // timeupdate event listener
    music.addEventListener("timeupdate", timeUpdate, false);

    //Makes timeline clickable
    timeline.addEventListener("click", function (event) {
    	moveplayhead(event);
    	music.currentTime = duration * clickPercent(event);
    }, false);

    
    // Makes playhead draggable 
    playhead.addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);

    // Boolean value so that mouse is moved on mouseUp only when the playhead is released 
    onplayhead = false;

    // Gets audio file duration
    music.addEventListener("canplaythrough", function () {
    	duration = music.duration;  
    }, false);
    
    pButton.addEventListener('click', play, false);
}

//Play and Pause
function play() {
	// start music
	if (music.paused) {
		music.play();
		// remove play, add pause
		pButton.className = "";
		pButton.className = "pause";
	} else { // pause music
		music.pause();
		// remove pause, add play
		pButton.className = "";
		pButton.className = "play";
	}
}

// returns click as decimal (.77) of the total timelineWidth
function clickPercent(e) {
    return (event.pageX - timeline.offsetLeft) / timelineWidth;
}

// timeUpdate 
// Synchronizes playhead position with current point in audio 
function timeUpdate() {
	var playPercent = timelineWidth * (music.currentTime / duration);
	playhead.style.marginLeft = playPercent + "px";
	if (music.currentTime == duration) {
		pButton.className = "";
		pButton.className = "play";
	}
}

// mousemove EventListener
// Moves playhead as user drags
function moveplayhead(e) {
	var newMargLeft = e.pageX - timeline.offsetLeft;
	if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
		playhead.style.marginLeft = newMargLeft + "px";
	}
	if (newMargLeft < 0) {
		playhead.style.marginLeft = "0px";
	}
	if (newMargLeft > timelineWidth) {
		playhead.style.marginLeft = timelineWidth + "px";
	}
}

// mouseUp EventListener
// getting input from all mouse clicks
function mouseUp(e) {
	if (onplayhead == true) {
		moveplayhead(e);
		window.removeEventListener('mousemove', moveplayhead, true);
		// change current time
		music.currentTime = duration * clickPercent(e);
		music.addEventListener('timeupdate', timeUpdate, false);
	}
	onplayhead = false;
}

// mouseDown EventListener
function mouseDown() {
	onplayhead = true;
	window.addEventListener('mousemove', moveplayhead, true);
	music.removeEventListener('timeupdate', timeUpdate, false);
}