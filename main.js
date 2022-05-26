song="";
leftWristx="";
leftWristy="";
rightWristx="";
rightWristy="";
scoreleftwrist="";
scorerightwrist="";

function preload(){
    song=loadSound("music.mp3");
}
function setup(){
canvas=createCanvas(600,500)
canvas.center()
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPosess)
}
function gotPosess(results){
    if(results.length>0)
    {
        console.log(results);
        scorerightwrist=results[0].pose.keypoints[10].score;
        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log("scoreleftwristt="+scoreleftwrist+"scorerightwrist="+scorerightwrist);
        
        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
        console.log("leftWristx="+leftWristx+"leftWristy="+leftWristy);
        console.log("rightWristx="+rightWristx+"rightWristy="+rightWristy);
    }

}

function modelLoaded(){
    console.log("posenet is inzialized");
}
function draw(){
    image(video,0,0,600,500);
    fill("#FF0000")
    stroke("#FF0000")
    if(scorerightwrist>0.2){
        circle(rightWristx,rightWristy,20)
        if(rightWristy>0 && rightWristy<=100){
          document.getElementById("speed").innerHTML="speed=0.5x";
          song.rate(0.5);
        }
        else if(rightWristy>100 && rightWristy<=200){
        document.getElementById("speed").innerHTML="speed=1.0x";
        song.rate(1.0);
        }
        else if(rightWristy>200 && rightWristy<=300){
            document.getElementById("speed").innerHTML="speed=1.5x";
            song.rate(1.5);
        }
        else if (rightWristy>300 && rightWrist<=400){
            document.getElementById("speed").innerHTML="speed=2.0x";
            song.rate(2.0);
        }
        else if (rishtWristy>400 && rightWrist<=500){
            document.getElemntById("speed").innerHTML="speed=2.5x";
            song.rate(2.5);
        }
    }
   
    if(scoreleftwrist>0.2){
    circle(leftWristx,leftWristy,20);
    InnumberleftWristy=Number (leftWristy);
    remove_decimal=floor(InnumberleftWristy);
    leftWristy_divided_1000=remove_decimal/1000;
    volume=leftWristy_divided_1000*2;
    document.getElementById("volume").innerHTML="volume="+volume;
    song.setVolume(volume);

    }
}
function playbutton(){
    song.play();
    song.setVolume(1);
    song.rate(1);

}
