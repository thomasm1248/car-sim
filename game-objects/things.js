
function Car(pos) {
	this.pos = new V(pos);
	this.rot = Player.I.rot;

	this.speed = config.basecarspeed + (Math.random() * 2 - 1) * config.carspeedvariation;
	this.vel = V.trig(this.rot, this.speed);

	var width = config.carminwidth;
	var length = config.carminlength;
	width += config.carwidthvariation * Math.random();
	length += config.carlengthvariation * Math.random();
	this.boxOffset = new V(0, width/2);
	this.boxSize = new V(length, width);

	Model.I.cars.push(this);
}

Car.prototype.draw = function(ctx) {
	ctx.save();
	translate(ctx, this.pos);
	ctx.rotate(this.rot);
	ctx.beginPath();
	ctx.strokeStyle = "#664c15";
	ctx.lineWidth = 3;
	ctx.strokeRect(this.boxOffset.x, this.boxOffset.y, this.boxSize.x, this.boxSize.y);
	ctx.stroke();
	ctx.restore();
};

Car.prototype.update = function() {
	// Spawn dust under the car
	var carCorners = getRotatableBoxCorners(this);
	if(Math.random() < config.dustspawnchance) new Dust(carCorners[0], this.vel);
	if(Math.random() < config.dustspawnchance) new Dust(carCorners[3], this.vel);

	// Move the car with its velocity
	this.pos.accum(this.vel);

	// Check if the car collides with the player
	if(!Player.I.isPhasing && doRotatableBoxesIntersect(this, Player.I)) {
		Player.I.dead = true;
		Player.I.vel = this.pos.subtract(Player.I.pos).scale(-0.1);
	}

	// Remove the car when it's too far from the player
	if(this.pos.dist(Player.I.pos) > config.carremovaldistance) return true;
	else return false;
};


function Dust(pos, vel) {
	this.pos = new V(pos);
	this.vel = new V.trig(Math.random() * Math.PI * 2, config.dustvelcoef * vel.norm());
	this.rot = Math.random() * Math.PI;
	this.size = Math.random() * config.dustmaxsize;
	
	Model.I.dust.push(this);
}

Dust.prototype.draw = function(ctx) {
	ctx.save();
	translate(ctx, this.pos);
	ctx.globalAlpha = snap(0, this.vel.norm() * config.dustalphacoef, 1);
	ctx.rotate(this.rot);
	ctx.fillStyle = "#aa7436";
	ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
	ctx.restore();
};

Dust.prototype.update = function() {
	this.size *= config.dustgrowrate;
	this.vel = this.vel.scale(config.dustfriction);
	this.pos.accum(this.vel);
	return this.vel.norm() < 0.05;
};
