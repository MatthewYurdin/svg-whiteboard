//Create SVG and add "hand-written" content
//Global setting for non-identicalness of text characters
var jitter = 1.5;

function buildSVG(name){
	var _svg_ = "<svg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:html='http://www.w3.org/1999/xhtml' width='100%' height='100%' viewBox='0,0," + Svgs[name].Dim.Width + "," + Svgs[name].Dim.Height + "' preserveAspectRatio='xMinYMin meet'><defs>";
	_svg_ += "<title>" + Svgs[name].Title + "</title>";
	_svg_ += "</defs>";
	for (var section=0;section < Svgs[name].Sections.length;section++){
		_svg_ += "<g ";
		if (Svgs[name].Sections[section].Name) { _svg_ += " id='" + Svgs[name].Sections[section].Name + "' "; }
		if (Svgs[name].Sections[section].Translate) { _svg_ += "transform='translate(" + Svgs[page].Sections[section].Translate[0] + "," + Svgs[page].Sections[section].Translate[1] + ")' "; }
		_svg_ += ">";
		if (Svgs[name].Sections[section].Description) { _svg_ += "<desc>" + Svgs[name].Sections[section].Description  + "</desc>"; }
		for (var element=0; element < Svgs[name].Sections[section].Content.length; element++){
			if (Svgs[name].Sections[section].Content[element].Purpose == "Text"){
				_svg_ += drawText(Svgs[name].Sections[section].Content[element]);
			}
			else if (Svgs[name].Sections[section].Content[element].Purpose == "Symbol"){
				_svg_ += drawSymbol(Svgs[name].Sections[section].Content[element]);
			}
			else if (Svgs[name].Sections[section].Content[element].Purpose == "Rectangle"){
				_svg_ += drawRectangle(Svgs[name].Sections[section].Content[element]);
			}
			else if (Svgs[name].Sections[section].Content[element].Purpose == "Line"){
				_svg_ += drawLine(Svgs[name].Sections[section].Content[element]);
			}
			else if (Svgs[name].Sections[section].Content[element].Purpose == "Polygon"){
				_svg_ += drawPolygon(Svgs[name].Sections[section].Content[element]);
			}
		}
		_svg_ += "</g>";
	}
	_svg_ += "</svg>";
	return _svg_;
}

function buildHTML(name){
	var _svg_ = "<!DOCTYPE html><html><head></head><body>";
	_svg_ += buildSVG(name) + "</body></html>";
	return _svg_;
}

/////////////////////////////////

function drawText(objRef){
	var _elements_ = "<path stroke='" + Colors[objRef.Color] + "' stroke-width='2' stroke-linecap='round' fill='none'";
	if (objRef.Name) { _elements_ += " id='" + objRef.Name + "' "; }
	_elements_ += "transform='scale(0.7)' d='" + pathify(objRef.X, objRef.Y, objRef.textString, objRef.Alignment) + "'/>";
	return _elements_;
}

function drawSymbol(objRef){
	var _elements_ = "<path stroke='" + Colors[objRef.Color] + "' stroke-width='2' stroke-linecap='round' fill='none' ", controlPoint_1, controlPoint_2;
	if (objRef.Name) { _elements_ += "id='" + objRef.Name + "' "; }
	if (objRef.Type=="Circle"){
		_elements_ += "d='" + handDrawnCircle(objRef.X,objRef.Y,objRef.Width) + "'/>";
	}
	else if (objRef.Type=="Square") {
		var coordinates = [], controlPoint_2, controlPoint_2;
		coordinates.push([(objRef.X-objRef.Width/2),(objRef.Y-objRef.Height/2)]);
		coordinates.push([(objRef.X+objRef.Width/2),(objRef.Y-objRef.Height/2)]);
		coordinates.push([(objRef.X+objRef.Width/2),(objRef.Y+objRef.Height/2)]);
		coordinates.push([(objRef.X-objRef.Width/2),(objRef.Y+objRef.Height/2)]);
		
		_elements_ += "d='";
		for (var coordinate = 0; coordinate < coordinates.length; coordinate++){
			_elements_ += "M" + coordinates[coordinate][0] + "," + coordinates[coordinate][1] + " C";
			if (coordinate==3){
				controlPoint_1 = controlPoint(coordinates[coordinate][0],coordinates[coordinate][1],coordinates[0][0],coordinates[0][1]);
				controlPoint_2 = controlPoint(coordinates[coordinate][0],coordinates[coordinate][1],coordinates[0][0],coordinates[0][1]);
				_elements_ += controlPoint_1 + " " + controlPoint_2 + " " + coordinates[0][0] + " " + coordinates[0][1] + " ";
			} else {
				controlPoint_1 = controlPoint(coordinates[coordinate][0],coordinates[coordinate][1],coordinates[coordinate+1][0],coordinates[coordinate+1][1]);
				controlPoint_2 = controlPoint(coordinates[coordinate][0],coordinates[coordinate][1],coordinates[coordinate+1][0],coordinates[coordinate+1][1]);
				_elements_ += controlPoint_1 + " " + controlPoint_2 + " " + coordinates[coordinate+1][0] + "," + coordinates[coordinate+1][1] + " ";
			}
		}
		 _elements_ += "'/>";
	}
	return _elements_;
}

function drawLine(objRef){
	var _elements_ = "<path stroke='" + Colors[objRef.Color] + "' stroke-width='2' stroke-linecap='round'  fill='none' ", controlPoint_1, controlPoint_2;
	if (objRef.Name) { _elements_ += "id='" + objRef.Name + "' "; }
	_elements_ += "d='M" + objRef.X1 + "," + objRef.Y1 + " ";
	controlPoint_1 = controlPoint(objRef.X1, objRef.Y1, objRef.X2, objRef.Y2);
	controlPoint_2 = controlPoint(objRef.X1, objRef.Y1, objRef.X2, objRef.Y2);
	_elements_ += controlPoint_1 + " " + controlPoint_2 + " " + objRef.X2 + " " + objRef.Y2 + "'/>";
	return _elements_;
}

function drawArrow(objRef){
	//TODO line + arrow pointing same direction as line
	var _elements_ = "<path stroke='" + Colors[objRef.Color] + "' stroke-width='2' stroke-linecap='round'  fill='none' ", controlPoint_1, controlPoint_2;
	if (objRef.Name) { _elements_ += "id='" + objRef.Name + "' "; }
	_elements_ += "d='M" + objRef.X1 + "," + objRef.Y1 + " ";
	controlPoint_1 = controlPoint(objRef.X1, objRef.Y1, objRef.X2, objRef.Y2);
	controlPoint_2 = controlPoint(objRef.X1, objRef.Y1, objRef.X2, objRef.Y2);
	_elements_ += controlPoint_1 + " " + controlPoint_2 + " " + objRef.X2 + " " + objRef.Y2 + "'/>";
	return _elements_;
}

function drawRectangle(objRef){
	var _elements_ = "<path stroke='" + Colors[objRef.Color] + "' stroke-width='2' stroke-linecap='round' fill='none' ", controlPoint_1, controlPoint_2;
	if (objRef.Name) { _elements_ += "id='" + objRef.Name + "' "; }
	//segment 1
	_elements_ += "d='M" + objRef.X + "," + objRef.Y + " C ";
	controlPoint_1 = controlPoint(objRef.X, objRef.Y, (objRef.X+objRef.Width), objRef.Y);
	controlPoint_2 = controlPoint(objRef.X, objRef.Y, (objRef.X+objRef.Width), objRef.Y);
	_elements_ += controlPoint_1 + " " + controlPoint_2 + " " + (objRef.X+objRef.Width) + " " + objRef.Y + " ";
	//segment 2
	_elements_ += " M" + (objRef.X+objRef.Width) + "," + objRef.Y + " C ";
	controlPoint_1 = controlPoint((objRef.X+objRef.Width), objRef.Y, (objRef.X+objRef.Width), (objRef.Y+objRef.Height));
	controlPoint_2 = controlPoint((objRef.X+objRef.Width), objRef.Y, (objRef.X+objRef.Width), (objRef.Y+objRef.Height));
	_elements_ += controlPoint_1 + " " + controlPoint_2 + " " + (objRef.X+objRef.Width) + " " + (objRef.Y+objRef.Height) + " ";
	//segment 3
	_elements_ += " M" + (objRef.X+objRef.Width) + "," + (objRef.Y+objRef.Height) + " C ";
	controlPoint_1 = controlPoint((objRef.X+objRef.Width), (objRef.Y+objRef.Height), objRef.X, (objRef.Y+objRef.Height));
	controlPoint_2 = controlPoint((objRef.X+objRef.Width), (objRef.Y+objRef.Height), objRef.X, (objRef.Y+objRef.Height));
	_elements_ += controlPoint_1 + " " + controlPoint_2 + " " + objRef.X + " " + (objRef.Y+objRef.Height) + " ";
	//segment 4
	_elements_ += " M" + objRef.X + "," + (objRef.Y+objRef.Height) + " C ";
	controlPoint_1 = controlPoint(objRef.X, (objRef.Y+objRef.Height), objRef.X, objRef.Y);
	controlPoint_2 = controlPoint(objRef.X, (objRef.Y+objRef.Height), objRef.X, objRef.Y);
	_elements_ += controlPoint_1 + " " + controlPoint_2 + " " + objRef.X + " " + objRef.Y + "'/>";
	return _elements_;
}

function drawPolygon(objRef){
	var _elements_ = "<path stroke='" + Colors[objRef.Color] + "' stroke-width='2' stroke-linecap='round'  fill='none' ", coordinates = objRef.Coordinates,controlPoint_1, controlPoint_2;
	if (objRef.Name) { _elements_ += "id='" + objRef.Name + "' "; }
	_elements_ += "d='";
	for (var coordinate = 0; coordinate < objRef.Coordinates.length; coordinate++){
		_elements_ += "M" + coordinates[coordinate][0] + "," + coordinates[coordinate][1] + " C";
		if (coordinate==(coordinates.length-1)){
			controlPoint_1 = controlPoint(coordinates[coordinate][0],coordinates[coordinate][1],coordinates[0][0],coordinates[0][1]);
			controlPoint_2 = controlPoint(coordinates[coordinate][0],coordinates[coordinate][1],coordinates[0][0],coordinates[0][1]);
			_elements_ += controlPoint_1 + " " + controlPoint_2 + " " + coordinates[0][0] + " " + coordinates[0][1] + " ";
		} else {
			controlPoint_1 = controlPoint(coordinates[coordinate][0],coordinates[coordinate][1],coordinates[coordinate+1][0],coordinates[coordinate+1][1]);
			controlPoint_2 = controlPoint(coordinates[coordinate][0],coordinates[coordinate][1],coordinates[coordinate+1][0],coordinates[coordinate+1][1]);
			_elements_ += controlPoint_1 + " " + controlPoint_2 + " " + coordinates[coordinate+1][0] + " " + coordinates[coordinate+1][1] + " ";
		}
	}
	_elements_ += "'/>";
	return _elements_;
}

///////////////////////////////

function pathify(x, y, text, align) {
	var pathPointerX = x, pathPointerY = y, d = "", charCode = 0, stretch=0;
	for (var e=0;e<text.length;e++){
		charCode=text.charCodeAt(e);
		if (charCode==32) { //text[e] = space
			stretch+=25;
		} else {
			stretch+=parseInt(Hand.Data[(charCode.toString())][2]);
		}
	}
	pathPointerX += ((Math.random()*(jitter*2))-jitter);
	pathPointerY += ((Math.random()*(jitter*2))-jitter);
	
	if (align=="center"){
		pathPointerX-=(stretch/2);
	}
	if (align=='right') {
		pathPointerX-=stretch;
	}
	for (var i = 0; i < text.length; i++ ) {
		charCode=text.charCodeAt(i);
		if (charCode == 32) {
			pathPointerX += 25; // moves the pointer 25 pixels right if character i is space
		} else {
			pathPointerX += parseInt(Hand.Data[charCode][0]);
			//why do I adjst pathPointerY?
			pathPointerY = y + parseInt(Hand.Data[charCode][1]);
			d += " M" + " " + pathPointerX.toFixed(2) + " " + pathPointerY.toFixed(2) + " " + Hand.Data[charCode][3];
			pathPointerX += parseInt(Hand.Data[charCode][2]);
		}
	}
	return jitterPathString(d);
}

  function remove(arr, what) {
    var found = arr.indexOf(what);

    while (found !== -1) {
        arr.splice(found, 1);
        found = arr.indexOf(what);
    }
  }

function jitterPathString(_raw_){
  var result_jitterPathString = "", command = "", commands = _raw_.split(" "), commandIndex = 0;
  remove(commands,"");
  for (var c = 0; c < commands.length; c++){
    if (commands[c]=="" || commands[c]==" ") {
      //do nothing
      console.log("hello");
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
            result_jitterPathString += (((c - commandIndex) < 4) || ((c - commandIndex) > 5)) ?  (firstPiece + ((Math.random()*(jitter*2))-jitter)).toFixed(2) : commands[c];
         break;
         case ('c'):
           result_jitterPathString +=  (firstPiece + ((Math.random()*(jitter*2))-jitter)).toFixed(2);
         break;
         case ('q'):
           result_jitterPathString +=  (firstPiece + ((Math.random()*(jitter*2))-jitter)).toFixed(2);
         break;
         default:
           result_jitterPathString += (firstPiece + ((Math.random()*(jitter*2))-jitter)).toFixed(2);
         break;
       }
       result_jitterPathString += (lastPiece == ",") ? ", " : " ";
    }
  }
  return result_jitterPathString;
}

//randomly adds two nearby control points to yield subtle
//cubic Bezier curve resulting in not-quite-straight line
function controlPoint(startX, startY, endX, endY) {
	var trans=Math.floor(Math.random()*100);
	var transX = startX + ((endX - startX)*(trans/100));
	var transY = startY + ((endY - startY)*(trans/100));
	var dist = Math.sqrt(((endX - startX)*(endX - startX))+((endY - startY)*(endY - startY)));
	var maxAdjust = Math.log(dist * dist);
	if ((Math.abs(endX - startX)) > (Math.abs(endY - startY)))
		transY += ((maxAdjust/2) - (Math.floor(Math.random()*maxAdjust)));
	else {
		transX += ((maxAdjust/2) - (Math.floor(Math.random()*maxAdjust)));
	}
	var pointString = " " + transX.toFixed(2) + " " + transY.toFixed(2);
	return pointString;
}

function controlPointSmall(startX, startY, endX, endY) {
	var trans=Math.floor(Math.random()*10);
	var transX = startX + ((endX - startX)*(trans/100));
	var transY = startY + ((endY - startY)*(trans/100));
	var dist = Math.sqrt(((endX - startX)*(endX - startX))+((endY - startY)*(endY - startY)));
	var maxAdjust = Math.log(dist * dist);
	if ((Math.abs(endX - startX)) > (Math.abs(endY - startY)))
		transY += ((maxAdjust/2) - (Math.floor(Math.random()*maxAdjust)));
	else {
		transX += ((maxAdjust/2) - (Math.floor(Math.random()*maxAdjust)));
	}
	var pointString = " " + transX.toFixed(2) + "," + transY.toFixed(2);
	return pointString;
}

function handDrawnCircle(cx, cy, r) {
	var circles = [[-0.6, -0.6, -0.325,-1.15,0.65,-1.375,0.925,-0.7,2.05,2.15,-2.75,1.2,-0.45,-0.925],
				  [-0.88,-0.5,-0.08,-1.92,1.84,0.2,0.46,0.88,-0.64,1.44,-1.2,0.08,-0.8,-0.62],
				  [-0.76,-0.62,0.48,-2.1,2,0.96,0.08,0.96,-0.48,0.96,-0.7,0.66,-0.94,0.2,-1.14,-0.24,-0.8,-0.58,-0.64,-0.78],
				  [-0.88,-0.46,0.16,-1.46,1.82,-0.28,0.6,0.78,-0.46,1.7,-1.26,0.16,-0.82,-0.54],
				  [-0.66,-0.68,-0.48,-0.86,-0.08,-0.94,0.2,-0.86,1.26,-0.54,1.2,0.68,0.06,0.94,-0.96,1.18,-1.26,-0.4,-0.54,-0.74],
				  [-0.72,-0.56,-0.56,-0.74,-0.16,-1,0.12,-0.92,1.02,-0.62,1.32,0.64,0.1,0.96,-0.82,1.18,-1.24,-0.2,-0.58,-0.66]];
	var factors = circles[Math.floor(Math.random()*6)];
	var pathString = "M" + (cx+(r*factors[0])) + " " + (cy+(r*factors[1])) + " " + "C";
	for (var i=2; i < factors.length; i++ ) {
		if (i%2 == 0) {
			pathString += (cx+(r*factors[i])).toFixed(2) + " "
		} else {
			pathString += (cy+(r*factors[i])).toFixed(2) + " ";
		}
	}
	return pathString;
}

//Utility for making lowecase version of letters
function makeLowercase(){
  var result_makeLowercase = "";
  for (var c=65; c<91; c++){
    var code = 97 + (c-65);
    result_makeLowercase += "Hand.Data['" + code + "'] = ['" + Hand.Data[c.toFixed()][0] + "', '" + Hand.Data[c.toFixed()][1] + "', '" + Hand.Data[c.toFixed()][2] + "', '";
    var commands = Hand.Data[c.toFixed()][3].split(" ");
    for (var p=0; p<commands.length; p++){
      if ("mlacqz".indexOf(commands[p]) >= 0) {
        result_makeLowercase += commands[p] + " ";
      } else  {
        if (commands[p].indexOf(",") > 0) {
          result_makeLowercase += Number(commands[p].substring(0,(commands[p].length-1)))/2 + ", ";
        } else {
          result_makeLowercase += Number(commands[p])/2 + " ";
        }
      }
    }
    result_makeLowercase += "'];//" + String.fromCharCode(code) + '\n';
  }
  return result_makeLowercase;
}