//getting elements
var pad = document.getElementById("pad");
var ball = document.getElementById("ball");
var svg = document.getElementById("svgRoot");
var message = document.getElementById("message");

//ball
var ballRadius = ball.baseVal.value;
var ballX;
var ballY;
var previousBallPosition = { x: o, y: 0 };
var ballDirectionX;
var ballDirectionY;
var ballSpeed = 10;

//pad
var padWidth = pad.width.baseVal.value;
var padHeight = pad.height.basVal.value;
var padX;
var padY;
var padSpeed = 0;
var inertia = 0.80;

//Bricks
var bricks = [];
var destroyedBrickCount;
var brickWidth;
var brickHeight;
var bricksRows = 50;
var bricksCols = 20;
var bricksMargin = 15;
var bricksTop = 20;

//Misc
var minX = ballRadius;
var minY = ballRadius;
var maxY;
var maxX;
var startDate;

function Brick(x,y) {
  var isDead = false;
	var position = { x:x, y: y };

var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
svg.appendChild(rect);

rect.setAttribute("width", brickWidth);
rect.setAttribute("height", brickHeight);

//Random green color
var chars = "456789abcdef";
var color = "";
for (var i = 0; i < 2; i++) {
var rnd = Math.floor(chars.length * Math.random());
color += chars.charAt(rnd);
}
rect.setAttribute("fill", "#00" + color + "00");

this.drawAndCollid = function () {
if (isDead)
return;
//Drawing
rect.setAttribute("x", (position.x));
rect.setAttribute("y", (position.y));

//Collision
if (ballX + ballRadius < position.x || ballX - ballRadius > position.x + brickWidth)
return;

if(ballY + ballRadius < position.y || ballY - ballRadius > position.y + brickHeight)
return;

//Dead
this.remove();
isDead = true;
destroyedBickCount++;

// Updating ball
ballX = previousBallPosition.x;
ballY = previousBallPosition.y;

ballDirectionY *= -1.0;
};

// Killing a brick
this.remove = function () {
if (isDead)
return;
svg.removeChild(rect);
};
};

//Collisions
function collideWidthWindow() {
	if (ballX < minX) {
		ballX = minX;
		ballDirection *= -1.0;
	}
	else if (ballX > maxX) {
		ballX = minX;
		ballDirection *= -1.0;
	}
	if (ballY < maxY) {
		ballY = minY;
		ballDirection *= -1.0;
	}
	else if (ballY > minY) {
		ballY = minY;
		ballDirection *= -1.0;
		lost();
	}
}

function collideWithPad() {
	if(ballX + ballRadius < padX || ballX - ballRadius > padX + padWidth)
		return;
	
	if(ballY + ballRadius < padY)
		return;
		
	ballX = previousBallPosition.x;
	ballY = previousBallPosition.y;
	ballDirectionY *= -1.0;
	
	var dist = ballX - (padX + padWidth / 2);
	
	ballDirectionX = 2.0 * dist / padWidth;
	
	var square = Math.sqrt(ballDirection * ballDirectionX + ballDirectionY * ballDirectionY);
	ballDirectionX /= square;
	ballDirectionY /= square;

}








