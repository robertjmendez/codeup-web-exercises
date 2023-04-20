(function(){
    "use strict";

    /**
     * TODO:
     * Create an array of 4 people's names and store it in a variable called
     * 'names'.
     */

    let names = ["Julie", "Sam", "Tom", "Mark", "Kyle"];

    /**
     * TODO:
     * Create a log statement that will log the number of elements in the names
     * array.
     */

    console.log(names.length);
    /**
     * TODO:
     * Create log statements that will print each of the names individually by
     * accessing each element's index.
     */

    console.log("Hard Coded Index: " + names[0]);
    console.log("Hard Coded Index: " + names[1]);
    console.log("Hard Coded Index: " + names[2]);
    console.log("Hard Coded Index: " + names[3]);
    console.log("Hard Coded Index: " + names[4]);

    /**
     * TODO:
     * Write some code that uses a for loop to log every item in the names
     * array.
     */
    for(let i = 0; i < names.length; i++) {
        console.log("for loop: " + names[i]);
    }
    /**
     * TODO:
     * Refactor your above code to use a `forEach` loop
     */

    names.forEach(function (elements){
        console.log("For Each loop: " + elements);
    })

    /**
     * TODO:
     * Create the following three functions, each will accept an array and
     * return an an element from it
     * - first: returns the first item in the array
     * - second: returns the second item in the array
     * - last: returns the last item in the array
     *
     * Example:
     *  > first([1, 2, 3, 4, 5]) // returns 1
     *  > second([1, 2, 3, 4, 5]) // returns 2
     *  > last([1, 2, 3, 4, 5]) // return 5
     */
    function first(array) {
        return array[0];
    }
    function second(array) {
        return array[1];
    }
    function last(array) {
        let lastIndex = array.length - 1;
        return array[lastIndex];
    }
    console.log("First index function: " + first(names));
    console.log("Second index function: " + second(names));
    console.log("Last index function: " + last(names));

})();