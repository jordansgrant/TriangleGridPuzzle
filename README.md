TriangleGridPuzzle - Hiring Quiz

Author: Jordan Grant

### Usage

Double click the html file to open it in your browser or navigate to it in the browser as follows:

file:///[Path to main.html]

### Description:

I implemented the puzzle as a simple web page that can be loaded using file:///[path to html] to load in a browser. The browser is a clean
way to insure portability and prevent the reviewer from needing any special libraries or software installed

The bulk of the logic is contained in __triangle_grid.js__ . __draw_canvas.js__ and __array_interface.js__ are implementations of interfaces
used by  __triangle_grid.js__ for drawing the grid to an HTML5 canvas tag and for memoizing the recursive grid generation respectively.

#### Definition of a recursive calculation of the grid

After inspecting the specifications of the 6 x 12 grid of triangles I noticed that it has an intrinsically recursive pattern. Given the top left (root) point
of the grid you can traverse the tree left by moving 1 __"step"__  (y size of the grid / 6) in the Y direction and you can move right in the tree by
moving 1 __step__ in the x direction. Each node in the tree is described as the top left corner coordinates of a rectangle which will contain 2 triangles
in the grid. From here on out the node of each child triangle will be referred to as the triangles minimum point, as it is also the point in the triangle
where the x and y values are minimized.

This recursive definition of the grid has one major problem performance wise, which is the highly redundant nature of the recursion (ie many points would
be recursed to multiple times). I decided to ameliorate this issue with memoization so that the recursion can be broken on repeat nodes.

#### Drawing triangles

Given a node you can draw its child triangles by generating 3 additional points:

1. __Odd Side Point__ - Same x coordinate as node, node's y coordinat plus 1 __step__ in the y direction
2. __Even Size Point__ - node's x coordiante plus a step in the x direction, same y coordinate as node
3. __Maximum Point__ - node's x coordinate plus a step in the x direction, node's y coordinate plus a step in the y direction.

You may then form the triangles with the following lines:

* node to __Maximum Point__
* __Maximum Point__ to __Odd Side Point__
* __Odd Side Point__ to node
* node to __Even Side Point__
* __Even Side Point__ to __Maximum Point__


#### User interface considerations

The user interface ustilizes a standard and highly regarded stack of front in tools for Web Development (JQuery, HTML5, and Twitter Bootstrap). 

The user interacts with the page by selecting points from HTML5 number input forms. Strict constraints were put on the users ability to select points in the canvas.
Only the up and down arrows of the number input are allowed for specifying a coordinate value and a minimum of 0 and maximum of 600 prevent out of bounds points.
Finally, the step was set to match the x and y step of the triangle grid so that only valid coordinate values could be entered. 

Adding these UI Constraints drastically simplifies validation of valid triangle coordinates input by the user. However, even with these constraints invalid coordinates can
be issued, leading to the need of a validation function in the triangle_grid.js object. Validation is carried out as follows:

The minimum (node) point of the triangle is determined. With this information I can find the 3 possible points of the larger rectangle that encompases the two possible 
triangles at this node. A simple comparision of the actual 2 additional points given to the possible 3 points will determine if the triangle is valid or not. If the 2 actual
points exactly match the calculated __Maximum Point__ and one of the side points then the triangle is valid.

#### Row/Column Calculation

Given a valid set of 3 triangle coordinates (having been validated in the method above), the Row and Column can be determined as follows:

* Find the minium (node) point. 
* The row of the triangle can be found by taking the __y__ value of the node point and dividing it by the step in the y direction. To get the alpha representation of
the row you may then transform it to its ascii character representation by adding 65. 
* The column can be found by taking the __x__ value of the node point and dividing it by the step in the x direction. This value is multiplied by 2 and then 1 is added
to give the possible odd triangle column for this root node. You may then compare the x value to each of the other points x values. If both other points have a greater
x value than the node then triangle is the even column and 1 can be added to the value of the odd column, else the column is the odd column.
