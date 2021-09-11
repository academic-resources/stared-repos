// Necessary Imports
const { LinkedList, Node } = require("./linkedList.js");
const { bubbleSort } = require("./bubbleSort.js");
// const { selectionSort } = require("./selectionSort.js");
const { insertionSort } = require("./insertionSort.js");
// const { mergeSort } = require("./mergeSort.js");
// const { quickSort } = require("./quickSort.js");
// const { binarySearch } = require("./binarySearch.js");

//fill list with rand integers between 2 values
let createRandList = (list, min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    let counter = 0;
    while (counter !== max) {
        //get random integer between 2 values.
        let rand = Math.floor(Math.random() * (max - min + 1) + min);

        //generate unique randoms
        if (!list.contains(rand)) {
            list.addHead(rand);
            counter++;
        }
    }
}

let list = new LinkedList();
createRandList(list, 1, 10);
list.printValues();
// list.insertAt(0, 99);
// list.printValues();
insertionSort(list).printValues();

/*
    // Function Calls

    let arrOfLists = [];
    let arrOfSorts = [bubbleSort, selectionSort, insertionSort, mergeSort, quickSort, shellSort];


    for (let i = 0; i <= 5; i++) {
        //setup list
        arrOfLists.push(createRandList(new LinkedList, 1, 10));
        arrOfLists[i].printValues;

        //sort list
        arrOfSorts[i](arrOfLists[i]);

        //prints list
        arrOfLists[i].printValues();
        console.log("\n")
    }
*/
