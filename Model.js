
function Model(canvas, context, config) {
	this.canvas = canvas;
	this.ctx = context;
	this.config = config;

	new Player(new V(this.canvas.width/2, this.canvas.height/4*3));
	this.cars = [];
	this.dust = [];

	this.cameraRot = Player.I.rot;

	Model.I = this;
}

Model.prototype.drawAll = function() {
	var ctx = this.ctx;
	var canvas = this.canvas;

	// Draw a background
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Move the camera
	var rotationNeeded = Player.I.rot - this.cameraRot;
	this.cameraRot += rotationNeeded * config.camerarotationtenacity;
	ctx.save();
	ctx.translate(canvas.width/2, canvas.height/4*3);
	ctx.rotate(-this.cameraRot - Math.PI/2);
	ctx.translate(-Player.I.pos.x, -Player.I.pos.y);

	// Draw grid around player
	ctx.save();
	ctx.translate(Player.I.pos.x, Player.I.pos.y);
	var gridSize = 1200;
	var gridCellSize = 220;
	ctx.beginPath();
	for(var i = -gridSize - (Player.I.pos.y % gridCellSize); i <= gridSize; i += gridCellSize) { // horizontal
		ctx.moveTo(-gridSize, i);
		ctx.lineTo(gridSize, i);
	}
	for(var i = -gridSize - (Player.I.pos.x % gridCellSize); i <= gridSize; i += gridCellSize) { // vertical
		ctx.moveTo(i, -gridSize);
		ctx.lineTo(i, gridSize);
	}
	ctx.lineWidth = 1;
	ctx.strokeStyle = "white";
	ctx.stroke();
	ctx.restore();

	// Draw the dust
	for(var i = 0; i < this.dust.length; i++) {
		this.dust[i].draw(ctx);
	}

	// Draw all the cars
	for(var i = 0; i < this.cars.length; i++) {
		this.cars[i].draw(this.ctx);
	}

	// Draw the player
	Player.I.draw(this.ctx);

	ctx.restore();
};

Model.prototype.draw = function(layer) {
	switch(layer) {
		case "all":
			this.drawAll();
			break;
	}
};
