$(document).ready(function() {
	var circles = {},
	    times = [],
	    randoms = {};
	
	function randomFor(name, mag) {
		if (randoms[name]) {
			return randoms[name];
		}
		randoms[name] = {"x": Math.floor(Math.random() * mag),
				         "y": Math.floor(Math.random() * mag),
				         "z": Math.floor(Math.random() * mag)};
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
			         "lineCount": commit.line_count,
			         "committer": randomFor(commit.committer, 255)
		           });
	});
	
	times = times.reverse();
	
	function sketchProc(processing) {
		var index = 0,
		    currentTime,
		    lastTime,
		    displayed = {};
		
		processing.setup = function() {
			processing.size(800, 800);
			processing.background(255,255,255);
			processing.frameRate(60);
		};
		
		processing.draw = function() {
			currentTime = lastTime;
			while (true) {
				if (index >= times.length) {
					return;
				}
				currentTime = times[index].time;
				if (currentTime != lastTime) {
					lastTime = currentTime;
					break;
				}

				displayed[times[index].name] = times[index];
				
				//processing.fill(255,255,255,5);
				//processing.rect(0,0,800,800);
	
				index ++;
			}
			processing.background(255,255,255);
			$.each(displayed, function(name, circleData) {
				processing.fill(circleData.committer.x,circleData.committer.y,circleData.committer.z);
				processing.ellipse(circles[circleData.name].xPos,
						           circles[circleData.name].yPos,
						           circleData.complexity,
						           circleData.complexity);
			});
		};
	}  
	
    new Processing(document.getElementById("canvas1"), sketchProc);  
});
