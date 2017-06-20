// Object Class: draw_interface
// Author:		 Jordan Grant
// Description: Interface for drawing the triangle grid on an HTML5 Canvas tag. 
//              Exposes a draw_triangles function that takes an array of 4 points 
//				and draws they encode.

// Function: draw_canvas constructor
// Create a new draw_canvas object
// Arguments:   id:      the HTML id of the canvas object
//				x_size:  integer representing the size in the x direction,
//              y_size:  integer representing the size in the y direction,
//				stroke:  The color of line strokes in hex format
//				alpha:   The global transparency of the strokes
// Description: Initializes member variables for the draw_canvas object. x_size and y_size
//				are the height and width of the canvas. The canvas context and stroke styleSheets
//				are set.
// Return:      void
function draw_canvas(id, x_size, y_size, stroke, alpha) {
	this.canvas = document.getElementById(id);
	this.canvas.width = x_size;
	this.canvas.height = y_size;
	this.context = canvas.getContext('2d');
	this.context.strokeStyle = stroke;
	this.context.globalAlpha = alpha;
}
// Function: draw_triangles
// Draws a section of the grid containing 2 columns
// Arguments:   points: Array of 4 points representing a rectangle on the grid.
// Description: The triangles begin at point[0] which is the minimum (root, x and y point ar minimized) 
//				point of the rectangle. The diagonal is drawn to the last point then the bounding rectangle
//				is traced.
// Return:      void
draw_canvas.prototype.draw_triangles = function(points) {
	// begin a new path
	this.context.beginPath();
	// move to the pen to the root point
	this.context.moveTo(points[0].x, points[0].y);
	// create a line diagonal to the bottom right of the rectangle
	this.context.lineTo(points[3].x, points[3].y);
	// trace from the bottom right to the bottom left
	this.context.lineTo(points[1].x, points[1].y);
	// trace back to the root
	this.context.lineTo(points[0].x, points[0].y);
	// trace to the top right
	this.context.lineTo(points[2].x, points[2].y);
	// close the loop to the bottom right
	this.context.lineTo(points[3].x, points[3].y);
	// flush the lines to the canvas.
	this.context.stroke();
	// close the path
	this.context.closePath();
}
// Function: clear
// Clear the canvas
// Arguments:   x_size: the width of the canvas,
//		y_size: the height of the canvas
// Description: forces a reset of the canvas by changing its dimensions
// Return:      void
draw_canvas.prototype.clear = function(x_size, y_size) {
	this.canvas.width = x_size;
	this.canvas.height = y_size;
}



