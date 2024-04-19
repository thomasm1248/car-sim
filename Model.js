
function Model(canvas, context) {
	this.canvas = canvas;
	this.ctx = context;

	Model.I = this;
}

Model.prototype.init = function() {
	new Player(new V());
	this.cars = [];
	this.dust = [];

	this.cameraRot = Player.I.rot;
	this.cameraPos = new V(Player.I.pos);
	this.followPlayer = true;
};

Model.prototype.drawAll = function() {
	var ctx = this.ctx;
	var canvas = this.canvas;

	// Draw a background
	ctx.fillStyle = "#f9db93";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Move the camera
	if(this.followPlayer) {
		var rotationNeeded = Player.I.rot - this.cameraRot;
		this.cameraRot += rotationNeeded * config.camerarotationtenacity;
		this.cameraPos = new V(Player.I.pos);
	}
	ctx.save();
	ctx.translate(canvas.width/2, canvas.height/4*3);
	ctx.rotate(-this.cameraRot - Math.PI/2);
	ctx.translate(-this.cameraPos.x, -this.cameraPos.y);

	// Draw grid around camera
	ctx.save();
	ctx.translate(this.cameraPos.x, this.cameraPos.y);
	var gridSize = 1200;
	var gridCellSize = config.gridsize;
	ctx.beginPath();
	for(var i = -gridSize - (this.cameraPos.y % gridCellSize); i <= gridSize; i += gridCellSize) { // horizontal
		ctx.moveTo(-gridSize, i);
		ctx.lineTo(gridSize, i);
	}
	for(var i = -gridSize - (this.cameraPos.x % gridCellSize); i <= gridSize; i += gridCellSize) { // vertical
		ctx.moveTo(i, -gridSize);
		ctx.lineTo(i, gridSize);
	}
	ctx.lineWidth = 5;
	ctx.strokeStyle = "#e8b57a";
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
