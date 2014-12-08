window.onload = initializePlayer;

var vid = [];
var playBtn = [];
var seekSlider = []
var curTimeText = [];
var durTimeText = []
var muteBtn = [];
var volumeSlider = [];
var fullScreenBtn = [];
var num;

function initializePlayer(){
    
    for(var i=0; i<3; i++){
        vid[i] = document.getElementById('my_video'+i);
        playBtn[i] = document.getElementById('playPauseBtn'+i);
        seekSlider[i] = document.getElementById('seekSlider'+i);
        curTimeText[i] = document.getElementById('curTimeText'+i);
        durTimeText[i] = document.getElementById('durTimeText'+i);
        muteBtn[i] = document.getElementById('muteBtn'+i);
        volumeSlider[i] = document.getElementById('volumeSlider'+i);
        fullScreenBtn[i] = document.getElementById('fullScreenBtn'+i);
        
        playBtn[i].addEventListener("click",playPause,false);
        seekSlider[i].addEventListener("change",vidSeek,false);
        volumeSlider[i].addEventListener("change",setVolume,false);
        vid[i].addEventListener("timeupdate",seekTimeUpdate,false);
        muteBtn[i].addEventListener("click",vidMute,false);
        fullScreenBtn[i].addEventListener("click",toggleFullScreen,false);
    }
}

function playPause(){
    
    num = this.value;
    
    if(vid[num].paused){
        
        vid[num].play();
        playBtn[num].style.background = "url(img/pause.png)";
        
    }else{
        
        vid[num].pause();
        playBtn[num].style.background = "url(img/play.png)";
        
    }
}

function vidSeek() {

    var seekto = vid[num].duration * (seekSlider[num].value/100);
    vid[num].currentTime = seekto;
    
}

function seekTimeUpdate(){
    var nt = vid[num].currentTime * (100/vid[num].duration);
    seekSlider[num].value = nt;
    
    var curmins = Math.floor(vid[num].currentTime/60);
    var cursecs = Math.floor(vid[num].currentTime-curmins*60);
    var durmins = Math.floor(vid[num].duration/60);
    var dursecs = Math.round(vid[num].duration-durmins*60);

    if(cursecs<10){
        cursecs = "0"+cursecs;
    }
    if(dursecs<10){
        dursecs = "0"+dursecs;
    }
    if(curmins<10){
        curmins = "0"+curmins;
    }
    if(durmins<10){
        durmins = "0"+durmins;
    }
    curTimeText[num].innerHTML = curmins+":"+cursecs+'/';
    durTimeText[num].innerHTML = durmins+":"+dursecs;
    
}

function vidMute(){
    if(vid[num].muted){
        
        vid[num].muted = false;
        muteBtn[num].style.background = "url(img/mute.png)";
        volumeSlider[num].value = 100;
        
    }else{
        
        vid[num].muted = true;
        muteBtn[num].style.background = "url(img/sound.png)";
        volumeSlider[num].value = 0;

    }
}

function setVolume(){
    vid[num].volume = volumeSlider[num].value/100;
}

function toggleFullScreen(){
    if(vid[num].requestFullScreen){
        vid[num].requestFullScreen();
    }else if(vid[num].webkitRequestFullScreen){
        vid[num].webkitRequestFullScreen();
    }else if(vid[num].mozRequestFullScreen){
        vid[num].mozRequestFullScreen();
    }
}