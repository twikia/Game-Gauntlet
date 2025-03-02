document.addEventListener('DOMContentLoaded', () => {
    const squareBank = document.getElementById('square-bank');
    const grid = document.getElementById('grid');
    
    // Instead of random generation, define your 9 squares manually.
    // Each square is an array of 4 colors: [top-left, top-right, bottom-left, bottom-right].
    const predefinedSquares = [
      ["red", "white", "orange", "yellow"],      // Square 1
      ["yellow", "green", "white", "blue"],      // Square 2
      ["blue", "orange", "green", "red"],        // Square 3
      ["yellow", "orange", "blue", "green"],       // Square 4
      ["blue", "white", "orange", "red"],     // Square 5
      ["red", "green", "white", "yellow"],        // Square 6
      ["blue", "green", "white", "red"],        // Square 7
      ["red", "orange", "green", "yellow"],       // Square 8
      ["yellow", "white", "orange", "blue"]       // Square 9
    ];
  
    // This will hold references to the created square elements.
    const squares = [];
  
    // Create 9 squares based on the predefined arrays.
    predefinedSquares.forEach((colors, i) => {
      // Create a square element (2x2 grid).
      const square = document.createElement('div');
      square.className = 'square';
      square.draggable = true;
      square.dataset.rotation = "0"; // store current rotation in degrees
      
      // Create 4 cells for the 2x2 grid.
      colors.forEach(color => {
        const cell = document.createElement('div');
        cell.style.backgroundColor = color;
        square.appendChild(cell);
      });
      
      // Add double-click event to rotate the square 90° clockwise
      square.addEventListener('dblclick', () => {
        let currentRotation = parseInt(square.dataset.rotation) || 0;
        currentRotation = (currentRotation + 90) % 360;
        square.style.transform = `rotate(${currentRotation}deg)`;
        square.dataset.rotation = currentRotation;
      });
      
      // Set up drag events for each square
      square.addEventListener('dragstart', dragStart);
      square.addEventListener('dragend', dragEnd);
      
      squares.push(square);
      squareBank.appendChild(square);
    });
  
    // Create 9 grid cells for the 3x3 grid
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.className = 'grid-cell';
      cell.addEventListener('dragover', dragOver);
      cell.addEventListener('dragleave', dragLeave);
      cell.addEventListener('drop', drop);
      grid.appendChild(cell);
    }
    
    // Drag & drop functions
    function dragStart(e) {
      // store index of the dragged square
      e.dataTransfer.setData('text/plain', squares.indexOf(e.target));
      e.target.classList.add('dragging');
    }
    
    function dragEnd(e) {
      e.target.classList.remove('dragging');
    }
    
    function dragOver(e) {
      e.preventDefault(); // necessary to allow drop
      e.currentTarget.classList.add('dragover');
    }
    
    function dragLeave(e) {
      e.currentTarget.classList.remove('dragover');
    }
    
    function drop(e) {
      e.preventDefault();
      e.currentTarget.classList.remove('dragover');
      const index = e.dataTransfer.getData('text/plain');
      const square = squares[index];
      // Only drop if the grid cell is empty
      if (!e.currentTarget.querySelector('.square')) {
        e.currentTarget.appendChild(square);
      }
    }
  });
  