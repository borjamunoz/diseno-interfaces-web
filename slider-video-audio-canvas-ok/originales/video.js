window.onload = initializePlayer;

var vid, playBtn, seekSlider, curTimeText, durTimeText, muteBtn, volumeSlider, fullScreenBtn;

function initializePlayer(){
    
    for(var i=0; i<2; i++){
        vid[i] = document.getElementById('my_video'+i);
        alert(vid[i].id);
        playBtn[i] = document.getElementById('playPauseBtn'+i);
        seekSlider[i] = document.getElementById('seekSlider'+i);
        curTimeText[i] = document.getElementById('curTimeText'+i);
        durTimeText[i] = document.getElementById('durTimeText'+i);
        muteBtn[i] = document.getElementById('muteBtn'+i);
        volumeSlider[i] = document.getElementById('volumeSlider'+i);
        fullScreenBtn[i] = document.getElementById('fullScreenBtn'+i);
    }
    
    /*vid = document.getElementById('my_video');
    playBtn = document.getElementById('playPauseBtn');
    seekSlider = document.getElementById('seekSlider');
    curTimeText = document.getElementById('curTimeText');
    durTimeText = document.getElementById('durTimeText');
    muteBtn = document.getElementById('muteBtn');
    volumeSlider = document.getElementById('volumeSlider');
    fullScreenBtn = document.getElementById('fullScreenBtn');*/

    playBtn.addEventListener("click",playPause,false);
    seekSlider.addEventListener("change",vidSeek,false);
    volumeSlider.addEventListener("change",setVolume,false);
    vid.addEventListener("timeupdate",seekTimeUpdate,false);
    muteBtn.addEventListener("click",vidMute,false);
    fullScreenBtn.addEventListener("click",toggleFullScreen,false);

}

function playPause(){
    
    if(vid.paused){
        
        vid.play();
        playBtn.style.background = "url(pause.png)";
        
    }else{
        
        vid.pause();
        playBtn.style.background = "url(play.png)";
        
    }
}

function vidSeek() {

    var seekto = vid.duration * (seekSlider.value/100);
    vid.currentTime = seekto;
    
}

function seekTimeUpdate(){
    var nt = vid.currentTime * (100/vid.duration);
    seekSlider.value = nt;
    
    var curmins = Math.floor(vid.currentTime/60);
    var cursecs = Math.floor(vid.currentTime-curmins*60);
    var durmins = Math.floor(vid.duration/60);
    var dursecs = Math.round(vid.duration-durmins*60);

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
    curTimeText.innerHTML = curmins+":"+cursecs+'/';
    durTimeText.innerHTML = durmins+":"+dursecs;
    
}

function vidMute(){
    if(vid.muted){
        
        vid.muted = false;
        muteBtn.style.background = "url(mute.png)";
        volumeSlider.value = 100;
        
    }else{
        
        vid.muted = true;
        muteBtn.style.background = "url(sound.png)";
        volumeSlider.value = 0;

    }
}

function setVolume(){
    vid.volume = volumeSlider.value/100;
}

function toggleFullScreen(){
    if(vid.requestFullScreen){
        vid.requestFullScreen();
    }else if(vid.webkitRequestFullScreen){
        vid.webkitRequestFullScreen();
    }else if(vid.mozRequestFullScreen){
        vid.mozRequestFullScreen();
    }
}