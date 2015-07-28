var speed = 0;
var speedRobot = "Low";
var sock;
var msg ;

var stop ;

function setLocation(el) {
    document.getElementById("location").value = el.value;
}

function setSpeed(sp) {
    switch (sp) {
        case 20:
            speed = sp;
            speedRobot = "Low";
            break;
        case 50:
            speed = sp;
            speedRobot = "Medium";
            break;
        case 100:
            speed = sp;
            speedRobot = "High";
            break;
        default:
            speed = 20;
            speedRobot = "Low";
    }
    speed = sp;
    document.getElementById("speed").value = speed + "%";
}

function setWs() {
    if ("WebSocket" in window) {
        var loc = document.getElementById("location").value;
        if (loc === "") {
            loc = "localhost:8080";
        }
        sock = new WebSocket("ws://" + loc, "protocolOne");
        sock.onopen = function() {
            document.getElementById("main").style.display = "block";
            document.getElementById("index").style.display = "none";
        };
        sock.onmessage = function(evt) {
            var received_msg = evt.data;
        };
        sock.onerror = function(error) {
            alert("Connection Error");
        }
    } else {
        alert("Your does not support WebSocket");
        navigator.app.exitApp();
    }
}

function sendWs(what) {
    if (what.indexOf("-") >= 0) {
        what += speedRobot;
    }
    
    console.log(what);
    
    sock.send(what);
}

function show(who) {
	document.getElementById(who).style.display = "block";
}

function hide(who) {
	document.getElementById(who).style.display = "none";
}

var watchID = null;

function startWatch() {

    // Update acceleration every 1/2 seconds
    var options = { frequency: 500 };

    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
}

// Stop watching the acceleration
function stopWatch() {
    if (watchID) {
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
    }
}

// onSuccess: Get a snapshot of the current acceleration
//



function onSuccess(acceleration) {

var tog = document.getElementById('myonoffswitch');

if(!tog.checked){
	if(acceleration.z >= 4){
		if(acceleration.y >=-2 && acceleration.y <=2){
			msg = "w-High";
		}else if(acceleration.y > 2){
			msg = "a-High";
		}else if(acceleration.y < -2){
			msg = "d-High";
		}
	}else if(acceleration.z <=-4){
		msg = "s-High";
	}
	else{
		msg = 'halt';
	}
}	
	
    var element = document.getElementById('accelerometer');
    element.innerHTML = 'Acceleration X: ' + acceleration.x         + '<br />' +
                    	'Acceleration Y: ' + acceleration.y         + '<br />' +
                        'Acceleration Z: ' + acceleration.z         + '<br />' +
                        'Timestamp: '      + acceleration.timestamp + '<br />';
}

// onError: Failed to get the acceleration
//
function onError() {
    alert('onError!');
}

var c = 0;
var element; 


// Usiamo il metodo 2
function prova(){
	window.setInterval( 'cont_plus()', 500 );
}

function cont_plus() { 
	//c++; 
	//element.innerHTML = ''+msg;
   	//alert( cont ); 
   	
   	if(!stop)
   		sock.send(msg);
}

function stopsendcommand(){
	stop = true;
}

function startsendcommand(){
	stop = false;
}
