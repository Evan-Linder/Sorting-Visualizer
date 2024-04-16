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

// Event listener to generate bars when content is loaded.
window.addEventListener('DOMContentLoaded', () => {
    const numBars = 50; // number of bars to generate
    generateBars(numBars);
});

document.getElementById("animateBubbleSortBtn").addEventListener("click", async () => {
    const numBars = 50;
    const { array, barElements } = generateBars(numBars); // Generate bars
    await animateBubbleSort(array, barElements); // Call animateBubbleSort with the generated array and bar elements
});




