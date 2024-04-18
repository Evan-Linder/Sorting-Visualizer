// get the container element where bars will be displayed
const barContainer = document.getElementById("barContainer");
let delay = 50; // delay when adjusting slider

function generateBars(numBars) {
    const array = []; // array to store the random numbers
    const barElements = []; // array to store the bar elements

    // clear previous bars from the container
    barContainer.innerHTML = "";

    // Generate random bars
    for (let i = 0; i < numBars; i++) {
        const randomNumber = Math.floor(Math.random() * 100) + 1; // random number between 1 and 100
        array.push(randomNumber); // add random number to the array

        const bar = document.createElement("div"); // create a new bar element
        bar.classList.add("bar"); // add bar class to the element
        bar.style.height = `${randomNumber * 5}px`; // Set the height of the bar
        barElements.push(bar); // Add bar element to the array
        barContainer.appendChild(bar); // Append bar element to the container
    }

    return { array, barElements }; // return both the arrays
}

async function animateSort(sortType, numBars) {
    const { array, barElements } = generateBars(numBars); // generate bars and retrieve bar and array elements
    await sortType(array, barElements); // call the user chosen sorting method
}

async function animateBubbleSort(array, barElements) {
    for (let i = 0; i < array.length - 1; i++) { // loop through the array excluding the last element.
        for (let j = 0; j < array.length - i - 1; j++) { // loop through unsorted array

            barElements[j].style.backgroundColor = "red"; // highlight the current element being compared
            barElements[j + 1].style.backgroundColor = "red"; // highlight the 2nd element being compared
            await new Promise(resolve => setTimeout(resolve, delay)); // delay for visualization

            if (array[j] > array[j + 1]) { // compare elements next to each other 
                [array[j], array[j + 1]] = [array[j + 1], array[j]]; // swap array elements accordingly

                // swap bar height visually
                [barElements[j].style.height, barElements[j + 1].style.height] =
                    [barElements[j + 1].style.height, barElements[j].style.height];

            }
            // reset bar colors
            barElements[j].style.backgroundColor = "";
            barElements[j + 1].style.backgroundColor = "";
        }
    }
}

async function animateQuickSort(array, barElements) {

    async function splitArray(start, end) {
        let ref_point = array[end]; // chose the reference point (last element)
        let i = start - 1; // index of the smaller element

        for (let j = start; j < end; j++) { // loop through the sub array

            barElements[j].style.backgroundColor = "#007cb9"; // highlight current element being compared
            barElements[end].style.backgroundColor = "blue"; // highlight the ref point
            await new Promise(resolve => setTimeout(resolve, delay));

            if (array[j] < ref_point) { // check if current element is the smaller element
                i++; // increment index of smaller element
                [array[i], array[j]] = [array[j], array[i]]; // swap array elements

                // Swap bars visually
                [barElements[i].style.height, barElements[j].style.height] =
                    [barElements[j].style.height, barElements[i].style.height];
            }
            // reset bar colors
            barElements[j].style.backgroundColor = "";
            barElements[end].style.backgroundColor = "";
        }

        [array[i + 1], array[end]] = [array[end], array[i + 1]]; // move reference point to its correct position

        // visually move the reference point 
        [barElements[i + 1].style.height, barElements[end].style.height] =
            [barElements[end].style.height, barElements[i + 1].style.height];
        await new Promise(resolve => setTimeout(resolve, delay))

        return i + 1; // return index of the ref point
    }

    async function quickSort(start, end) {
        if (start >= end) return; // check if start index is >= the end index.
        let index = await splitArray(start, end); // split the array into 2 segments
        await quickSort(start, index - 1); // Sort the left segment
        await quickSort(index + 1, end); // sort the right segment
    }
    await quickSort(0, array.length - 1); // call quickSort with the whole array
}

async function animateMergeSort(array, barElements) {

    async function mergeArrays(start, middle, end) {
        const tempArray = new Array(end - start + 1); // array to store merged elements
        let i = start; // set i = to the start of the left sub array
        let j = middle + 1; // set j = to the middle of the right subarray
        let k = 0; // set k = index for the temp array

        while (i <= middle && j <= end) { // check if i and j are both <= to their boundaries
            if (array[i] <= array[j]) { // compare i <= j
                tempArray[k++] = array[i++]; // store the smaller element in tempArray
            } else { //
                tempArray[k++] = array[j++]; // j is the smaller element so store it in the temp array.
            }
        }

        // copy any remaining elements from half 1
        while (i <= middle) {
            tempArray[k++] = array[i++];
        }

        // copy any remaining elements from half 2
        while (j <= end) {
            tempArray[k++] = array[j++];
        }

        for (let len = 0; len < tempArray.length; len++) { // loop through temp array
            array[start + len] = tempArray[len];
        }

        for (let m = start; m <= end; m++) { // loop through the sorted array
            await new Promise(resolve => setTimeout(resolve, delay));
            barElements[m].style.height = `${array[m] * 5}px`; // update bar height
            barElements[m].style.backgroundColor = "green";
        }
    }

    async function mergeSort(start, end) {
        if (start < end) { // check if start index is less than end index
            const middle = Math.floor((start + end) / 2); // calc middle index
            await mergeSort(start, middle); // sort the left half 
            await mergeSort(middle + 1, end); // sort the right half
            await mergeArrays(start, middle, end); // merge the sorted halves
        }
    }
    await mergeSort(0, array.length - 1); // merge sort the halves

    for (let i = 0; i < barElements.length; i++) { // loop through merge sorted array
        barElements[i].style.backgroundColor = ""; // remove color
    }
}

// event listeners
window.addEventListener('DOMContentLoaded', () => {
    const numBars = 50; // number of bars to generate
    generateBars(numBars); // generate the bars.
});


document.getElementById("speedInput").addEventListener("input", () => {
    const speed = parseInt(document.getElementById("speedInput").value); // get the value of the slider
    delay = 110 - speed; // set the delay
});


document.getElementById("animateBubbleSortBtn").addEventListener("click", async () => {
    const maxBars = 100; // maximum number of bars allowed
    let numBars = 50; // number of bars to generate
    const inputNumBars = parseInt(document.getElementById("numBarsInput").value); // get input from user
    if (inputNumBars <= maxBars) { // ensure user input is not greater than 100
        numBars = inputNumBars; // set user input to the parameter
    } else {
        numBars = 100
    }
    await animateSort(animateBubbleSort, numBars)
});

document.getElementById("animateQuickSortBtn").addEventListener("click", async () => {
    const maxBars = 100; 
    let numBars = 50;
    const inputNumBars = parseInt(document.getElementById("numBarsInput").value);
    if (inputNumBars <= maxBars) {
        numBars = inputNumBars;
    } else {
        numBars = 100
    }
    await animateSort(animateQuickSort, numBars)
});

document.getElementById("animateMergeSortBtn").addEventListener("click", async () => {
    const maxBars = 100; 
    let numBars = 50; 
    const inputNumBars = parseInt(document.getElementById("numBarsInput").value);
    if (inputNumBars <= maxBars) {
        numBars = inputNumBars;
    } else {
        numBars = 100
    }
    await animateSort(animateMergeSort, numBars)
});