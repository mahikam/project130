harrypotter="";
peterpan="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
left_score=0;
right_score=0;
peterSong_playing="";
harrySong_playing="";

function preload(){
    harrypotter=loadSound("harrypotter.mp3");
    peterpan=loadSound("peterpan.mp3");
}
function setup(){
    canvas= createCanvas(400,400);
    canvas.position(477,240);

    video= createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("Model Loaded");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log("Left Wrist X: "+leftWristX+" Left Wrist Y: "+leftWristY);
        console.log("Right Wrist X: "+rightWristX+" Right Wrist Y: "+rightWristY);
        left_score= results[0].pose.keypoints[9].score;
        right_score= results[0].pose.keypoints[10].score;
    }
}
function draw(){
    image(video,0,0,400,400);

    peterSong_playing= peterpan.isPlaying();
    harrySong_playing= harrypotter.isPlaying()

    fill("#cc588a");
    stroke("#cc588a");

    if(left_score>0.2){
        circle(leftWristX,leftWristY,20);
        harrypotter.stop();
        if(peterSong_playing==false){
            peterpan.play();
            document.getElementById("song_result").innerHTML="Peter Pan";
        }
    }
    else if(right_score>0.2){
        circle(rightWristX,rightWristY,20);
        peterpan.stop()
        if(harrySong_playing==false){
            harrypotter.play();
            document.getElementById("song_result").innerHTML="Harry Potter";
        }
    }
}