// whiteboard-style SVG elements
// by Matt Yurdin (https://github.com/TripleDataArts)
// MIT License (2017)

// makes available:
//  - whiteboard.svg_wrapper()
//  - whiteboard.html_wrapper()
//  - whiteboard.draw_text()
//  - whiteboard.draw_line()
//  - whiteboard.draw_curve()
//  - whiteboard.draw_arrow()
//  - whiteboard.draw_polygon()
//  - whiteboard.draw_circle()
//  - whiteboard.draw_dot()
//  - whiteboard.settings()

var whiteboard = (function() {
  'use strict';
  
  // whiteboard settings:
  //  -JITTER controls uniformity of text characters
  //  -MARKER_THICKNESS controls stroke-width
  //  -COLORS is the list of available colors
  //  -HAND contains instructions for drawing characters of text in my handwriting

  const SETTINGS = {JITTER: 1.5, MARKER_THICKNESS: 4.0, COLORS: {"Black":"#000","Blue":"#1F75FE","Red":"#FF496C","Background":"#fff"}};
  SETTINGS.HAND = {"DATA":{"0":null,"33":["5","2","15","l -5 20 m -2 6 c 3 -3, 3 3, 0 0"],"34":["-3","0","9","l -2 8 m 6 -8 l -1 6"],"36":["18","7","10","c -18 -7, -18 8, -6 10 c 8 2, 8 23, -9 13 m 4 7 l 4 -36"],"38":["12","30","15","c -30 -40 22 -40 -12 -8 c -4 6 8 10 16 -4"],"39":["-2","0","7","l -1 8"],"40":["5","0","8","c -5 10, -5 20, 2 30"],"41":["0","0","8","c 5 10, 8 22, -1 31"],"43":["10","26","15","l 3 -16 m -8 10 c 3 -1, 6 -3, 12 -2 "],"44":["-2","28","7","l -2 8"],"45":["-4","15","19","l 11 -1"],"46":["-5","30","10","c 3 -3, 3 3, 0 0"],"47":["2","30","22","l 16 -24"],"48":["0","19","25","c 0 -24, 20 -24, 15 0  c  0 13, -15 13, -15 0 m 1 11 l 15 -29"],"49":["0","30","15","l 4 -29"],"50":["4","6","25","c 16 -16, 16 6, -3 24 c 5 -5, 15 -7, 21 -3"],"51":["4","4","25","l 13 -2 l -13 10 c 20 -4, 16 23, -4 15"],"52":["2","3","25","q -12 22, 13 12 m 0 -12 l -4 27"],"53":["17","2","17","l -12 1 l -3 9 c 28 -12, 15 39, -1 15"],"54":["15","2","17","c -25 17, -15 27, -13 27 c 21 5, 23 -20, -4 -8"],"55":["2","3","20","l 18 -2 c -10 5, -14 13, -19 29 m 1 -16 l 12 -2"],"56":["17","1","13","c 23 -1, -27 24, -7 29 c 20 -10, -20 -30, 7 -29"],"57":["12","30","13","l 2 -25 c -9 30, -19 -5, 3 -5"],"58":["-5","25","10","c 3 -3, 3 3, 0 0 m 2 -12 c 3 -3, 3 3, 0 0"],"63":["0","10","15","c 0 -20, 20 -10, 0 12 m 0 6 c 3 -3, 3 3, 0 0"],"64":["12","21","10","l -4 -13 c 4 16 -12 16 -1 -1 m 5 14 c -30 20 -10 -55  3 -2 "],"65":["0","30","25","l 4 -20 c 3 -10, 5 -10, 7 0 c 2 20, 2 26, 4 21 m -2 -16 l -10 3"],"66":["0","27","30","l 4 -24  a 8 6 180 1 1 2 12 a 10 8 190 1 1 -6 12"],"67":["13","5","15","c -19 -5, -19 35, 4 17"],"68":["4","4","25","l -4 26 c 21 -5, 28 -18, 2 -29"],"69":["4","6","20","q -9 27, -4 24, 4 2, 15 -2 m -11 -22 l 13 -2 m -17 15 l 13 -2"],"70":["0","30","20","l 4 -26 m -2 3 l 13 -4 m -15 16 l 13 -2"],"71":["13","5","15","c -6 -2, -13 9, -10 22 c 5 2, 12 2, 14 -6 c -1 -2, -3 -3, -4 -1"],"72":["0","30","25","l 4 -26 m 9  27 l 4 -26 m -17 10 l 17 0"],"73":["0","30","15","l 4 -26"],"74":["2","18","25","c 0 22, 18 12, 9 -16 m -9 4 l 16 -3"],"75":["0","30","25","l 4 -26 m 14 0 c -2 2, -12 16, -14 13 l 4 12"],"76":["4","3","20","q -9 30, -4 27, 4 2, 15 -2"],"77":["0","30","25","l 4 -27 q 5 22, 10 0 l 3 27"],"78":["0","30","25","l 4 -26 c 5 30, 8 25, 13 -3"],"79":["0","19","25","c 0 -24, 20 -24, 15 0 c 0 13, -15 13, -15 0"],"80":["0","30","25","l 4 -20 a 10 5 140 1 1 -1 7"],"81":["0","19","25","c 0 -24, 20 -24, 17 0 c 0 13, -15 13, -17 0 m 9 -3 c 5 4, 11 14, 9 11"],"82":["0","30","25","l 3 -15 c 3 -35, 32 -10, 0 0 c 7 -5, 10 10, 10 15"],"83":["18","7","10","c -18 -7, -18 8, -6 10 c 8 2, 8 23, -9 13"],"84":["5","30","20","l 4 -24 m -9 1 l 18 -3"],"85":["1","2","25","c 0 33, 11 33, 19 0 l -3 28"],"86":["1","2","25","c 3 0, 5 18, 7 28 c 6 -10, 9 -30, 11 -30"],"87":["0","2","25","c 1 33, 2 33, 7 16 c 3 17, 6 17, 11 -16"],"88":["0","2","25","c 5 3, 10 12, 16 28 m -14 0 l 14 -29"],"89":["2","3","20","c 0 15, 10 15, 10 2 l -2 23 c 0 2, -6 2, -7 -3"],"90":["4","4","30","c 16 -4, 21 2, 5 12 c -9 9, -9 14, 17 9"],"97":["0","31","25","l 2 -10 c 1.5 -5, 2.5 -5, 3.5 0 c 1 10, 1 13, 2 10.5 m -1 -8 l -5 1.5 "],"98":["0","29","20","l 2 -12  a 4 3 180 1 1 1 6  a 5 4 190 1 1 -3 6 "],"99":["13","20","18","c -9.5 -2.5, -9.5 17.5, 2 8.5 "],"100":["4","20","25","l -2 13 c 10.5 -2.5, 14 -9, 1 -14.5 "],"101":["4","16","20","q -4.5 13.5, -2 12, 2 1, 7.5 -1 m -5.5 -11 l 6.5 -1 m -8.5 7.5 l 6.5 -1 "],"102":["0","31","20","l 2 -13 m -1 1.5 l 6.5 -2 m -7.5 8 l 6.5 -1 "],"103":["13","20","15","c -3 -1, -6.5 4.5, -5 11 c 2.5 1, 6 1, 7 -3 c -0.5 -1, -1.5 -1.5, -2 -0.5 "],"104":["0","31","25","l 2 -13 m 4.5  13.5 l 2 -13 m -8.5 5 l 8.5 0 "],"105":["0","31","15","l 2 -13 "],"106":["2","24","25","c 0 11, 9 6, 4.5 -8 m -4.5 2 l 8 -1.5 "],"107":["0","31","25","l 2 -13 m 7 0 c -1 1, -6 8, -7 6.5 l 2 6 "],"108":["4","17","20","q -4.5 15, -2 13.5, 2 1, 7.5 -1 "],"109":["0","31","25","l 2 -13.5 q 2.5 11, 5 0 l 1.5 13.5 "],"110":["0","31","25","l 2 -13 c 2.5 15, 4 12.5, 6.5 -1.5 "],"111":["0","25","25","c 0 -12, 10 -12, 7.5 0  c  0 6.5, -7.5 6.5, -7.5 0 "],"112":["0","31","25","l 2 -10 a 5 2.5 140 1 1 -0.5 3.5 "],"113":["0","25","25","c 0 -12, 10 -12, 8.5 0 c 0 6.5, -7.5 6.5, -8.5 0 m 4.5 -1.5 c 2.5 2, 5.5 7, 4.5 5.5 "],"114":["0","31","25","l 1.5 -7.5 c 1.5 -17.5, 16 -5, 0 0 c 3.5 -2.5, 5 5, 5 7.5 "],"115":["18","18","10","c -9 -3.5, -9 4, -3 5 c 4 1, 4 11.5, -4.5 6.5 "],"116":["5","31","20","l 2 -12 m -4.5 0.5 l 9 -1.5 "],"117":["1","18","25","c 0 16.5, 5.5 16.5, 9.5 0 l -1.5 14 "],"118":["1","18","25","c 1.5 0, 2.5 9, 3.5 14 c 3 -5, 4.5 -15, 5.5 -15 "],"119":["0","18","25","c 0.5 16.5, 1 16.5, 3.5 8 c 1.5 8.5, 3 8.5, 5.5 -8 "],"120":["0","18","25","c 2.5 1.5, 5 6, 8 14 m -7 0 l 7 -14.5 "],"121":["2","19","20","c 0 7.5, 5 7.5, 5 1 l -1 11.5 c 0 1, -3 1, -3.5 -1.5 "],"122":["4","22","30","c 8 -2, 10.5 1, 2.5 6 c -4.5 4.5, -4.5 7, 8.5 4.5 "]}};
  
  function update_SETTINGS(k, v) {
     SETTINGS[k] = v;
     console.log("<!-- Settings updated..." + k + " = " + v + " -->");
   }

  // Element-generating functions
  
  var empty_svg = function(width = 1000, height = 700, color = "Blue", title = "A whiteboard.js SVG Illustration"){
      return "<svg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:html='http://www.w3.org/1999/xhtml' width='100%' height='100%' viewBox='0,0," + width + "," + height + "' preserveAspectRatio='xMinYMin meet'><defs><title>" + title + "</title></defs><g id='standard-attributes' stroke='" + SETTINGS.COLORS[color] + "' stroke-width='" + SETTINGS.MARKER_THICKNESS + "' stroke-linecap='round' fill='none'>\n\n" + "<!-- Here's where your SVG elements go -->\n\n</g></svg>";
  };

  var line = function(x1, y1, x2, y2, jitter1 = false, jitter2 = false){
    let jx1 = (jitter1) ? simple_jitter(x1) : x1;
    let jy1 = (jitter1) ? simple_jitter(y1) : y1;
    let jx2 = (jitter2) ? simple_jitter(x2) : x2;
    let jy2 = (jitter2) ? simple_jitter(y2) : y2;
    let d = point_to_point_distance(jx1, jy1, jx2, jy2);
    if (d < 12) {
      return "M" + jx1 + " " + jy1 + "L" + jx2 + " " + jy2;
    }
    else if (d < 35) {
      let c = control_point(jx1, jy1, jx2, jy2);
      return ("M" + jx1 + " " + jy1 + "Q" + c.x + " " + c.y + "," + jx2 + " " + jy2);
    }
    else {
      let c = control_points(jx1, jy1, jx2, jy2);
      return ("M" + jx1 + " " + jy1 + "C" + c.cp1.x + " " + c.cp1.y + "," + c.cp2.x + " " + c.cp2.y + "," + jx2 + " " + jy2);  
    }
  }

  var line_to_arrow = function(x1, y1, x2, y2){
    let obj = {};
    obj.start = {"x": x1, "y": y1};
    const d = point_to_point_distance(x1, y1, x2, y2);
    obj.tip = {"x": Math.ceil(x1 + d), "y": y1};
    if (d < 10) {
      obj.top = {"x": obj.tip.x - 5, "y": obj.start.y - 4};
      obj.bottom = {"x": obj.tip.x - 5, "y": obj.start.y + 4};
    }
    else if (d < 20) {
      obj.top = {"x": obj.tip.x - 10, "y": obj.tip.y - 6};
      obj.bottom = {"x": obj.tip.x - 10, "y": obj.tip.y + 6};
    }
    else {
      obj.top = {"x": obj.tip.x - 18, "y": obj.tip.y - 12};
      obj.bottom = {"x": obj.tip.x - 18, "y": obj.tip.y + 12};
    }
    obj.rotation = Math.ceil(angle_between_points(x2, y2, x1, y1)) ;
    return obj;
  }

  var string_to_handwriting = function(x, y, text){
    
    let pathPointerX = x;
    let pathPointerY = y;
    let d = "";
    let charCode = 0;
	
	  pathPointerX += ((Math.random()*(SETTINGS.JITTER*2))-SETTINGS.JITTER);
	  pathPointerY += ((Math.random()*(SETTINGS.JITTER*2))-SETTINGS.JITTER);
	
	  for (var i = 0; i < text.length; i++ ) {
		  charCode=text.charCodeAt(i);
		  if (charCode == 32) {
			  pathPointerX += 25; // moves the pointer 25 pixels right if character i is space
		  } else {
			  pathPointerX += parseInt(SETTINGS.HAND.DATA[charCode][0]);
			  pathPointerY = y + parseInt(SETTINGS.HAND.DATA[charCode][1]);
			  d += " M" + " " + pathPointerX.toFixed(2) + " " + pathPointerY.toFixed(2) + " " + SETTINGS.HAND.DATA[charCode][3];
			  pathPointerX += parseInt(SETTINGS.HAND.DATA[charCode][2]);
		  }
	  }
	  return "<path class='text' d='" + jitter_handwriting(d) + "'/>";
  };
  
  // Helper functions

  var remove = function(arr, what) {
    let found = arr.indexOf(what);
    while (found !== -1) {
      arr.splice(found, 1);
      found = arr.indexOf(what);
    }
  }
  
  var simple_jitter = function(p){
    /* Move p by to +/- SETTINGS.jitter pixels */
    if (typeof(p) == 'number'){
      return (Math.random() > 0.5000) ? p + Math.ceil((random_between(0, SETTINGS.JITTER))) : Math.floor((p - random_between(0, SETTINGS.JITTER)));
    } else if (typeof(p) == 'object') {
      return {"x": (Math.random() > 0.5000) ? Math.ceil((p.x + random_between(0, SETTINGS.JITTER))) : Math.floor((p.x - random_between(0, SETTINGS.JITTER))), "y": (Math.random() > 0.5000) ? Math.ceil((p.y + random_between(0, SETTINGS.JITTER))) : Math.floor((p.y - random_between(0, SETTINGS.JITTER))) };
    }
  }

  var point_to_point_distance = function(x1, y1, x2, y2){
    return Math.sqrt((Math.pow(x1-x2,2))+(Math.pow(y1-y2,2)))
  }

  var angle_between_points = function(x1, y1, x2, y2){
    return Math.atan2((y1 - y2), (x1 - x2)) * 57.2958;
  }

  var point_on_circle = function(cx, cy, radius, angle){
    let a = Math.sin(angle/57.2958);
    let x = cx + Math.cos(a)*radius;
    let y = cy + Math.sin(a)*radius;
    return {"x": x, "y": y};
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
            result_jitterPathString += (((c - commandIndex) < 4) || ((c - commandIndex) > 5)) ?  (firstPiece + ((Math.random()*(SETTINGS.JITTER*2))-SETTINGS.JITTER)).toFixed(2) : commands[c];
          break;
          case ('c'):
            result_jitterPathString +=  (firstPiece + ((Math.random()*(SETTINGS.JITTER*2))-SETTINGS.JITTER)).toFixed(2);
          break;
          case ('q'):
            result_jitterPathString +=  (firstPiece + ((Math.random()*(SETTINGS.JITTER*2))-SETTINGS.JITTER)).toFixed(2);
          break;
          default:
            result_jitterPathString += (firstPiece + ((Math.random()*(SETTINGS.JITTER*2))-SETTINGS.JITTER)).toFixed(2);
          break;
        }
      }
      result_jitterPathString += (lastPiece == ",") ? ", " : " ";
    }
    return result_jitterPathString;
  };
  
  var max_shift = function(distance){
    return Math.abs(Math.log(Math.pow(distance, (0.5 + ((distance-1)/distance)))));
  }

  var random_between = function(a, b){
    let r = a + (Math.random() * (b - a));
    return r.toFixed(2);
  }

  var control_points = function(startX, startY, endX, endY){
    const points = { "cp1": {}, "cp2": {} };
    const d = point_to_point_distance(startX, startY, endX, endY);
    const max_t = max_shift(d);
    let sign = (Math.random() > 0.5000) ? 1 : -1;
    let t;
    //control point 1
    if ((Math.abs(endX - startX)) > (Math.abs(endY - startY))) {
      t = sign * random_between((max_t/2), max_t);
      points.cp1.x = Math.ceil((startX + (endX - startX) * 0.25) + t);
      t = sign * random_between((max_t/2), max_t);
      points.cp1.y = Math.ceil((startY + (endY - startY) * 0.25) + t + 2); 
    } else {
      t = sign * random_between((max_t/2), max_t);
      points.cp1.x = Math.ceil((startX + (endX - startX) * 0.25) + t + 2);
      t = sign * random_between((max_t/2), max_t);
      points.cp1.y = Math.ceil((startY + (endY - startY) * 0.25) + t);
    }
    //control point 2
    sign = sign * -1;
    if ((Math.abs(endX - startX)) > (Math.abs(endY - startY))) {
      t = sign * random_between((max_t/2), max_t);
      points.cp2.x = Math.ceil((startX + (endX - startX) * 0.75) + t);
      t = sign * random_between((max_t/2), max_t);
      points.cp2.y = Math.ceil((startY + (endY - startY) * 0.75) + t + 2); 
    } else {
      t = sign * random_between((max_t/2), max_t);
      points.cp2.x = Math.ceil((startX + (endX - startX) * 0.75) + t + 2);
      t = sign * random_between((max_t/2), max_t);
      points.cp2.y = Math.ceil((startY + (endY - startY) * 0.75) + t);
    }
    return points;
  }

  var control_point = function(startX, startY, endX, endY){
    const point = {};
    const d = point_to_point_distance(startX, startY, endX, endY);
    const max_t = max_shift(d);
    let sign = (Math.random() > 0.5000) ? 1 : -1;
    let t;
    if ((Math.abs(endX - startX)) > (Math.abs(endY - startY))) {
      t = sign * random_between((max_t/2), max_t);
      point.x = Math.ceil((startX + (endX - startX) * random_between(0.4, 0.6)) + t);
      t = sign * random_between((max_t/2), max_t);
      point.y = Math.ceil((startY + (endY - startY) * random_between(0.4, 0.6)) + t + 1); 
    } else {
      t = sign * random_between((max_t/2), max_t);
      point.x = Math.ceil((startX + (endX - startX) * random_between(0.4, 0.6)) + t + 1);
      t = sign * random_between((max_t/2), max_t);
      point.y = Math.ceil((startY + (endY - startY) * random_between(0.4, 0.6)) + t);
    }
    return point;
  }

  var brieda_control_points = function(K) {
    // from Lubos Brieda. See http://www.particleincell.com/2012/bezier-splines/
    
    let p1= [];
    let p2= [];
    let n = K.length-1;
    
    /*rhs vector*/
    let a = [];
    let b = [];
    let c = [];
    let r = [];
    
    /*left most segment*/
    a[0]=0;
    b[0]=2;
    c[0]=1;
    r[0] = K[0] + 2 * K[1];
    
    /*internal segments*/
    for (var i = 1; i < (n - 1); i++){
      a[i] = 1;
      b[i] = 4;
      c[i] = 1;
      r[i] = 4 * K[i] + 2 * K[i+1];
    }
        
    /*right segment*/
    a[n-1]=2;
    b[n-1]=7;
    c[n-1]=0;
    r[n-1] = 8 * K[n-1] + K[n];
    
    /*solves Ax=b with the Thomas algorithm (from Wikipedia)*/
    for (var i = 1; i < n; i++) {
      let m = a[i]/b[i-1];
      b[i] = b[i] - m * c[i - 1];
      r[i] = r[i] - m*r[i-1];
    }
   
    p1[n-1] = r[n-1]/b[n-1];
    
    for (var i = (n - 2); i >= 0; i--){
      p1[i] = (r[i] - c[i] * p1[i+1]) / b[i];
    }  
    
    /*we have p1, now compute p2*/
    for (var i = 0; i < (n - 1); i++){
      p2[i]=2*K[i+1]-p1[i+1];
    }
    p2[n-1]=0.5*(K[n]+p1[n-1]);
    
    return { "p1": p1, "p2": p2 };
  }

  //public functions
  return {
    
    settings: function(setting = "unspecified", value = "unspecified"){
      if (setting == "unspecified") {
        console.log("<!-- SETTINGS: " + JSON.stringify(SETTINGS) + " -->");
      } else if (value == "unspecified") {
        console.log("<!-- " + SETTINGS[setting] + " -->");
      } else {
        return update_SETTINGS(setting, value);
      }
    },

    svg_wrapper: function(width, height, color, title){
      return empty_svg(width, height, color, title);
    },
  
    html_wrapper: function(width, height, color, title = "A whiteboard.js SVG Illustration"){
      return "<html><head><title>" + title + "</title></head><body><center>" + empty_svg(width, height, color, title) + "</center></body></html>";
    },
  
    draw_line: function(startX, startY, endX, endY){
      return "<path class='line' d='" + line(startX, startY, endX, endY, false, true) + "'/>";
    },

    draw_arrow: function(startX, startY, endX, endY){
      let arrow = line_to_arrow(startX, startY, endX, endY);
      return "<path class='arrow' transform='rotate(" + arrow.rotation + " " + arrow.start.x + " " + arrow.start.y + ")' d='" + line(arrow.start.x, arrow.start.y, arrow.tip.x, arrow.tip.y, true, false) + " " + line(arrow.top.x, arrow.top.y, arrow.tip.x, arrow.tip.y, true, false) + " " + line(arrow.bottom.x, arrow.bottom.y, arrow.tip.x, arrow.tip.y, true, false) + "'/>";
    },
  
    draw_polygon: function(coordinates){
      let polygon = "<path class='polygon' d='";
      for (var i = 0; i < (coordinates.length-1); i++){
        polygon += line(coordinates[i][0], coordinates[i][1], coordinates[i+1][0], coordinates[i+1][1]) + " ";
      }
      polygon += line(coordinates[coordinates.length-1][0], coordinates[coordinates.length-1][1], coordinates[0][0], coordinates[0][1]) + "'/>";
      return polygon;
    },

    draw_curve: function(coordinates){
      const cx = brieda_control_points(coordinates.map(function(c){return c[0];}));
      const cy = brieda_control_points(coordinates.map(function(c){return c[1];}));
      let curve = "<path class='curve' d='M" + coordinates[0][0].toFixed(2) + " " + coordinates[0][1].toFixed(2);
      for (var i = 0; i < (coordinates.length-1); i++){
        curve += "C" + Math.ceil(simple_jitter(cx.p1[i])) + " " + Math.ceil(simple_jitter(cy.p1[i])) + "," + Math.ceil(simple_jitter(cx.p2[i])) + " " + Math.ceil(simple_jitter(cy.p2[i])) + "," + coordinates[i+1][0].toFixed(2) + " " + coordinates[i+1][1].toFixed(2);
      }
      return curve + "'/>";
    },
  
    draw_circle: function(cx, cy, r, whiteout = false){
      const circles = [[-0.6, -0.6, -0.325,-1.15,0.65,-1.375,0.925,-0.7,2.05,2.15,-2.75,1.2,-0.45,-0.925],
				  [-0.88,-0.5,-0.08,-1.92,1.84,0.2,0.46,0.88,-0.64,1.44,-1.2,0.08,-0.8,-0.62],
				  [-0.76,-0.62,0.48,-2.1,2,0.96,0.08,0.96,-0.48,0.96,-0.7,0.66,-0.94,0.2,-1.14,-0.24,-0.8,-0.58,-0.64,-0.78],
				  [-0.88,-0.46,0.16,-1.46,1.82,-0.28,0.6,0.78,-0.46,1.7,-1.26,0.16,-0.82,-0.54],
				  [-0.66,-0.68,-0.48,-0.86,-0.08,-0.94,0.2,-0.86,1.26,-0.54,1.2,0.68,0.06,0.94,-0.96,1.18,-1.26,-0.4,-0.54,-0.74],
				  [-0.72,-0.56,-0.56,-0.74,-0.16,-1,0.12,-0.92,1.02,-0.62,1.32,0.64,0.1,0.96,-0.82,1.18,-1.24,-0.2,-0.58,-0.66]];
	    const factors = circles[Math.floor(Math.random()*6)];
	    let pathString = "<path class='circle' d='M" + (cx+(r*factors[0])) + " " + (cy+(r*factors[1])) + " " + "C";
	    for (var i=2; i < factors.length; i++ ) {
		    if (i % 2 === 0) {
			    pathString += (cx+(r*factors[i])).toFixed(2) + " ";
		    } else {
			    pathString += (cy+(r*factors[i])).toFixed(2) + " ";
		    }
	    }
      let rotation = Math.floor(Math.random()*180);
      let circle = pathString + "' transform='rotate(" + rotation + " " + cx + " " + cy + ")'/>";
      let underneath = pathString + "z' fill='" + SETTINGS.COLORS.Background + "' stroke='" + SETTINGS.COLORS.Background + "' stroke-width='" + (SETTINGS.MARKER_THICKNESS * 3) + "' transform='rotate(" + rotation + " " + cx + " " + cy + ")'/>";
      return (whiteout) ? ("<g class='double-circle'>" + underneath + circle + "</g>"): circle;
    },
    
    draw_dot: function(x, y){
      return "<g class='dot' stroke-width='3.5' transform='rotate(" + Math.floor(random_between(10, 350)) + " " + x.toFixed(2) + " " + y.toFixed(2) + ")'><ellipse rx='" + random_between(1.1, 1.5) + "' ry='" + random_between(1.3, 1.8) + "' cx='" +  x.toFixed(2) + "' cy='" + y.toFixed(2) + "'/></g>";
    },

    draw_text: function(x, y, text){
      return string_to_handwriting(x, y, text);
    }
  
  };
  
}());