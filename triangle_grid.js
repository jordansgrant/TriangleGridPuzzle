// Object Class: triangle_grid
// Author:		 Jordan Grant
// Description: The 6 x 12 triangular grid layout has a highly recursive structure. triangle_grid
//				uses memoized recursion to efficiently sketch out the grid on an HTML5 canvas.
//				Triangle grid also exposes methods for determining if a triad of points encode
//				a triangle on the grid and the row and column of a triangle.

// Function: triangle_grid constructor
// Create a new triangle grid object
// Arguments:   x_size:  integer representing the size in the x direction,
//              y_size:  integer representing the size in the y direction,
//              memo:    Memo datastructure exposing an add and contains function,
//				draw: 	 Drawing interface exposing a draw_triangles function,
//              compare: function object used for comparing two points
// Description: Initializes member variables for the triangle_grid object. xStep and yStep representation
// 				The distance between valid points in the x and y direciton respectivly in the grid and 
//				are inferred from x_size and y_size.
// Return:      void
function triangle_grid(x_size, y_size, memo, draw, compare)  {
	this.xSize = x_size;
	this.ySize = y_size;
	this.xStep = x_size/6;
	this.yStep = y_size/6;
	this.memoObj = memo;
	this.drawObj = draw;
	this.comparator = compare;
	
}

// Function: generate
// creates the canvas drawing of the triangle grid.
// Arguments: x and y coordinates of the root point.
// Description: generate uses memoized recursion to efficiently sketch out the grid on an HTML5 canvas. 
// 				Base case: the x or y value exceeds the maximum value of the structure. 
//				Memoization: an array of previously visited root points is used to test whether a point
//							 has been drawn yet or not. If it has been return (short-circuit the recursion).
//				The 4 key points of a rectangular cell of the grid are determined based off of the 
//				the current node in the tree. The triangles are drawn into this rectangle then the 
//				new node is added to the memo list. 
//				Recursion then moves to the left branch first, followed by the right branch.
// Return:      void
triangle_grid.prototype.generate = function(_x, _y) {
	// Base case: recursion ends when the boundaries are reached
	if (_x > this.xSize || _y > this.ySize ) 
		return;
	// short-circuit recursion for repeat nodes
	if (this.memoObj.contains({x:_x, y:_y}, this.comparator))
		return;
	// determine the rectangle that describes the cell in the grid to be divided into rectangles
	var points = [
		{ x:_x,                     y:_y },
		{ x:_x,                     y:_y + this.yStep }, 
		{ x:_x + this.xStep,  y:_y }, 
		{ x:_x + this.xStep,  y:_y+this.yStep }
	];
	// draw the triangles
	this.drawObj.draw_triangles(points);
	// add the new node to the memo list
	this.memoObj.add({x:_x, y:_y});
	// Move left in the tree
	this.generate(_x,                     _y + this.yStep);
	// Move right in the tree
	this.generate(_x + this.xStep,  _y                   );
	
};

// Function: get_row_col
//				       *** Assumes Valid Triangle***
// returns the row and column of the encoded triangle as a string (ex. A1)
// Arguments: Array of 3 Objects containing x, y coordinates of points to be tested
// Description: with the minimum point the row can be determined by the number of steps
//              in the y direction (min.y / yStep). The row is converted to a string by
//				encoding into a capital ASCII representation (ASCII A == 65)
//              For column calculation see get_column().
// Return: the row and column as a string
triangle_grid.prototype.get_row_col = function(points) {
	// get the minimum point ( see get_min_point )
	var min = this.get_min_point(points);
	// get the row and convert into character representation
	var row = String.fromCharCode( 65 + Math.round(min.y / this.yStep));
	// concatenate the column (see get_column) to the row and return.
	return row + this.get_column(min, points);
};

// Function: get_min_point
// returns the minimum point of the triangle, or the point where both x and y values are minimum of the triad
// Arguments: Array of 3 Objects containing x, y coordinates of points to be tested
// Description: loop over points and find the point where the x and y values are minimized. 
// Return: min point with its index in the points array.
triangle_grid.prototype.get_min_point = function(points) {
	var minX = points[0].x;
	var minY = points[0].y;
	var idx = 0;
	// loop over remaining points and compare coordinates to minX and Y. Track index of 
	// the minimum point.
	for (var i = 1; i < 3; i++) {
		if (points[i].x <= minX && points[i].y <= minY) {
			minX = points[i].x;
			minY = points[i].y;
			idx = i;
		}
	}
	// return minX and Y along with the index of the minimum point.
	return { x: minX, y: minY, index: idx };
};

// Function: get_column
//				       *** Assumes Valid Triangle***
// returns the column given the value of the min point and the array of points. 
// Arguments: Object containing the min points,
//            Array of 3 Objects containing x, y coordinates of points to be tested
// Description: given the min point you can calculate the index of the lower (odd) column
//              cell that can be associated with that min point multiplying the number of x steps
//				to the min.x point (min.x / xStep) by 2 and adding 1. You can determine if it is the
//				even or odd column by finding out if the non-minimum points have x values greater than
//				the minimum. In other words, a side point with a higher x-value means its an even column.
// Return: The column number of the triangle encoded by the 3 points
triangle_grid.prototype.get_column = function(min, points) {
	// find the odd column associated with this minimum point in the triangle
	var oddCol = Math.round(min.x / this.xStep);
	oddCol = oddCol * 2 + 1;
	
	// find out if the side points x value is larger than the min points x value
	var j = 0;
	for (var i = 0; i < 3; i++) {
		if (points[i].x > min.x)
			j++;
	}
	// if the side point had a a larger x value return oddCol
	return (j == 2) ? oddCol + 1 : oddCol;
};

// Function: is_row_col
// verifies the user has given valid points for a triangle at a triangle in the grid
// Arguments: Array of 3 Objects containing x, y coordinates of points to be tested
// Description: by finding the min point (where x and y are minimized) the other 3 possible
// 				point combinations can be inferred. 
//				If the other two actual points to not match exactly 2 of the 3 possible points
// Return:	Boolean value. true if the points encode a grid triangle. Otherwise false.
triangle_grid.prototype.is_row_col = function(points) {
	// grab the min point
	var min            = this.get_min_point(points);
	// calculate the other 3 possible valid points off of this min
	var max_point      = { x:min.x + this.xStep, y:min.y + this.yStep };
	var odd_col        = { x:min.x,              y:(min.y + this.yStep) };
	var even_col       = { x:min.x + this.xStep, y:min.y };
	// variables to track whether points are found (ex. prevent two max_points giving false positive)
	var m_found        = 0;
	var o_e_found      = 0;
	// track if the other two points match the max_point and 
	// the point that makes the triangle either an odd or even column
	j = 0;
	// loop over the points and check the thoretical points match the real points
	for (var i = 0; i < 3; i++) {
		// don't count the min point
		if ( i != min.index ) {
			// check that max_point is present
			if (points[i].x === max_point.x && points[i].y == max_point.y && !m_found) {
				j++;
				m_found = 1;
			}
			// check if the side point creates an odd column
			else if (points[i].x === odd_col.x && points[i].y === odd_col.y && !o_e_found) {
				j++;
				o_e_found = 1;
			}
			//check if the side point creates an even column
			else if (points[i].x === even_col.x && points[i].y === even_col.y && !o_e_found) {
				j++;
				o_e_found = 1;
			}
		}
	}
	// if there is a match with a max_point and either the odd or even column point
	// the triangle is valid. Otherwise, it is invalid.
	return (j === 2);
}


