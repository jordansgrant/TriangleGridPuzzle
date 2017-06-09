
// Do not initialize triangle simulation until the DOM is loaded
$( document ).ready( function() {
	// Hide the row/column value field in the modal
	$('#modal_row_col').hide();
	
	// initialize a new array_interface for the memo list
	var memo = new array_interface();
	// initialize a new draw_canvas object that is 605x605 (gives space for outside border)
	// and paints a fully opaque white line.
	var canvas = new draw_canvas('canvas', 605, 605, "#FFFFFF", 1.0);
	// initialize the triangle grid class, with size 600x600 (easier to see than 60x60)
	// See bottom for compare function.
	
	var grid =  new triangle_grid(600, 600, memo, canvas, compare);
	// Calculate and drawn the grid on the canvas (starting at 2,2 so the outside border shows up).
	grid.generate(2, 2);
	
	// Calback to display the row/column lookup.
	$('#get_row_col').click(function(event) {
		// prevent refreshing of the page
		event.preventDefault();
		// get the users selected points in an array of objects
		// values are cast to integers 
		var pts = [ 
			{ x:parseInt($('#p1x').val(), 10), y:parseInt($('#p1y').val(), 10) },
			{ x:parseInt($('#p2x').val(), 10), y:parseInt($('#p2y').val(), 10) },
			{ x:parseInt($('#p3x').val(), 10), y:parseInt($('#p3y').val(), 10) }
		];
		// Check if the triangle is valid on the grid.
		if (!grid.is_row_col(pts)) {
			// If not report failed lookup to the user
			$( '#modal_text' ).text("Woops! Thats not a valid triangle");
			$( '#modal' ).modal({focus:true, show:true});
			return;
		}
		// If the triangle is valid report success to the user
		$( '#modal_text' ).text("Hey! I found that Row and Column for you!");
		// get the text filed to hold the row and column
		var row_col = $('#modal_row_col');
		// add the row and column
		row_col.text(grid.get_row_col(pts));
		// make it visible
		row_col.show();
		// launch the modal.
		$('#modal').modal({focus: true, show:true});
	});
	
	// callback on modal close
	$('#modal_close').click(function(event) {
		// prevent reloading of the page
		event.preventDefault();
		// get the row/columnt text field
		var row_col = $('#modal_row_col');
		// clear its value
		row_col.text("");
		// hide it in case the next point is invalid.
		row_col.hide();
	});
	
});

// Comparator function for memo lookup
// Compares to points for equality and returns 1 for true and 0 for false.
// NOTE: This sample implementation of the triangle grid does not support floating point coordinates
// Arguments: val1: object encoding x,y coordinates on the canvas
//			  val2: object encoding x,y, coordinates on the canvas
// Description: compares the x and y coordinates of two points.
// Return: Returns 1 if both points are identical, 0 otherwise
function compare(val1, val2) {
	if (val1.x == val2.x && val1.y == val2.y)
		return 1;
	return 0;
}