
function Model(canvas, context, config) {
	this.canvas = canvas;
	this.ctx = context;
	this.config = config;

	this.player = new Player(new V(this.canvas.width/2, this.canvas.height/4*3));
	this.things = [];
}

Model.prototype.drawAll = function() {
	var ctx = this.ctx;
	var canvas = this.canvas;

	// Draw a background
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Move the camera
	ctx.save();
	ctx.translate(canvas.width/2, canvas.height/2);
	ctx.rotate(-this.player.rot);
	ctx.translate(-this.player.pos.x, -this.player.pos.y);

	// Draw all the things
	for(var i = 0; i < this.things.length; i++) {
		this.things[i].draw(this.ctx);
	}

	// Draw the player
	this.player.draw(this.ctx);

	ctx.restore();
};

Model.prototype.draw = function(layer) {
	switch(layer) {
		case "all":
			this.drawAll();
			break;
	}
};
