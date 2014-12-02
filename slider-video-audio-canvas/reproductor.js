//Con ésta función llamamos al método iniciar cuando se crea el DOM
document.addEventListener("DOMContentLoaded", function(){
	iniciar();
}, false);
// JavaScript Document
var maximo=500;
var medio;
var reproducir;
var barra;
var progreso;
var bucle;
var btn;
 
function iniciar(){
	
	medio=document.getElementById('medio');	
	reproducir=document.getElementById('reproducir');
	progreso=document.getElementById('progreso');		
	barra=document.getElementById('barra');	
	
	reproducir.addEventListener('click', presionar, false);
	progreso.addEventListener('click', mover, false);
}

function presionar(){
	
	if(!medio.paused && !medio.ended){
		reproducir.style.backgroundImage="url('play.png')";
		medio.pause();
		/*reproducir.innerHTML='Reproducir';*/
		window.clearInterval(estado);
		
	}else{
		
		medio.play();
		bucle=setInterval(estado, 50);	
		/*reproducir.innerHTML='Pausa';*/
		reproducir.style.backgroundImage="url('pause.png')";
	}
}

function estado(){
	
	if(!medio.ended){
		
		var total = parseInt(medio.currentTime*maximo/medio.duration);
		barra.style.width=total+'px';
		
	}else{
		
		barra.style.width='0px';
		reproducir.innerHTML='Reproducir';
		window.clearInterval(estado);
		
	}
}
function mover(e){
	
	if(!medio.paused && !medio.ended){
		
		var ratonX = e.pageX-progreso.offsetLeft;
		var nuevoTiempo=ratonX*medio.duration/maximo;
		medio.currentTime=nuevoTiempo;
		barra.style.width=ratonX+'px';
		
	}	
}
