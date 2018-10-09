//generate rects from som
//x and y are position of pixel


const fs = require('fs');
const newFilename = process.argv[2];

const getPixels = require("get-pixels");
//const getPixels = require("get-pixels");

const som = "colors-ssm-ordered_small.png";

function workWithPixels(err, pixels){
  var err = err;
  if (err){
    console.log(err);
  } else {
    //console.log(pixels.data.slice().length);
    var img_height = Math.sqrt(pixels.data.slice().length/4);
    var img_width = Math.sqrt(pixels.data.slice().length/4);
    //console.log( "img_width", img_width, " img_height", img_height);
    var color_array = [];
    for (var y = 0; y < img_height; y++){
      var color_array_x = [];
      for (var x = 0; x < img_width; x++){
        color = [];
        for (var z = 0; z < 4; z++){//rgba
          color.push(pixels.get(x, y, z));
        }
        color_array_x.push(color);
      }
      color_array.push(color_array_x);
    }
    //console.log(color_array.length);
    //console.log(color_array);
    

    var fileString = generateFileStringColor(color_array);
    console.log(fileString);

    fs.writeFile(newFilename, fileString , (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  }
}

getPixels(som, function(err, pixels){workWithPixels(err, pixels)});


//fileString = generateFileStringColor();

//fs.writeFile(newFilename, fileString , (err) => {
//  if (err) throw err;
//  console.log('The file has been saved!');
//});

function generateFileStringColor(color_arr){
  console.log("generating filestring");
  var str = "id,x,y,weight,class,red,green,blue\n";
  var rects = generateRects(color_arr);

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

function getRandomLength(minLength, maxLength){
  //var maxLength = 300;
  //var minLength = 30;f
  return Math.floor(Math.random() * (maxLength - minLength)) + minLength;
}

function generateRects(color_arr){

  var rects = [];
  var numberOfRects = color_arr.length * color_arr[0].length;
  console.log("color_arr.length and color_arr[0].length: ", color_arr.length , " ",color_arr[0].length);
  var width = color_arr[0].length;
  var height = color_arr.length;
  for(var y = 0; y < height; y++){

    for(var x = 0; x < width; x++){
      
      var col = color_arr[y][x];

      var rect_width = getRandomLength(30, 300);
      var rect_height = getRandomLength(30, 300);
      
      var rect = {
        id : y+x,
        x:  x*50 + Math.random(),
        y:  y*50 + Math.random(),
        weight: rect_width*rect_height + Math.random(),
        klass : ((col[0]+col[1]+col[2])/3)/255,
        width: rect_width,
        height: rect_height,
        color: col
      };
      rects.push(rect);
    }

    
  }
  return rects;
}

/*
function generateRects(numberOfRects){
  var rects = [];
  for(var i = 0; i < numberOfRects; i++){
    var col = getRandomRGB();
    var width = getRandomLength(30, 300);
    var height = getRandomLength(30, 300);
    
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
*/

//function generateRects(numberOfRects){
//  var rects = [];
//  for(var i = 0; i < numberOfRects; i++){
//    var col = getRandomHSL();
//    
//    var rect = {
//      width : getRandomLength(30, 300),
//      height: getRandomLength(30, 300),
//      hue   : col[0],
//      sat   : col[1],
//      light : col[2],
//      x     : 0,
//      y     : 0
//    };
//    
//    
//    rects.push(rect);
//  }
//  
//  return rects;
//}

function getRandomRGB(){
  var red = Math.floor(Math.random() * 255);
  var green = Math.floor(Math.random() * 255);
  var blue = Math.floor(Math.random() * 255);
  return [red, green, blue];
}