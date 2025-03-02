document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll("button"); // Select all buttons

    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            const cel = button.closest(".cell"); // Find the parent cell of the button
            clicked(cel); // Call clicked with the cell as an argument
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