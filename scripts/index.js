function Paint(canvas) {
	var self = this;
	
	this.canvas = canvas;
	this.context = this.canvas[0].getContext("2d");
	
	this.clickX = [];
	this.clickY = [];
	this.clickDrag = [];
	this.paint = false;
	
	this.strokeColour = "#000000";
	this.brushSize = 3;
}


$(document).ready( function() {
	
	var canvas = $("#myCanvas");
	var context = canvas[0].getContext("2d");
	var paint = false;
	var clickX = [];
	var clickY = [];
	var clickDrag = [];
	var brushSize = 4;
	var strokeColour = "#000000";
	var i = 0;

	function addClick(x, y, dragging) {
		clickX.push(x);
		clickY.push(y);
		clickDrag.push(dragging);
	}

	function Draw() {
		context.strokeStyle = strokeColour;
		context.lineJoin = "round";
		context.lineWidth = brushSize;
		
		while (i < clickX.length) {
			context.beginPath();
			
			if (clickDrag[i] && i) {
				context.moveTo(clickX[i - 1], clickY[i - 1]);
			} else {
				context.moveTo(clickX[i] - 1, clickY[i]);
			}
			
			context.closePath();
			context.lineTo(clickX[i], clickY[i]);
			context.stroke();
			i++;
		}
		
	}

	function ClearCanvas() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		var w = canvas.width;
		canvas.width = 1;
		canvas.width = w;
	}

	function stopPainting() {
		paint = false;
	}

	function getMousePosition(event, canvas) {

		var x, y;

		if (event.offsetX) {
			x = event.offsetX;
			y = event.offsetY;
		} else {
			x = event.pageX - canvas.offsetLeft;
			y = event.pageY - canvas.offsetTop;
		}

		return {
			x: x,
			y: y
		}
	}

	canvas.mousedown(function(e) {
		var pos = getMousePosition(e, this);

		paint = true;
		addClick(pos.x, pos.y);
		Draw();
	});

	canvas.mousemove(function(e) {
		if (paint) {
			var pos = getMousePosition(e, this);

			addClick(pos.x, pos.y, true);
			Draw();
		}
	});

	canvas.mouseup(function() {
		stopPainting();
	});

	canvas.mouseleave(function() {
		stopPainting();
	});

	$("#colorPalette a").click(function() {
		$('#colorPalette a').removeClass("active");
		$(this).addClass("active");
		strokeColour = "#"+this.name;
	});
	
	$('#newPaintModal').modal({
		backdrop: true
	});
	
	$('#clearCanvas').click(function() {
		console.log("Clearing Canvas");
	
		ClearCanvas();
	});
	
	
});