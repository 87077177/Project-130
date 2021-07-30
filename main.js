song1 = "";
song2 = "";
leftwristX = 0;
rightwristX = 0;
leftwristY = 0;
rightwristY = 0;
scorerightwrist = 0;
scoreleftwrist = 0;
song1status = "";
song2status = "";
console.log(scoreleftwrist);

function preload() {
    song1 = loadSound("Hyrule_Castle.mp3")
    song2 = loadSound("The_Deadwood_Stage.mp3")
}
function setup() {
    canvas = createCanvas(600, 500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    posenet = ml5.poseNet(video, modelloaded)
    posenet.on('pose', gotposes)
}

function draw() {
    image(video, 0, 0, 600, 500)
    song1status = song1.isPlaying()
    song2status = song2.isPlaying()
    fill('red');
    stroke('yellow');
    if (scorerightwrist > 0.2) {
        circle(rightwristX, rightwristY, 20);
        song2.stop()
        if(song1status == false){
            song1.play();
            document.getElementById("botw").innerHTML = "Playing Hyrule Castle theme"
        }
    }
    if (scoreleftwrist > 0.2) {
        circle(leftwristX, leftwristY, 20);
        song1.stop()
        if(song2status == false){
            song2.play();
            document.getElementById("fly").innerHTML = "Playing Fly me to the moon"
        }
    }

}


function modelloaded() {
    console.log("model is loaded")
}

function gotposes(results) {
    if (results.length > 0) {
        console.log(results);
        leftwristX = results[0].pose.leftWrist.x
        leftwristY = results[0].pose.leftWrist.y
        rightwristX = results[0].pose.rightWrist.x
        rightwristY = results[0].pose.rightWrist.y
        scorerightwrist = results[0].pose.keypoints[10].score;
        scoreleftwrist = results[0].pose.keypoints[9].score;
    }
}