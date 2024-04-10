
function GameOver() {

	var ctx = Model.I.ctx;
	ctx.save();
	ctx.globalAlpha = 0.5;
	ctx.textAlign = "center";
	ctx.font = "bold 48px Serif";
	ctx.fillStyle = "gray";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "blue";
	ctx.fillText("Game Over", canvas.width/2, canvas.height/2);
	ctx.restore();
}

GameOver.prototype.update = function() {
};
