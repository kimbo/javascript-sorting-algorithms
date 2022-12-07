'use strict';

import {
    insertionSort,
    selectionSort,
    mergeSort,
    heapSort,
    quickSort,
    bubbleSort,
    shellSort,
    combSort,
    radixSort,
    radixSortDecimalDigits,
} from './sorting-algorithms.js'

function runTests() {

    function compareNumbers(a, b) {
        return a - b;
    }

    function randArr(len) {
        let arr = [];
        for (let i = 0; i < len; i++) {
            let randVal = Math.floor(Math.random() * 20000 - 10000);
            arr.push(randVal);
        }
        return arr;
    }

    const sortFunctions = [
        insertionSort,
        selectionSort,
        mergeSort,
        heapSort,
        quickSort,
        bubbleSort,
        shellSort,
        combSort,
        radixSort,
        radixSortDecimalDigits,
    ];

    sortFunctions.forEach(function(sort) {
        let arr10Items = randArr(10);
        let arr10ItemsSorted = [...arr10Items].sort(compareNumbers);
        let arr100Items = randArr(100);
        let arr100ItemsSorted = [...arr100Items].sort(compareNumbers);
        let arr1000Items = randArr(1000);
        let arr1000ItemsSorted = [...arr1000Items].sort(compareNumbers);
        let arr10000Items = randArr(10000);
        let arr10000ItemsSorted = [...arr10000Items].sort(compareNumbers);

        let cases = [
            {
                name: 'three elements',
                arr: [3, 1, 2],
                expected: [1, 2, 3],
            },
            {
                name: 'two elements',
                arr: [2, 1],
                expected: [1, 2],
            },
            {
                name: 'empty array',
                arr: [],
                expected: [],
            },
            {
                name: 'one element',
                arr: [1],
                expected: [1],
            },
            {
                name: 'already sorted',
                arr: [1, 2, 3],
                expected: [1, 2, 3],
            },
            {
                name: 'four elements',
                arr: [5, 1, 3, 2],
                expected: [1, 2, 3, 5],
            },

            {
                name: 'all sequential',
                arr: [5, 4, 1, 3, 0, 2],
                expected: [0, 1, 2, 3, 4, 5],
            },
            {
                name: 'with duplicate values',
                arr: [6, 6, 3, 3, 3, 1, 3, 2],
                expected: [1, 2, 3, 3, 3, 3, 6, 6],
            },
            {
                name: 'with negative numbers',
                arr: [14, 7, 19, -3, -6, 0, 12, -9],
                expected: [-9, -6, -3, 0, 7, 12, 14, 19],
            },
            {
                name: 'more negatives',
                arr: [355, -8632, -7647, 8989, 7727, -9333, -7522, -6265, 4217, -3158],
                expected: [-9333, -8632, -7647, -7522, -6265, -3158, 355, 4217, 7727, 8989],
            },
            {
                name: 'random array of 10 items',
                arr: arr10Items,
                expected: arr10ItemsSorted,
            },
            {
                name: 'random array of 100 items',
                arr: arr100Items,
                expected: arr100ItemsSorted,
            },
            {
                name: 'random array of 1000 items',
                arr: arr1000Items,
                expected: arr1000ItemsSorted,
            },
            {
                name: 'random array of 10000 items',
                arr: arr10000Items,
                expected: arr10000ItemsSorted,
            },
        ]

        cases.forEach(function(c) {
            console.log(`[${sort.name}] Running test "${c.name}"...`);
            let result = sort(c.arr);
            if (c.expected.length != result.length || !c.expected.every(function(value, index) { return value === result[index]})) {
                console.error(`Got ${JSON.stringify(result)}, want ${JSON.stringify(c.expected)}`);
                process.exit(1);
            }
        });
    });
}

runTests();