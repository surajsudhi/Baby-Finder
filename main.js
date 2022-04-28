song = "";
statuss = ""
objects = [];

function preload(){
song = loadSound("iphone.mp3");     
}

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380);
    ObjectDetection = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = " Status: Detecting objects";
}

function modelLoaded(){
console.log("Model loaded");
statuss = true;
}

function gotResult(error,results){
if(error){
console.log(error);    
}
else{
console.log(results);
objects = results;
}    
}

function draw(){
image(video, 0, 0, 380, 380);

if(statuss != ""){
ObjectDetection.detect(video, gotResult);   

for(i=0; i<objects.length; i++){
document.getElementById("status").innerHTML = "Status : Object Detected";
 
fill("yellow");
percent = floor(objects[i].confidence * 100);
text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
noFill();
stroke("yellow");
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

if(objects[i].label == "person"){
document.getElementById("number_of_objects").innerHTML = "Baby Found";
console.log("stop")
song.stop();    
}
else{
document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
console.log("start")
song.play();    
}
}
if(objects.length == 0){
document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
console.log("play"); 
song.play();   
}
}
}