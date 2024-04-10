
function Car(pos) {
	this.pos = pos;
	this.rot = Player.I.rot;

	this.speed = config.basecarspeed + (Math.random() * 2 - 1) * config.carspeedvariation;

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


