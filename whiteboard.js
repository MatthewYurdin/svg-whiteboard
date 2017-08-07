// Whiteboard-style SVG illustrations

// module
// -export: svg_wrapper, html_wrapper, draw_text, draw_line, draw_polygon, draw_circle

var whiteboard = (function() {
  'use strict';
  //whiteboard settings:
  //  -jitter controls uniformity of text characters
  //  -marker_thickness controls stroke-width
  //  -colors is the list of available colors
  var settings = {jitter: 1.5, marker_thickness: 4.0, colors: {"Black":"#000","Blue":"#1F75FE","Red":"#FF496C","Green":"#3D9979", "Orange":"#ffa700","Purple":"#7851A9"}};
  settings.Hand = {"Data":{"0":null,"33":["5","2","15","l -5 20 m -2 6 c 3 -3, 3 3, 0 0"],"34":["-3","0","9","l -2 8 m 6 -8 l -1 6"],"36":["18","7","10","c -18 -7, -18 8, -6 10 c 8 2, 8 23, -9 13 m 4 7 l 4 -36"],"38":["12","30","15","c -30 -40 22 -40 -12 -8 c -4 6 8 10 16 -4"],"39":["-2","0","7","l -1 8"],"40":["5","0","8","c -5 10, -5 20, 2 30"],"41":["0","0","8","c 5 10, 8 22, -1 31"],"43":["10","26","15","l 3 -16 m -8 10 c 3 -1, 6 -3, 12 -2 "],"44":["-2","28","7","l -2 8"],"45":["-4","15","19","l 11 -1"],"46":["-5","30","10","c 3 -3, 3 3, 0 0"],"47":["2","30","22","l 16 -24"],"48":["0","19","25","c 0 -24, 20 -24, 15 0  c  0 13, -15 13, -15 0 m 1 11 l 15 -29"],"49":["0","30","15","l 4 -29"],"50":["4","6","25","c 16 -16, 16 6, -3 24 c 5 -5, 15 -7, 21 -3"],"51":["4","4","25","l 13 -2 l -13 10 c 20 -4, 16 23, -4 15"],"52":["2","3","25","q -12 22, 13 12 m 0 -12 l -4 27"],"53":["17","2","17","l -12 1 l -3 9 c 28 -12, 15 39, -1 15"],"54":["15","2","17","c -25 17, -15 27, -13 27 c 21 5, 23 -20, -4 -8"],"55":["2","3","20","l 18 -2 c -10 5, -14 13, -19 29 m 1 -16 l 12 -2"],"56":["17","1","13","c 23 -1, -27 24, -7 29 c 20 -10, -20 -30, 7 -29"],"57":["12","30","13","l 2 -25 c -9 30, -19 -5, 3 -5"],"58":["-5","25","10","c 3 -3, 3 3, 0 0 m 2 -12 c 3 -3, 3 3, 0 0"],"63":["0","10","15","c 0 -20, 20 -10, 0 12 m 0 6 c 3 -3, 3 3, 0 0"],"64":["12","21","10","l -4 -13 c 4 16 -12 16 -1 -1 m 5 14 c -30 20 -10 -55  3 -2 "],"65":["0","30","25","l 4 -20 c 3 -10, 5 -10, 7 0 c 2 20, 2 26, 4 21 m -2 -16 l -10 3"],"66":["0","27","30","l 4 -24  a 8 6 180 1 1 2 12 a 10 8 190 1 1 -6 12"],"67":["13","5","15","c -19 -5, -19 35, 4 17"],"68":["4","4","25","l -4 26 c 21 -5, 28 -18, 2 -29"],"69":["4","6","20","q -9 27, -4 24, 4 2, 15 -2 m -11 -22 l 13 -2 m -17 15 l 13 -2"],"70":["0","30","20","l 4 -26 m -2 3 l 13 -4 m -15 16 l 13 -2"],"71":["13","5","15","c -6 -2, -13 9, -10 22 c 5 2, 12 2, 14 -6 c -1 -2, -3 -3, -4 -1"],"72":["0","30","25","l 4 -26 m 9  27 l 4 -26 m -17 10 l 17 0"],"73":["0","30","15","l 4 -26"],"74":["2","18","25","c 0 22, 18 12, 9 -16 m -9 4 l 16 -3"],"75":["0","30","25","l 4 -26 m 14 0 c -2 2, -12 16, -14 13 l 4 12"],"76":["4","3","20","q -9 30, -4 27, 4 2, 15 -2"],"77":["0","30","25","l 4 -27 q 5 22, 10 0 l 3 27"],"78":["0","30","25","l 4 -26 c 5 30, 8 25, 13 -3"],"79":["0","19","25","c 0 -24, 20 -24, 15 0 c 0 13, -15 13, -15 0"],"80":["0","30","25","l 4 -20 a 10 5 140 1 1 -1 7"],"81":["0","19","25","c 0 -24, 20 -24, 17 0 c 0 13, -15 13, -17 0 m 9 -3 c 5 4, 11 14, 9 11"],"82":["0","30","25","l 3 -15 c 3 -35, 32 -10, 0 0 c 7 -5, 10 10, 10 15"],"83":["18","7","10","c -18 -7, -18 8, -6 10 c 8 2, 8 23, -9 13"],"84":["5","30","20","l 4 -24 m -9 1 l 18 -3"],"85":["1","2","25","c 0 33, 11 33, 19 0 l -3 28"],"86":["1","2","25","c 3 0, 5 18, 7 28 c 6 -10, 9 -30, 11 -30"],"87":["0","2","25","c 1 33, 2 33, 7 16 c 3 17, 6 17, 11 -16"],"88":["0","2","25","c 5 3, 10 12, 16 28 m -14 0 l 14 -29"],"89":["2","3","20","c 0 15, 10 15, 10 2 l -2 23 c 0 2, -6 2, -7 -3"],"90":["4","4","30","c 16 -4, 21 2, 5 12 c -9 9, -9 14, 17 9"],"97":["0","31","25","l 2 -10 c 1.5 -5, 2.5 -5, 3.5 0 c 1 10, 1 13, 2 10.5 m -1 -8 l -5 1.5 "],"98":["0","29","20","l 2 -12  a 4 3 180 1 1 1 6  a 5 4 190 1 1 -3 6 "],"99":["13","20","18","c -9.5 -2.5, -9.5 17.5, 2 8.5 "],"100":["4","20","25","l -2 13 c 10.5 -2.5, 14 -9, 1 -14.5 "],"101":["4","16","20","q -4.5 13.5, -2 12, 2 1, 7.5 -1 m -5.5 -11 l 6.5 -1 m -8.5 7.5 l 6.5 -1 "],"102":["0","31","20","l 2 -13 m -1 1.5 l 6.5 -2 m -7.5 8 l 6.5 -1 "],"103":["13","20","15","c -3 -1, -6.5 4.5, -5 11 c 2.5 1, 6 1, 7 -3 c -0.5 -1, -1.5 -1.5, -2 -0.5 "],"104":["0","31","25","l 2 -13 m 4.5  13.5 l 2 -13 m -8.5 5 l 8.5 0 "],"105":["0","31","15","l 2 -13 "],"106":["2","24","25","c 0 11, 9 6, 4.5 -8 m -4.5 2 l 8 -1.5 "],"107":["0","31","25","l 2 -13 m 7 0 c -1 1, -6 8, -7 6.5 l 2 6 "],"108":["4","17","20","q -4.5 15, -2 13.5, 2 1, 7.5 -1 "],"109":["0","31","25","l 2 -13.5 q 2.5 11, 5 0 l 1.5 13.5 "],"110":["0","31","25","l 2 -13 c 2.5 15, 4 12.5, 6.5 -1.5 "],"111":["0","25","25","c 0 -12, 10 -12, 7.5 0  c  0 6.5, -7.5 6.5, -7.5 0 "],"112":["0","31","25","l 2 -10 a 5 2.5 140 1 1 -0.5 3.5 "],"113":["0","25","25","c 0 -12, 10 -12, 8.5 0 c 0 6.5, -7.5 6.5, -8.5 0 m 4.5 -1.5 c 2.5 2, 5.5 7, 4.5 5.5 "],"114":["0","31","25","l 1.5 -7.5 c 1.5 -17.5, 16 -5, 0 0 c 3.5 -2.5, 5 5, 5 7.5 "],"115":["18","18","10","c -9 -3.5, -9 4, -3 5 c 4 1, 4 11.5, -4.5 6.5 "],"116":["5","31","20","l 2 -12 m -4.5 0.5 l 9 -1.5 "],"117":["1","18","25","c 0 16.5, 5.5 16.5, 9.5 0 l -1.5 14 "],"118":["1","18","25","c 1.5 0, 2.5 9, 3.5 14 c 3 -5, 4.5 -15, 5.5 -15 "],"119":["0","18","25","c 0.5 16.5, 1 16.5, 3.5 8 c 1.5 8.5, 3 8.5, 5.5 -8 "],"120":["0","18","25","c 2.5 1.5, 5 6, 8 14 m -7 0 l 7 -14.5 "],"121":["2","19","20","c 0 7.5, 5 7.5, 5 1 l -1 11.5 c 0 1, -3 1, -3.5 -1.5 "],"122":["4","22","30","c 8 -2, 10.5 1, 2.5 6 c -4.5 4.5, -4.5 7, 8.5 4.5 "]}};
  
  
  //private functions
  var empty_svg = function(width = 1000, height = 700, color = "Blue", title = "A Whiteboard SVG Illustration"){
      return "<svg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:html='http://www.w3.org/1999/xhtml' width='100%' height='100%' viewBox='0,0," + width + "," + height + "' preserveAspectRatio='xMinYMin meet'><defs><title>" + title + "</title></defs><g id='standard-attributes' stroke:'" + settings.colors[color] + "' stroke-width='" + settings.marker_thickness + "' stroke-linecap='round' fill='none'>\n\n" + "<!-- Here's where your SVG elements go -->\n\n</g></svg>";
  };
  
  var string_to_handwriting = function(x, y, text){
    
    let pathPointerX = x;
    let pathPointerY = y;
    let d = "";
    let charCode = 0;
	
	  pathPointerX += ((Math.random()*(settings.jitter*2))-settings.jitter);
	  pathPointerY += ((Math.random()*(settings.jitter*2))-settings.jitter);
	
	  for (var i = 0; i < text.length; i++ ) {
		  charCode=text.charCodeAt(i);
		  if (charCode == 32) {
			  pathPointerX += 25; // moves the pointer 25 pixels right if character i is space
		  } else {
			  pathPointerX += parseInt(settings.Hand.Data[charCode][0]);
			  pathPointerY = y + parseInt(settings.Hand.Data[charCode][1]);
			  d += " M" + " " + pathPointerX.toFixed(2) + " " + pathPointerY.toFixed(2) + " " + settings.Hand.Data[charCode][3];
			  pathPointerX += parseInt(settings.Hand.Data[charCode][2]);
		  }
	  }
	  return "<path d='" + jitter_handwriting(d) + "'/>";
  };
  
  function remove(arr, what) {
    let found = arr.indexOf(what);
    while (found !== -1) {
      arr.splice(found, 1);
      found = arr.indexOf(what);
    }
  }
    
  var jitter_handwriting = function(uniform){
    
    let result_jitterPathString = "";
    let command = "";
    let commands = uniform.split(" ");
    let commandIndex = 0;
    remove(commands,"");
    for (var c = 0; c < commands.length; c++){
      if (commands[c]==="" || commands[c]==" ") {
        console.log("okay so far");
      }
      if ("zmlacqM".indexOf(commands[c]) > 0) {
        command = commands[c];
        commandIndex = c;
        result_jitterPathString += commands[c] + " ";
      }
      else {
        var lastPiece = commands[c].charAt((commands[c].length) - 1);
        var firstPiece = (lastPiece == ",") ? Number(commands[c].substr(0,commands[c].length-1)) : Number(commands[c]);
        switch (command) {
          case 'a':
            result_jitterPathString += (((c - commandIndex) < 4) || ((c - commandIndex) > 5)) ?  (firstPiece + ((Math.random()*(settings.jitter*2))-settings.jitter)).toFixed(2) : commands[c];
          break;
          case ('c'):
            result_jitterPathString +=  (firstPiece + ((Math.random()*(settings.jitter*2))-settings.jitter)).toFixed(2);
          break;
          case ('q'):
            result_jitterPathString +=  (firstPiece + ((Math.random()*(settings.jitter*2))-settings.jitter)).toFixed(2);
          break;
          default:
            result_jitterPathString += (firstPiece + ((Math.random()*(settings.jitter*2))-settings.jitter)).toFixed(2);
          break;
        }
      }
      result_jitterPathString += (lastPiece == ",") ? ", " : " ";
    }
    return result_jitterPathString;
  };
  
  var control_point = function(startX, startY, endX, endY){
    const trans=Math.floor(Math.random()*2);
	  let transX = startX + ((endX - startX)*(trans/3));
	  let transY = startY + ((endY - startY)*(trans/3));
	  const dist = Math.sqrt(((endX - startX)*(endX - startX))+((endY - startY)*(endY - startY)));
	  const maxAdjust = Math.log(dist * dist);
	  if ((Math.abs(endX - startX)) > (Math.abs(endY - startY)))
		  transY += ((maxAdjust/2) - (Math.floor(Math.random()*maxAdjust)));
	  else {
		  transX += ((maxAdjust/2) - (Math.floor(Math.random()*maxAdjust)));
	  }
	  return transX.toFixed(2) + " " + transY.toFixed(2);
  }
  
  //public functions
  return {
    
    svg_wrapper: function(width, height, color, title){
      return empty_svg(width, height, color, title);
    },
  
    html_wrapper: function(width, height, color, title = "A Whiteboard SVG Illustration"){
      return "<html><head><title>" + title + "</title></head><body><center>" + empty_svg(width, height, color, title) + "</center></body></html>";
    },
  
    draw_line: function(startX, startY, endX, endY){
      return "<path d='M" + startX + "," + startY + " C" + control_point(startX, startY, endX, endY) + " " + control_point(startX, startY, endX, endY) + " " + endX + " " + endY + "'/>";
    },
  
    draw_polygon: function(coordinates){
      let coordPairs = [];
      for (let i = 0; i < coordinates.length; i++){
        let pair = (i < (coordinates.length - 1)) ? [coordinates[i][0], coordinates[i][1], coordinates[i+1][0], coordinates[i+1][1]] : [coordinates[i][0], coordinates[i][1], coordinates[0][0], coordinates[0][1]];
        coordPairs.push(pair);
      }
      return "<path d='M" + coordinates[0].join(",") + " " + coordPairs.map(p => "C" + control_point(p[0], p[1], p[2], p[3]) + " " + control_point(p[0], p[1], p[2], p[3]) + " " + p[2] + " " + p[3] + " ") + "'/>";
    },
  
    draw_circle: function(cx, cy, r){
      const circles = [[-0.6, -0.6, -0.325,-1.15,0.65,-1.375,0.925,-0.7,2.05,2.15,-2.75,1.2,-0.45,-0.925],
				  [-0.88,-0.5,-0.08,-1.92,1.84,0.2,0.46,0.88,-0.64,1.44,-1.2,0.08,-0.8,-0.62],
				  [-0.76,-0.62,0.48,-2.1,2,0.96,0.08,0.96,-0.48,0.96,-0.7,0.66,-0.94,0.2,-1.14,-0.24,-0.8,-0.58,-0.64,-0.78],
				  [-0.88,-0.46,0.16,-1.46,1.82,-0.28,0.6,0.78,-0.46,1.7,-1.26,0.16,-0.82,-0.54],
				  [-0.66,-0.68,-0.48,-0.86,-0.08,-0.94,0.2,-0.86,1.26,-0.54,1.2,0.68,0.06,0.94,-0.96,1.18,-1.26,-0.4,-0.54,-0.74],
				  [-0.72,-0.56,-0.56,-0.74,-0.16,-1,0.12,-0.92,1.02,-0.62,1.32,0.64,0.1,0.96,-0.82,1.18,-1.24,-0.2,-0.58,-0.66]];
	    const factors = circles[Math.floor(Math.random()*6)];
	    let pathString = "<path d='M" + (cx+(r*factors[0])) + " " + (cy+(r*factors[1])) + " " + "C";
	    for (var i=2; i < factors.length; i++ ) {
		    if (i % 2 === 0) {
			    pathString += (cx+(r*factors[i])).toFixed(2) + " ";
		    } else {
			    pathString += (cy+(r*factors[i])).toFixed(2) + " ";
		    }
	    }
	    return pathString + "' transform='rotate(" + Math.floor(Math.random()*180) + " " + cx + " " + cy + ")'/>";
    },
  
    draw_text: function(x, y, text){
      return string_to_handwriting(x, y, text);
    }
  
  };
  
}());