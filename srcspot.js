$(document).ready(function() {
	var circles = {},
	    times = [];
	
	$.each(data, function(index, commit) {
		var name = commit.file_name + commit.class_name + commit.method_name;
		circles[name] = { 
				          "xPos": Math.floor(Math.random()*800),
				          "yPos": Math.floor(Math.random()*800)
				        };
		times.push({ "time": commit.date, "name": name, "complexity": commit.complexity });
	});
	
	times.sort(function (time1, time2) {
		return (time1.time >= time2.time) ? 1 : -1;
	});
	
	function sketchProc(processing) {
		var index = 0;
		
		processing.setup = function() {
			processing.size(800, 800);
			processing.frameRate(4);
		};
		
		processing.draw = function() {
			if (index >= times.length) {
				index = 0;
				background(255); 
			}
			var circleData = times[index];
			processing.fill(circleData.complexity,10,10);
			processing.ellipse(circles[circleData.name].xPos,
					           circles[circleData.name].yPos,
					           circleData.complexity,
					           circleData.complexity);
			index ++;
		};
	}  
	
    new Processing(document.getElementById("canvas1"), sketchProc);  
});
