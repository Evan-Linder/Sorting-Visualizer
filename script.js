// get the container element where bars will be displayed
const boxContainer = document.getElementById("barContainer");

function generateBars(numBars) {
    const array = []; // array to store the random numbers
    const boxElements = []; // array to store the bar elements

    // clear previous bars from the container
    boxContainer.innerHTML = "";

   
    for (let i = 0; i < numBars; i++) {
        const randomNumber = Math.floor(Math.random() * 100) + 1; // random number between 1 and 100
        array.push(randomNumber); // add random number to the array

       
        const bar = document.createElement("div"); // create a new bar element
        bar.classList.add("bar"); // add bar class to the element
        bar.style.height = `${randomNumber * 5}px`; // Set the height of the bar
        boxElements.push(bar); // Add bar element to the array
        boxContainer.appendChild(bar); // Append bar element to the container
    }

    return { array, boxElements }; // return both the arrays
}

// Event listener to generate bars when content is loaded.
window.addEventListener('DOMContentLoaded', () => {
    const numBars = 10; // number of bars to generate
    generateBars(numBars);
});




