song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;


function setup(){
    canvas = createCanvas(440, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded(){
    console.log("poseNet is initialized");
}

function gotPoses(results){
    if(results.length > 0){
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Left Wrist X ="+ leftWristX +"Left Wrist Y ="+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Left Wrist X ="+ rightWristX +"Left Wrist Y ="+ rightWristY);
    }
}

function preload(){
   song1 = loadSound("music.mp3");
   song2 = loadSound("music2.mp3");
}

function draw(){
    image(video, 0, 0, 600, 500);

    song1_stat = song1.isPlaying();
    song2_stat = song2.isPlaying();

    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song2.stop();

        if(song1_stat == false){
            song1.play();
            document.getElementById("song").innerHTML = "Song Name: Harry  Potter Theme";
        }
    }

    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        song1.stop();

        if(song2_stat == false){
            song2.play();
            document.getElementById("song").innerHTML = "Song Name: Peter Pan Theme";
        }
    }


    stroke("black");
    fill("red");

}