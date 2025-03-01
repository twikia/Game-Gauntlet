// static/script.js
document.addEventListener("DOMContentLoaded", function() {
    const myButton = document.getElementById("myButton");
    const myHeading = document.getElementById("myHeading");

    myButton.addEventListener("click", function() {
        myHeading.textContent = "The Heading Has Changed!";
        myHeading.style.color = "red"; // Change the color, too!
    });
});