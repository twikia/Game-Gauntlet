document.addEventListener("DOMContentLoaded", function() {
    const answerDisplay = document.getElementById("answerDisplay");
    const numButtons = document.querySelectorAll(".num");
    const submitButton = document.getElementById("submit");
    const clearButton = document.getElementById("clear");
    
    // Set a fixed target for this level (for testing, target = 16)
    const targetAnswer = "ABCFEGD";
    
    let answer = "";
  
    // Number button event listeners
    numButtons.forEach(button => {
      button.addEventListener("click", function() {
        // update the answer display
        answer += button.innerText;
        answerDisplay.innerText = answer;
      });
    });
  
    // Equals button event listener
    submitButton.addEventListener("click", function() {
      try {
        if (answer == targetAnswer) {
          // Trigger confetti 
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
          // Reveal the next level button
          document.getElementById('nextLevel').style.display = 'inline-block';
        } else {
          alert("Incorrect, try again!");
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
    window.location.href = "after_game";
});