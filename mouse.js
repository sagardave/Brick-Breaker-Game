var mouseDown = 0;
var previousX = 0;
var previousY = 0;
var posx = 0;
var posy = 0;

var mouseMoveFunc;

document.body.onmousedown = function (e) {
    mouseDown = 1;
    getMousePosition(e);

    previousX = posx;
    previousY = posy;
};

document.body.onmouseup = function () {
    mouseDown = 0;
};

function getMousePosition(eventArgs) {
    var e;

    if (!eventArgs)
        e = window.event;
    else {
        e = eventArgs;
    }

    if (e.offsetX || e.offsetY) {
        posx = e.offsetX;
        posy = e.offsetY;
    }
    else if (e.clientX || e.clientY) {
        posx = e.clientX;
        posy = e.clientY;
    }

    if (e.preventDefault)
        e.preventDefault();
}

function onMouseMove(e) {
    if (!mouseDown)
        return;
    getMousePosition(e);

    mouseMoveFunc(posx, posy, previousX, previousY);

    previousX = posx;
    previousY = posy;
}

function registerMouseMove(elem, func) {
    elem.onmousemove = onMouseMove;

    mouseMoveFunc = func;
};


