function swap(arr, i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        swap(arr, i, minIdx);
    }

    return arr;
}

function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        for (let j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
            swap(arr, j, j - 1);
        }
    }

    return arr;
}

function mergeSort(arr) {

    function merge(arr, workArr, leftIdx, middleIdx, rightIdx) {
        let i = leftIdx;
        let j = middleIdx;

        for (let k = leftIdx; k < rightIdx; k++) {
            if (i < middleIdx && (arr[i] <= arr[j] || j >= rightIdx)) {
                workArr[k] = arr[i];
                i++;
            } else {
                workArr[k] = arr[j];
                j++;
            }
        }
    }

    let workArr = [...arr];

    for (let sublistSize = 1; sublistSize < arr.length; sublistSize *= 2) {
        for (let leftIdx = 0; leftIdx < arr.length; leftIdx = leftIdx + 2 * sublistSize) {
            let middleIdx = Math.min(leftIdx + sublistSize, arr.length);
            let rightIdx = Math.min(leftIdx + 2 * sublistSize, arr.length);
            merge(arr, workArr, leftIdx, middleIdx, rightIdx);
            for (let i = 0; i < arr.length; i++) {
                arr[i] = workArr[i];
            }
        }
    }

    return arr;
}

function heapSort(arr) {

    function maxHeapify(arr, i, end) {
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        let largest = i;

        if (left <= end && arr[left] > arr[largest]) {
            largest = left;
        }
        if (right <= end && arr[right] > arr[largest]) {
            largest = right;
        }
        if (largest != i) {
            swap(arr, i, largest);
            maxHeapify(arr, largest, end);
        }
    }

    function buildMaxHeap(arr) {
        for (let i = Math.floor(arr.length / 2); i >= 0; i--) {
            maxHeapify(arr, i, arr.length - 1);
        }
    }

    buildMaxHeap(arr);

    for (let end = arr.length - 1; end > 0; end--) {
        swap(arr, end, 0);
        maxHeapify(arr, 0, end - 1);
    }

    return arr;
}

function quickSort(arr, lo=null, hi=null) {

    function partition(arr, lo, hi) {
        let pivot = arr[Math.floor((hi + lo) / 2)];
        let i = lo - 1;
        let j = hi + 1;

        while (true) {
            for (i++; arr[i] < pivot; i++) {}
            for (j--; arr[j] > pivot; j--) {}
            if (i >= j) {
                return j;
            }
            swap(arr, i, j);
        }
    }

    if (lo == null && hi == null) {
        lo = 0;
        hi = arr.length - 1;
    }

    if (lo >= 0 && hi >= 0 && lo < hi) {
        p = partition(arr, lo, hi)
        quickSort(arr, lo, p);
        quickSort(arr, p + 1, hi);
    }

    return arr;
}

function bubbleSort(arr) {
    while (true) {
        didSwap = false
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) {
                swap(arr, i, i - 1);
                didSwap = true
            }
        }
        if (!didSwap) {
            break
        }
    }

    return arr
}

function shellSort(arr) {
    gaps = [701, 301, 132, 57, 23, 10, 4, 1]  // Ciura gap sequence
    for (let i = 0; i < gaps.length; i++) {
        let gap = gaps[i];
        for (let j = gap; j < arr.length; j++) {
            let tmp = arr[j];
            let k;
            for (k = j; k >= gap && arr[k - gap] > tmp; k -= gap) {
                arr[k] = arr[k - gap];
            }
            arr[k] = tmp;
        }
    }
    return arr;
}

// TEST CASES


function runTests() {

    function compareNumbers(a, b) {
        return a - b;
    }

    function randArr(len) {
        let arr = [];
        for (let i = 0; i < len; i++) {
            let randVal = Math.floor(Math.random() * 1000);
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
                arr: [5, 4, 1, 3, 2],
                expected: [1, 2, 3, 4, 5],
            },
            {
                name: 'with duplicate values',
                arr: [6, 6, 3, 3, 3, 1, 3, 2],
                expected: [1, 2, 3, 3, 3, 3, 6, 6],
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
            }
        });
    });
}

runTests();