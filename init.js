
var config = {
	fullscreen: true,
	camerarotationtenacity: 0.07,
	countdowntimer: 60,
	countdownstartscale: 5,
	mousecontrols: false,
	playeraccel: 0.03,
	playerfriction: 0.8,
	playerrotationaccel: 0.001,
	playerrotationfriction: 0.98,
	maxnumberofcars: 350,
	basespawnrate: 0.00026,
	carremovaldistance: 1600,
	carspawndistance: 1300,
	carspeedvariation: 2,
	basecarspeed: 9
};

var engine = new Engine($("canvas")[0], Model, Game, config);
