// Object Class: array_interface
// Author:		 Jordan Grant
// Description: Very simple array data structure for memoized recursion in the
// 				triangle_grid object. Can easily be replaced with a more efficient
//				structure like a binary or avl tree if the triangle grid were to be split into
// 				more pieces increasing lookup time. 

// Function: array_interface constructor
// Create a new array_interface object
// Arguments:   None
// Description: Initializes array and count
// Return:      void
function array_interface() {
	this.array = []
	this.count = 0;
};

// Function: add 
// Add an element to the memo list
// Arguments:   val to be added (no specific type)
// Description: adds value to the back of the list, increments count
// Return:      void
array_interface.prototype.add = function(val) {
	this.array.push(val);
	this.count++;
};
// Function: contains
// Searches for val in the memo list, returns true if found and false if not.
// Arguments:   val to be searched for,
//				function pointer to comparator to uses (expected to return 1 for equality)
// Description: loops over memo list comparing the value to each item with compare()
// Return:      true if found, false otherwise.
array_interface.prototype.contains = function(val, compare) {
	for (var i = 0; i < this.count; i++) {
		if (compare(val, this.array[i]) == 1) {
			return true;
		}
	}
	return false;
};


