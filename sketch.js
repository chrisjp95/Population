var nations;
var myFont;
//var secondFont;

var inputRange = 0;
var inputMouse = 0;
  //setting the variables for the inputs of the mouse

var colors = [];
var legend;
var instructions;
var title;


function preload(){
   
   nations = loadJSON("nationData.json");
   //myFont = loadFont("TCM_____.ttf");
   legend = loadImage("assets/legend.png");
   instructions = loadImage("assets/arrows00001.png");
   title = loadImage("assets/title.png");
}

function setup() {
 
 colors = [color(0,118,168),color(100,167,11),color(140,71,153),color(0,176,185),color(0,0,0),color(255,156,0)];
 createCanvas(1500,1000);
 angleMode(DEGREES);
  inputRange = width/2
    //this specifies the input of the range at 750
}


function draw() {
   
   background(50);
   noStroke();
   
   textSize(35);
   fill('white');
   
   push();
   translate(80,500);
   rotate(-90);
   text("Life Expectancy",0,0);
   pop();
   
   //Legend
   image(legend,1250,100);
   //Mouse Instructions
   image(instructions, 1025,850);
   
   image(title, 600,10);
  
   
   text("Income",600,850);
   
   //textFont(myFont);
   
    inputMouse = constrain(mouseX,width/2,width) - width/2;
      //this constrains the mouse from moving on the xpos from 750 - 1500
   
   textSize(150);
   textAlign(CENTER);
   stroke('black');
   fill('white');
   text(floor(map(inputMouse,0,width/2,1800,2009)),width* 0.8,height* 0.8);
    //this is to floor and map the mouseScrub to the range of years, and showsthe text on screen
    
    
   textSize(20);
   
   stroke('white');
   textAlign(CENTER);
   fill('white');
   
      
   for(var i = 0;i < 162;i++){
      var tempY = dataReturn(i,"lifeExpectancy",height-20,0,inputMouse,inputRange);
      var tempX = dataReturn(i,"income",150,800,inputMouse,inputRange);
      dataEllipse(tempX,tempY,i,"population",15,25,inputMouse,inputRange);
      //this accesess the information from the created function, and looks as follows
      //dataEllipse(xpos, ypos, country#, "property", min circle size, max circle size, and the mapping to where the mouse starts and the range);
   
   }
   
   fill('white');
   line(100,50,100,800);
   line(100,800,1000,800);
   stroke('white');
   //draw the horizontal tick marks, set i equal to the start, and the i+= to the spacing
   for(var i = 150; i < 1000; i+=50){
     
      line(i,750,i,800);
      
      //map the i value to an actual income
      var incomeNumber = round(map(i,150,1000,0,100));
      push();
      translate(i-5,775);
      rotate(-90);
      text(incomeNumber + " K",0,0);
      pop();
      
      
   }
   //draw the verticle tick marks, set i equal to the start, and the i+= to the spacing
   for(var j = 0;j<800;j+=50){
     
      line(100,j,150,j);
      
      //map the i value to an actual income
      var lifeExpectancy = round(map(j,5,800,95,0));
      push();
      translate(135,j-5);
      rotate(0);
      text(lifeExpectancy + " Yrs",0,0);
      pop();
   }
   
}

function dataEllipse(xpos,ypos,nationNumber,property,minSize,maxSize,inputPos,inputMax){
  
  var category = "nations[" + nationNumber + "]." + property;
    //this is to create a shortcut access using concatenating (+) to add together strings and characters
    
  var inputPropLength = eval(category + ".length -1");
    //this is accessing the total number of arrays within the property
    
  var inputProp = map(inputPos,0,inputMax,0,inputPropLength);
    inputProp = floor(inputProp);
    inputProp = constrain(inputProp,0,inputPropLength);
      //taking the value of x and mapping it to the population number
  
  var propName = "region";
  var region = eval("nations[" + nationNumber + "]." + propName);
  
  switch(region){
    case "America":
      fill(colors[0]);
    break;
      
    case "Europe & Central Asia":
      fill(colors[1]);
    break;
    
    case "Sub-Saharan Africa":
      fill(colors[2]);
    break;
    
    case "Middle East & North Africa":
      fill(colors[3]);
    break;
    
    case "East Asia & Pacific":
      fill(colors[4]);
    break;
    
    case "South Asia":
      fill(colors[5]);
    break;
    
    default:
      fill(255);
    break;
  }
  
    
  var visualizeProp = eval(category + "[inputProp][1]");
  
    visualizeProp = map(visualizeProp,0,140000000,minSize,maxSize);
    
      ellipse(xpos,ypos,visualizeProp,visualizeProp);
      
      fill(0);
      //text(eval(category + "[inputProp][1]"),xpos,ypos);
      
}

function dataReturn(nationNumber,property,minRange,maxRange,inputPos,inputMax){
  
   
  var category = "nations[" + nationNumber + "]." + property;
    //this is to create a shortcut access using concatenating (+) to add together strings and characters
    
  var inputPropLength = eval(category + ".length -1");
    //this is accessing the total number of arrays within the property
    
  var inputProp = map(inputPos,0,inputMax,0,inputPropLength);
    inputProp = floor(inputProp);
    inputProp = constrain(inputProp,0,inputPropLength);
  
  //THis grabs the actual value out of the json table
  var visualizeProp = eval(category + "[inputProp][1]");
  
  var propertyMax = 0;
  
    if(property == "lifeExpectancy"){
      propertyMax = 90; 
      visualizeProp = map(visualizeProp,0,propertyMax,minRange,maxRange);
    }
    
    if(property == "income"){
      propertyMax = 100000;
      
      //calculate the total visual space for the income
      var totalRange = maxRange - minRange;
      var lowerTwoThirds = minRange + (totalRange * .66);
      
      
      if(visualizeProp < 20000){
        //spread out the income over the first two thirds
        visualizeProp = map(visualizeProp,0,20000,minRange,lowerTwoThirds);
      }
      if(visualizeProp > 20000){
      visualizeProp = map(visualizeProp,20000,propertyMax,lowerTwoThirds,maxRange);
      }
    }
  
    
    
        return visualizeProp;
}