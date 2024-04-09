
var config = {
	fullscreen: true,
	countdowntimer: 60,
	countdownstartscale: 5,
	mousecontrols: false,
	playeraccel: 0.8,
	playerfriction: 0.8,
	playerrotationaccel: 0.002,
	playerrotationfriction: 0.9,
	basespawnrate: 0.00026,
	wallwidth: 200,
	dartchance: 0.2,
	wallchance: 0.02,
	baserockspeed: 5,
	basedartspeed: 8,
	basewallspeed: 2
};

var engine = new Engine($("canvas")[0], Model, Game, config);
engine.init();
