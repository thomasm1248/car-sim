
function Car(pos) {
	this.pos = new V(pos);
	this.rot = Player.I.rot;

	this.speed = config.basecarspeed + (Math.random() * 2 - 1) * config.carspeedvariation;
	this.vel = V.trig(this.rot, this.speed);

	this.boxOffset = new V(0, -20);
	this.boxSize = new V(60, 40);

	Model.I.cars.push(this);
}

Car.prototype.draw = function(ctx) {
	ctx.save();
	translate(ctx, this.pos);
	ctx.rotate(this.rot);
	ctx.beginPath();
	ctx.strokeStyle = "red";
	ctx.lineWidth = 3;
	ctx.strokeRect(this.boxOffset.x, this.boxOffset.y, this.boxSize.x, this.boxSize.y);
	ctx.stroke();
	ctx.restore();
};

Car.prototype.update = function() {
	// Spawn gravel under the car
	var carCorners = getRotatableBoxCorners(this);
	if(Math.random() < config.gravelspawnchance) new Gravel(carCorners[0], this.vel);
	if(Math.random() < config.gravelspawnchance) new Gravel(carCorners[3], this.vel);

	// Move the car in the direction it's facing
	this.pos.accum(V.trig(this.rot, this.speed));

	// Check if the car collides with the player
	if(doRotatableBoxesIntersect(this, Player.I)) {
		Player.I.dead = true;
	}

	// Remove the car when it's too far from the player
	if(this.pos.dist(Player.I.pos) > config.carremovaldistance) return true;
	else return false;
};


function Gravel(pos, vel) {
	this.pos = new V(pos);
	this.vel = new V.trig(Math.random() * Math.PI * 2, config.gravelvelcoef * vel.norm());
	this.rot = Math.random() * Math.PI;
	this.size = Math.random() * config.gravelmaxsize;
	
	Model.I.gravel.push(this);
}

Gravel.prototype.draw = function(ctx) {
	ctx.save();
	translate(ctx, this.pos);
	ctx.globalAlpha = snap(0, this.vel.norm() * config.gravelalphacoef, 1);
	ctx.rotate(this.rot);
	ctx.fillStyle = "gray";
	ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
	ctx.restore();
};

Gravel.prototype.update = function() {
	this.vel = this.vel.scale(config.gravelfriction);
	this.pos.accum(this.vel);
	return this.vel.norm() < 0.05;
};
