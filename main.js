function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('Mobilenet',molLoaded);
}

function molLoaded(){
  console.log('Model loaded!');
}

function draw(){
  image(video,0,0,300,300);
  classifier.classifier(video, gotResult);
}
var previous_result ='';

function gotResult(error, results){
  if (error) {
    console.log(results);
  }else {
    if(results[0].confidence > 0.5) && (previous_result != results[0].label) {
        console.log(results);
        previous_result = results[0].label;
        var syuth = window.speechSynthesis;
        speak_data = 'Obect detected is - '+results[0].label;
        var utterThis = new SpeechSynthesisUtterance(speak_data);
        syuth.speak(utterthis);

        document.getElementById("result_odject_name").innerHTML = results[0].label;
        document.getElementById("result_odject_accuracy").innerHTML = results[0].confidence.toFixed(3);

      }
  }
}