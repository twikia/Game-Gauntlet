document.addEventListener("DOMContentLoaded", function() {
    const targetNumberSpan = document.getElementById("targetNumber");
    const equationDisplay = document.getElementById("equationDisplay");
    const numButtons = document.querySelectorAll(".num");
    const opButtons = document.querySelectorAll(".op");
    const equalsButton = document.getElementById("equals");
    const clearButton = document.getElementById("clear");
    const didYouWin = document.getElementById('didYouWin');
    
    // Set a fixed target for this level (for testing, target = 16)
    const targetNumber = 16;
    targetNumberSpan.innerText = targetNumber;
    
    let currentEquation = "";
  
    // Number button event listeners
    numButtons.forEach(button => {
      button.addEventListener("click", function() {
        // Append the number to the equation and update the display
        currentEquation += button.innerText;
        equationDisplay.innerText = currentEquation;
        // Hide this button so it can't be used again
        button.style.display = "none";
      });
    });
  
    // Operator button event listeners
    opButtons.forEach(button => {
      button.addEventListener("click", function() {
        // Only allow an operator if the equation isn’t empty 
        // and the last character isn’t already an operator
        if (currentEquation !== "" && !isNaN(currentEquation[currentEquation.length - 1])) {
          currentEquation += button.innerText;
          equationDisplay.innerText = currentEquation;
          // Hide this operator button so it can't be used again
          button.style.display = "none";
        }
      });
    });
  
    // Equals button event listener
    equalsButton.addEventListener("click", function() {
      try {
        // Evaluate the equation (using eval for simplicity)
        const result = eval(currentEquation);
        let text_return = "";
        if (result === targetNumber) {
          text_return = "Congratulations! Your equation equals the target number!";
          // Trigger confetti (make sure you've included the confetti library)
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
          // Reveal the next level button
          document.getElementById('nextLevel').style.display = 'block';
        } else {
          text_return = "Try again loser.";
        }
        didYouWin.innerText = text_return;
      } catch (error) {
        alert("Invalid equation!");
      }
    });
  
    // Clear button event listener
    clearButton.addEventListener("click", function() {
      // Reset the equation and display
      currentEquation = "";
      equationDisplay.innerText = currentEquation;
      didYouWin.innerText = "Try to evaluate!";
      // Restore all number and operator buttons
      numButtons.forEach(button => {
        button.style.display = "inline-block"; // or "block" based on your CSS
      });
      opButtons.forEach(button => {
        button.style.display = "inline-block";
      });
    });
  });
  
  // Next Level Button Functionality
  const nextLevelButton = document.getElementById("nextLevel");
  nextLevelButton.addEventListener("click", function() {
    // Redirect to mathgameL2.html (your level 2 page)
    window.location.href = "level2";
  });
  