
var config = {
	positionresettimer: 36000, // 10 min
	gridsize: 250,
	fullscreen: true,
	distancescale: 220,
	camerarotationtenacity: 0.07,
	countdowntimer: 40,
	countdownstartscale: 5,
	mousecontrols: false,
	phasebutton: 85, // dvorak u
	phaseanimationrate: 0.03,
	phasetime: 60,
	phasecooldown: 1000,
	playeraccel: 0.03,
	playerfriction: 0.8,
	playerrotationaccel: 0.001,
	playerrotationfriction: 0.98,
	driftingpersistence: 0.9,
	dustgrowrate: 1.1,
	dustspawnchance: 0.08,
	dustfriction: 0.9,
	dustmaxsize: 10,
	dustvelcoef: 0.2,
	dustalphacoef: 0.4,
	maxnumberofcars: 350,
	basespawnrate: 0.00026,
	carminwidth: 30,
	carminlength: 50,
	carwidthvariation: 20,
	carlengthvariation: 70,
	carremovaldistance: 1600,
	carspawndistance: 1300,
	carspeedvariation: 2,
	basecarspeed: 9,
	gameovertexttimer: 100,
	gameoverprogressrate: 0.02,
	playercrashfriction: 0.98,
	crashdustvelocity: 10,
	crashdustamount: 30
};

var engine = new Engine($("canvas")[0], Model, Game);
