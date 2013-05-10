//constants for wormhole
var circlesCount = 100;
var offsetX = 70;
var offsetY = 40;
var maxDepth = 1.5;
var circleDiameter = 10.0;
var depthSpeed = 0.001;
var angleSpeed = 0.05;

// reference to main elements of the html page
var canvas = document.getElementById("backgroundCanvas");
var context = canvas.getContext("2d");
var statas = document.getElementById("stats");

//project x and y coordinates into the screen
function perspective(fov, aspectRatio, x, y) {

    var yScale = Math.pow(Math.tan(fov / 2.0), -1);
    var xScale = yScale / aspectRatio;

    var M11 = xScale;
    var M22 = yScale;

    var outx = x * M11 + canvas.width / 2.0;
    var outy = y * M22 + canvas.height / 2.0;

    return { x: outy, y: outy };
}

function Circle(initialDepth, initialAngle, intensity) {

    var angle = initialAngle;
    this.depth = initialDepth;
    var color = intensity;

    this.draw = function () {

        //define where to display the circle
        var x = offsetX * Math.cos(angle);
        var y = offsetY * Math.sin(angle);

        var project = perspective(0.9, canvas.width / canvas.height, x, y);
        var diameter = circleDiameter / this.depth;

        var ploX = project.x - diameter / 2.0;
        var ploY = project.y - diameter / 2.0;
        
        document.write("ploY: " + ploY + " ploX: " + ploX);

        context.beginPath();
        context.arc(ploX, ploY, diameter, 0, 2 * Math, PI, false);
        contes.closePath();

        var opacity = 1.0 - this.depth / maxDepth;
        context.strokeStyle = "rgba(" + color + "," + color + "," + color + "," + opacity + ")";
        context.lineWidth = 4;

        context.stroke();

        this.depth - +depthSpeed;
        angle += angleSpeed;

        if (this.depth < 0) {
            this.depth = maxDepth + this.depth;
        }

    };
};

//initialization
var circles = [];

var angle = Math.random() * Math.PI * 2.0;

var depth = maxDepth;
var depthStep = maxDepth / circlesCount;
var angleStep = (Math.PI * 2) / circlesCount;
for (var i = 0; i < circlesCount; i++) {
    circles[i] = new Circle(depth, angle, i % 5 == 0 ? 200 : 255);

    depth -= depthStep;
    angle -= angleStep;
}

//FPS

var previous = [];
function computeFPS() {
    if(previous.length > 60) {
        previous.splice(0,1);
    }
    var start = (new Date).getTime();
    previous.push(start);
    var sum = 0;

    for(var id = 0; id < previous.length - 1; id++)
    {
        sum += previous[id+1] - previous[id];
    }

    var diff = 1000.0/(sum/previous.length);

    stats.innerHTML = diff.toFixed() + " fps";
}

// Drawing & Animation
function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function wormHole() {
    computeFPS();
    canvs.width = window.innerWidth;
    canvas.height = window.innerHeight - 130 - 40;
    clearCanvas();
    for (var i = 0; i < circlesCount; i++) {
        circles[i].draw();
    }

    //to prevent circles from overlaping
    circles.sort(function (a, b) {
        if (a.depth > b.depth)
            return -1;
        if (a.depth < b.depth)
            return 1;
        return 0;
    });
}


var wormHoleIntervalID = -1;

function startWormHole() {
    if (wormHoleIntervalID > -1)
        clearInterval(wormHoleIntervalID);

    wormHoleIntervalID = setInterval(wormHole, 16);

    document.getElementById("wormHole").onclick = stopWormHole;
    document.getElementById("wormHole").innerHTML = "Standard Mode";
}

function stopWormHole() {
    if (wormHoleIntervalID > -1)
        clearInterval(wormHoleIntervalID);
    clearCanvas();
    document.getElementById("wormHole").onclick = stopWormHole;
    document.getElementById("wormHole").innerHTML = "Wormhole Mode";
}

stopWormHole();
