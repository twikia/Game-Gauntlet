document.addEventListener("DOMContentLoaded", function() {
    const targetNumberSpan = document.getElementById("targetNumber");
    const equationDisplay = document.getElementById("equationDisplay");
    const numButtons = document.querySelectorAll(".num");
    const opButtons = document.querySelectorAll(".op");
    const equalsButton = document.getElementById("equals");
    const clearButton = document.getElementById("clear");
    const didYouWin = document.getElementById('didYouWin');
    
    // Set a fixed target for this level
    const targetNumber = 26;
    targetNumberSpan.innerText = targetNumber;
    
    let currentEquation = "";
    // Query for parentheses buttons
    const parenButtons = document.querySelectorAll(".paren");

    // Parentheses button event listeners
    parenButtons.forEach(button => {
    button.addEventListener("click", function() {
        currentEquation += button.innerText;
        equationDisplay.innerText = currentEquation;
        // If you want them to be used only once, hide them:
        button.style.display = "none";
    });
    });
  
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
  
    equalsButton.addEventListener("click", function() {
        try {
          // Replace implicit multiplication (e.g., '6(11+2)' becomes '6*(11+2)')
          let safeEquation = currentEquation
          // Insert * when a digit or ) is followed by an (
          .replace(/(\d|\))\(/g, '$1*(')
          // Insert * when ) is followed by a digit
          .replace(/\)(?=\d)/g, ')*');          // Now evaluate the modified expression
          const result = eval(safeEquation);
          let text_return = "";
          if (result === targetNumber) {
            text_return = "You Win The Math Game!!";
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
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
      parenButtons.forEach(button => {
        button.style.display = "inline-block";
      });
    });
  });
  