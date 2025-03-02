document.addEventListener("DOMContentLoaded", function() {
    const answerDisplay = document.getElementById("answerDisplay");
    const numButtons = document.querySelectorAll(".num");
    const submitButton = document.getElementById("submit");
    const clearButton = document.getElementById("clear");
    
    // Set a fixed target for this level (for testing, target = 16)
    const targetNumber = 5;
    
    let answer = "";
  
    // Number button event listeners
    numButtons.forEach(button => {
      button.addEventListener("click", function() {
        // update the answer display
        answer = button.innerText;
        answerDisplay.innerText = answer;
      });
    });
  
    // Equals button event listener
    submitButton.addEventListener("click", function() {
      try {
        if (answer == targetNumber) {
          // Trigger confetti 
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
          // Reveal the next level button
          document.getElementById('nextLevel').style.display = 'inline-block';
        } else {
        //   implement
        }

      } catch (error) {
        alert("Invalid!");
      }
    });
  
    // Clear button event listener
    clearButton.addEventListener("click", function() {
      // Reset the equation and display
      answer = "";
      answerDisplay.innerText = answer;
    });
  });

// Next Level Button Functionality
const nextLevelButton = document.getElementById("nextLevel");
nextLevelButton.addEventListener("click", function() {
    // Redirect level2 page
    window.location.href = "cs2";
});