const fs = require('fs');
const newFilename = process.argv[2];

fileString = generateFileStringColor();

fs.writeFile(newFilename, fileString , (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});

function generateFileStringColor(){
  console.log("generating filestring");
  str = "id,x,y,weight,class,red,green,blue\n";
  rects = generateRects2(150);
  rects.forEach((rect)=>{
    tmpStr = rect["id"] 
      + "," + rect["x"] 
      + "," + rect["y"] 
      + "," + rect["weight"] 
      + "," + rect["klass"]
      + "," + rect["color"]
      + "\n" ;
    str = str.concat(tmpStr);
  });
  return str;
};

function generateFileString2(){
  console.log("generating filestring");
  str = "id,x,y,weight,class\n";
  rects = generateRects2(50);
  rects.forEach((rect)=>{
    tmpStr = rect["id"] 
      + "," + rect["x"] 
      + "," + rect["y"] 
      + "," + rect["weight"] 
      + "," + rect["klass"]
      + "\n" ;
    str = str.concat(tmpStr);
  });
  return str;
};

function generateFileString(){
  console.log("generating filestring");
  str = "width,height,hue,sat,light,x,y\n";
  rects = generateRects(50);
  rects.forEach((rect)=>{
    tmpStr = rect["width"] 
      + "," + rect["height"] 
      + "," + rect["hue"] 
      + "," + rect["sat"] 
      + "," + rect["light"] 
      + "," + rect["x"]
      + "," + rect["y"]
      + "\n" ;
    str = str.concat(tmpStr);
  });
  return str;
};

function getRandomHSL(){
  var hue = Math.floor(Math.random() * 360);
  var sat = Math.floor(Math.random() * 100);
  var light = Math.floor(Math.random() * 100);
  return [hue, sat, light];
}

function getRandomRGB(){
  var red = Math.floor(Math.random() * 255);
  var green = Math.floor(Math.random() * 255);
  var blue = Math.floor(Math.random() * 255);
  return [red, green, blue];
}

function getRandomLength(){
  var maxLength = 300;
  var minLength = 30;
  return Math.floor(Math.random() * (maxLength - minLength)) + minLength;
}

/*
rect = {
 width: 33;
 height: 50;
 hue: 340;
 sat: 50;
 light: 80;
 x: 0;
 y: 0;
}
*/
function generateRects(numberOfRects){
  var rects = [];
  for(var i = 0; i < numberOfRects; i++){
    var col = getRandomHSL();
    
    var rect = {
      width : getRandomLength(),
      height: getRandomLength(),
      hue   : col[0],
      sat   : col[1],
      light : col[2],
      x     : 0,
      y     : 0
    };
    
    
    rects.push(rect);
  }
  
  return rects;
}

function generateRects2(numberOfRects){
  var rects = [];
  for(var i = 0; i < numberOfRects; i++){
    var col = getRandomRGB();
    var width = getRandomLength();
    var height = getRandomLength();
    
    var rect = {
      id : i,
      x:   col[0],
      y:   col[1],
      weight: width*height,
      klass : ((col[0]+col[1]+col[2])/3)/255,
      width: width,
      height: height,
      color: col
    };
    
    
    rects.push(rect);
  }
  
  return rects;
}
