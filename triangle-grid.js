
var triangle_grid = function(x_size, y_size, memo, draw, compare) {
	this.x_size = x_size;
	this.y_size = y_size;
	this.x_step = x_size/6;
	this.y_step = y_size/6;
	this.memoObj = memo;
	this.drawTriangle = draw;
	this.comparator = compare	
}

triangle_grid.prototype.generate = function(_x, _y) {
	if (_x > this.x_size || _y > this.y_size) 
		return;
	if (this.memoObj.contains(_x+_y, this.compare)
		return;
	var points = [
		{ x:_x, y:_y },
		{ x:_x, y:_y + this.y_step }, 
		{  x:_x + this.x_step, y:_y }, 
		{  x:_x + this.x_step, y:_y+this.y_step}
	];
	
	this.drawTriangle.draw(points);
	
	this.memoObj.add(_x + _y);
	
	generate(_x,                      _y + this.y_step);
	generate(_x + this.x_step, _y                     );
	
};

triangle_grid.prototype.get_location(p1, p2, p3) = function() {
	
}
var triangles = {
	triangle_memo: [],
	canvas: document.getElementById('canvas');
	context: document.getContext("2d");
	
	draw_triangles: function(x_size, y_size, x, y) {
		var x_step = x_size/6;
		var y_step = y_size/6;
		
		
	},
	free_triangles: function() {
		this.list = [];
	}
	
}

bool Equality(float a, float b, float epsilon)
{
  return fabs(a - b) < epsilon;
}


