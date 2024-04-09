
function Rock(pos) {
	this.pos = pos;
	this.rad = 10;
	this.box = new V(this.rad, this.rad);
}

Rock.prototype.draw = function(ctx) {
	ctx.save();
	translate(ctx, this.pos);
	ctx.beginPath();
	ctx.strokeStyle = "red";
	ctx.lineWidth = 3;
	ctx.arc(0, 0, this.rad, 0, Math.PI*2);
	ctx.stroke();
	ctx.restore();
};

Rock.prototype.update = function(model) {
	// Move the rock down
	this.pos.y += model.config.baserockspeed;

	// Check if the rock collides with the player
	if(doBoxesIntersect(this, model.player)) {
		model.player.dead = true;
	}

	// Remove the rock when it reaches the bottom
	if(this.pos.y > this.rad + model.canvas.height) return true;
	else return false;
};



function Dart(pos) {
	this.pos = pos;
	this.rad = 10;
	this.box = new V(this.rad, this.rad);
}

Dart.prototype.draw = function(ctx) {
	ctx.save();
	translate(ctx, this.pos);
	ctx.beginPath();
	ctx.strokeStyle = "red";
	ctx.lineWidth = 3;
	ctx.moveTo(-this.rad, -this.rad);
	ctx.lineTo(this.rad, -this.rad);
	ctx.lineTo(0, this.rad);
	ctx.lineTo(-this.rad, -this.rad);
	ctx.stroke();
	ctx.restore();
};

Dart.prototype.update = function(model) {
	// Move the dart down
	this.pos.y += model.config.basedartspeed;

	// Check if the dart collides with the player
	if(doBoxesIntersect(this, model.player)) {
		model.player.dead = true;
	}

	// Remove the dart when it reaches the bottom
	if(this.pos.y > this.rad + model.canvas.height) return true;
	else return false;
};



function Wall(pos, width) {
	this.pos = pos;
	this.box = new V(width / 2, 10);
}

Wall.prototype.draw = function(ctx) {
	ctx.save();
	translate(ctx, this.pos);
	ctx.beginPath();
	ctx.strokeStyle = "red";
	ctx.lineWidth = 3;
	ctx.strokeRect(-this.box.x, -this.box.y, this.box.x*2, this.box.y*2);
	ctx.restore();
};

Wall.prototype.update = function(model) {
	// Move the wall down
	this.pos.y += model.config.basewallspeed;

	// Check if the wall collides with the player
	if(doBoxesIntersect(this, model.player)) {
		model.player.dead = true;
	}

	// Remove the wall when it reaches the bottom
	if(this.pos.y > this.rad + model.canvas.height) return true;
	else return false;
};