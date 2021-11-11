song = "";
song1="";
leftWristX = 0;
leftWristY = 0;
rightWristX =0;
rightWristY = 0;
scoreLeftWrist = 0;
song1_status = "";

function preload() {
 song = loadSound("music.mp3");
 song1 = loadSound("music2.mp3");
}

function setup() {
canvas = createCanvas(600 , 500);
canvas.center();

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video , modelLoaded);
poseNet.on('pose' , gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized!')
}

function gotPoses(results) {
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+ rightWristX + "rightWristY = " + rightWristY);
    }
}

function draw() {
    image(video , 0 , 0 , 600 , 500);

    song1_status = song1.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX , leftWristY , 20);
        song.stop();

        if(song1_status == false)
        {
            console.log("Song 1 is playing!");
            song1.play();
            document.getElementById("song_name").innerHTML = "Peter Pan song"
        }

    }

}

function play() {
    song.play();
}