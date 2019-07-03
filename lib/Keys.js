var cnv;

const WIDTH = 100;
const HEIGHT = 300;

KEYS = 8
var keys = Array(KEYS).fill(0);

function preload() {
    for (var i = 0; i < keys.length; i++) {
        keys[i] = loadSound(`assets/sounds/key_${i}.wav`);
    }
}


function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
}


function setup() {
    cnv = createCanvas(801, 301); // keep borders (1 pixel padding)
    cnv.parent('piano-holder');
    centerCanvas();

}

function windowResized() {
    centerCanvas();
}

function draw() {
    background(51);
    currentKey = getClickedKey(mouseX)
    drawKeys(currentKey);
    ellipse(mouseX, mouseY, 22, 22);
}

function drawKeys(flash) {
    for (var i = 0; i < keys.length; i++) {
        var x = i * WIDTH;
        var y = 0;
        if (flash == i) {
            fill("#FF0000");

        } else {
            fill("#FFFFFF");
        }
        rect(x, y, WIDTH, HEIGHT);
    }
}

function mousePressed() {

    var key = getClickedKey(mouseX);

    if (key == -1) {
        return;
    } else {
        sound = keys[key]
        console.log(mouseX, mouseY, sound)
        drawKeys(key)
        if (sound.isPlaying()) {
            sound.stop();
            sound.play();
        } else {
            sound.play();
        }
    }
}

function getClickedKey(mX) {
    if (mouseY >= 0 && mouseY <= HEIGHT) {
        for (var i = 0; i < KEYS; i++) {
            var lowerBound = i * WIDTH;
            var upperBound = (i + 1) * WIDTH;
            if (mX >= lowerBound && mX <= upperBound) {
                return i;
            }
        }
        return -1;
    }
    return -1;
}
