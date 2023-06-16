quick_draw_data_set=["aircraft carrier","airplane","alarm clock","ambulance","angel","flock of birds","ant","anvil","apple","arm","axe","backpack","banana","band-aid","baseball ball","bat","basket","basket ball","bat","bathtub","beach","bear","face","bed","bee","belt","park bench","bicycle","binoculars","bird","birthday cake","ball of yarn","tomato","book","boomerang","bun","bracelet","brain","bread","tree","broom","bucket","bus","bush","buterfly","backhoe","cactus","cake","calculator","calendar","camel","camera","shirt","bonfire","candle","Canyon","kayak","car","carrot","castle","cat","ceiling fan","fiddle","cellphone","chair","chandelier","church","circle","clock","cloud","coffe","compass","computer","cookie","couch","cow","crab","crayon","cocodrile","crown","cup","diamond","dog","dolphin","donut","door","dragon","drums","duck","dumbbells","ear","elefant","envelope","ereaser","eye","glasses","guy","fan","feather","fences","finger","fire hydrant","fire truck","fish","flamingo","flashlight","flip flops","flower","UFO","foot","fork","frog","frying pan","hose","giraff","golf club","grapes","grass","guitar","hamburger","hammer","hand","harp","hat","headphones","hedgehog","helicopter","hexagon","hockey stick","horse","hospital","hot dog","hourglass","hurrican","ice cream","jacket","kangaroo","key","keyboard","knee","knife","ladder"];

random_number = Math.floor((Math.random() * quick_draw_data_set.length)+1);
console.log(quick_draw_data_set[random_number]);
sketch = quick_draw_data_set[random_number];
document.getElementById('sketch_name').innerHTML = 'Dibujo a ser trazado: ' + sketch;

timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;

  function updateCanvas() {
    background("white");
    random_number = Math.floor((Math.random() * quick_draw_data_set));
    console.log(quick_draw_data_set[random_number]);
    sketch = quick_draw_data_set[random_number];
    document.getElementById('sketch_name').innerHTML = 'Dibujo a ser trazado: ';
  }

   function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
  }

  function setup() {
    canvas = createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
  }

  
  function draw() {
    check_sketch()
    if(drawn_sketch == sketch) {
      answer_holder = "set"
      score++;
      document.getElementById('score').innerHTML = "Puntuación: " + score;
    }

    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed) {
      line(pmouseX, pmouseY, mouseX, mouseY);
    }
  }
  
  function classifyCanvas() {
    classifier.classify(canvas, gotResult);
  }
  
  function gotResult(error, results) {
    if (error) {
      console.error(error);
    }
    console.log(results);
    document.getElementById('label').innerHTML = 'Tu dibujo: ' + drawn_sketch.label;
  
    document.getElementById('confidence').innerHTML = 'Confianza: ' + Math.round(results[0].confidence * 100) + '%';

  }
  
  function check_sketch() {
    timer_counter++;
    document.getElementById('time').innerHTML = 'Tiempo: ' + timer_counter;
    console.log(timer_counter);
    if(timer_counter > 400){
      timer_counter = 0;
      timer_check = "completado"
    }
    if(timer_check == "completado" || answer_holder == "set"){
      timer_check = "";
      answer_holder = "";
      updateCanvas();
    }
  }