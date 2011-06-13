$(document).ready(function() {
	var circles = {},
	    times = [],
	    randoms = {};
	
	function randomFor(name, mag) {
		if (randoms[name]) {
			return randoms[name];
		}
		randoms[name] = {"x": Math.floor(Math.random() * mag),
				         "y": Math.floor(Math.random() * mag) };
		return randoms[name];
	};
	
	$.each(data, function(index, commit) {
		var className = commit.file_name + commit.class_name,
		    name = className + commit.method_name,
		    classCoord = randomFor(className, 750),
		    nameCoord = randomFor(name, 50);
		
		circles[name] = { 
				          "xPos": nameCoord.x + classCoord.x,
				          "yPos": nameCoord.y + classCoord.y
				        };
		times.push({ "time": commit.date,
			         "name": name,
			         "complexity": commit.complexity,
			         "lineCount" : commit.line_count
		           });
	});
	
	times = times.reverse();
	
	function sketchProc(processing) {
		var index = 0;
		
		processing.setup = function() {
			processing.size(800, 800);
			processing.background(255,255,255);
			processing.frameRate(120);
		};
		
		processing.draw = function() {
			if (index >= times.length) {
				return;
			}
			var circleData = times[index];
			processing.fill(circleData.complexity,10,10);
			processing.ellipse(circles[circleData.name].xPos,
					           circles[circleData.name].yPos,
					           circleData.complexity,
					           circleData.complexity);
			
			processing.fill(255,255,255,5);
			processing.rect(0,0,800,800);

			index ++;
		};
	}  
	
    new Processing(document.getElementById("canvas1"), sketchProc);  
});
