// get the container element where bars will be displayed
const barContainer = document.getElementById("barContainer");

function generateBars(numBars) {
    const array = []; // array to store the random numbers
    const barElements = []; // array to store the bar elements

    // clear previous bars from the container
    barContainer.innerHTML = "";

   
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

async function animateBubbleSort(array, barElements) {
    for(let i = 0; i < array.length - 1; i++) { // loop through the array excluding the last element.
        for (let j = 0; j < array.length - i - 1; j++) { // loop through unsorted array

            barElements[j].style.backgroundColor = "red"; // highlight the current element being compared
            barElements[j+1].style.backgroundCOlor = "red" // highlight the 2nd element being compared
            await new Promise(resolve => setTimeout(resolve, 10)); // delay for visualization
            
            if (array[j] > array[j + 1]) { // compare elements next to eachother 
                [array[j], array[j +1]] = [array[j + 1], array[j]]; // swap array elements accordingly

                // swap bar height visually
                [barElements[j].style.height, barElements[j+1].style.height] = 
                    [barElements[j+1].style.height, barElements[j].style.height]; 
            
            }
        }
    }
}

async function animateQuickSort(array, barElements) {
    async function splitArray(start, end) {
        let ref_point = array[end]; // chose the reference point (last element)
        let i = start - 1; // index of the smaller element

        for (let j = start; j < end; j++) { // loop through the sub array
            if (array[j] < ref_point) { // check if current element is the smaller element
                i++; // increment index of smaller element
                [array[i], array[j]] = [array[j], array[i]]; // swap array elements

                // Swap bar height visually
                [barElements[i].style.height, barElements[j].style.height] =
                    [barElements[j].style.height, barElements[i].style.height];
            }
        }

        
        [array[i + 1], array[end]] = [array[end], array[i + 1]]; // move reference point to its correct position
        
        // visually move the reference point 
        [barElements[i + 1].style.height, barElements[end].style.height] =
            [barElements[end].style.height, barElements[i + 1].style.height];

        return i + 1; // return index of the ref point
    }

    async function quickSort(start, end) {
        if (start >= end) return; // check if start index is >= the end index.
        // split the array and sort the segments
        let index = await splitArray(start, end);
        await quickSort(start, index - 1); // Sort the left segment
        await quickSort(index + 1, end); // sort the right segment
    }

    // Call quickSort initially with the whole array range
    await quickSort(0, array.length - 1);
}


// Event listeners to generate bars when content is loaded and buttons are clicked
window.addEventListener('DOMContentLoaded', () => {
    const numBars = 50; // number of bars to generate
    generateBars(numBars);
});

document.getElementById("animateBubbleSortBtn").addEventListener("click", async () => {
    const numBars = 50;
    const { array, barElements } = generateBars(numBars); // Generate bars
    await animateBubbleSort(array, barElements); // Call animateBubbleSort with the generated array and bar elements
});

document.getElementById("animateQuickSortBtn").addEventListener("click", async () => {
    const numBars = 50;
    const { array, barElements } = generateBars(numBars); // Generate bars
    await animateQuickSort(array, barElements); // Call animateQuickSort with the generated array and bar elements
});




