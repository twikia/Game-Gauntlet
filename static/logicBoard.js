document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll("button"); // Select all buttons

    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            const buttonName = button.getAttribute("name") || button.id || "Unnamed Button"; // Get name or ID
            console.log("Button clicked:", buttonName); // Log the button name

            if (buttonName === "XO")
            {
                const cel = button.closest(".cell"); // Find the parent cell of the button
                clicked(cel); // Call clicked with the cell as an argument
            }
            else if (buttonName === "submit"){
                checkAnswers();
            }
        });
    });
});

function clicked(cel) {
    // Use getComputedStyle to get the actual background color
    const currColor = window.getComputedStyle(cel).backgroundColor;

    // Check the current color and cycle through red, green, and white
    if (currColor === "rgb(255, 255, 255)" || currColor === "transparent") {
        // Change to red if current color is white or transparent
        cel.style.backgroundColor = "rgb(225, 62, 62)";
    } else if (currColor === "rgb(225, 62, 62)") {
        // Change to green if current color is red
        cel.style.backgroundColor = "rgb(87, 164, 99)";
    } else {
        // Change to white if current color is neither red nor green
        cel.style.backgroundColor = "rgb(255, 255, 255)";
    }
}

function checkAnswers() {

    const correctAnswers = ["CEO", "Intern", "Developer", "Project Manager", "App", "Email", "Debug", "Webpage"]; 
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; 

    for (let i = 1; i <= 8; i++) {
        let userAnswer = document.getElementById("q" + i).value.trim().toLowerCase();
        let correctAnswer = correctAnswers[i - 1].toLowerCase();

        let resultText = document.createElement("p");
        if (userAnswer === correctAnswer) {
            resultText.innerHTML = `Question ${i}: Correct`;
            resultText.classList.add("correct");
        } else {
            resultText.innerHTML = `Question ${i}: Wrong, Loser`;
            resultText.classList.add("incorrect");
        }
        resultsDiv.appendChild(resultText);
    }
}