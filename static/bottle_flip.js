import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

kaboom({ //Options go within the kaboom call
    global: true,
    fullscreen: true, //or false
    scale: 1, //or 2 etc
    debug: true,
    clearColor: [0, 0, 0, 1], //background colour
});


const BOTTLE_WIDTH = 50;
const BOTTLE_HEIGHT = 110;
const FLOOR_Y = height() - 50; // Position the floor
const INITIAL_POS = vec2(width() / 2, FLOOR_Y - BOTTLE_HEIGHT); // Starting position
const GRAVITY = 1600;
const JUMP_FORCE = 1500;      // Initial upward force
const ROTATION_SPEED = 500;  // Degrees per second
const WIN_ANGLE_TOLERANCE = 5; // +/- degrees from perfectly vertical

let isFlipping = false;
let rotationSpeed = 60;

loadSprite("bottle", "static\\imgs\\bottle.png");
loadSprite("background", "static\\imgs\\bottle_background.jpg");
loadSprite("won_background", "static\\imgs\\won_back_pop.jpg");


scene("game", () => {
    setGravity(GRAVITY);


    add([
        sprite("background"),
        pos(0, -50),
        scale(1),// Scale up as needed
        "background" // Add tag for moving all backgrounds
    ]);


    // --- Bottle ---
    const bottle = add([
        sprite("bottle"),
        // rect(BOTTLE_WIDTH, BOTTLE_HEIGHT),
        pos(INITIAL_POS),
        // color(0, 1, 1), // Cyan
        anchor("center"),   // Anchor at the bottom center
        area(),
        rotate(0),
        body(),
        "bottle"
    ]);

    // --- Floor ---
    add([
        rect(width(), 100),
        pos(0, FLOOR_Y),
        color(255, 0, 25),
        outline(4),
        area(),
        body({ isStatic: true }),
    ]); 
    

    const statusText = add([
        text("Use space to jump and rotate!", {
        size: 36, // Adjust font size as needed
        font: "sans-serif", // Use a standard font
        }),
        pos(width() / 2, 24), // Position at the top, centered horizontally
        anchor("top"),       // Anchor to the top center
        color(255, 255, 255), // White color
    ]);


    // --- Input Handling ---
    onKeyPress("space", () => {

        if (!isFlipping && bottle.isGrounded()) {
            isFlipping = true;
            bottle.jump(JUMP_FORCE);
            statusText.text = "Flipping...";
            // Don't set rotationSpeed here; we'll handle it in onUpdate
        }
        rotationSpeed = 500;
    });

    onKeyRelease("space", () => {
        // Stop rotating when space is released
        rotationSpeed = 60;
    });

    // --- Update Loop ---
    onUpdate("bottle", (bottle) => {
      if (isFlipping) {
        bottle.angle += rotationSpeed * dt();  // dt() is the time since last frame

        // Check for landing
        if (bottle.isGrounded()) {
          isFlipping = false; // Stop flipping once landed
          const angle = bottle.angle % 360; // Normalize angle to 0-360

          // Check for win/lose conditions
          if (
            (angle >= 360 - WIN_ANGLE_TOLERANCE || angle <= WIN_ANGLE_TOLERANCE)
          ) {
              go("win");

          } else {
            // Lose
            statusText.text = `Error of ${Math.round(Math.min(Math.abs(360 - angle), Math.abs(angle)) * 100) / 100} degrees!!\n         (get <5)`;
            resetBottle();
          }
        }
      }
    });

    function resetBottle() {
        bottle.pos = vec2(INITIAL_POS); // Copy the initial position
        bottle.angle = 0;             // Reset rotation
        bottle.stopped = false;         // Make sure it's not considered stopped
        isFlipping = false;            // Reset flip state
        rotationSpeed = 60;             // Reset rotation speed
        setGravity(GRAVITY); //Ensure gravity is still correct.
    }

});

scene("win", () => {

    add([
        sprite("won_background"),
        pos(0,0),
        scale(1.2),// Scale up as needed
        "background" // Add tag for moving all backgrounds
    ]);

    add([
        text(`NIIIICEEEE!`),
        pos(width()/2, height()/2),
        anchor("center")
    ]);

  wait(1, () => {
    window.location.href = "/after_game";  // Redirect to the Flask route
});
});
go("game");



// const ROT_SPEED = 120; // Degrees per second

//         // Load a sprite (replace with your own sprite if you have one)
//         loadSprite("rectangle", "https://kaboomjs.com/sprites/bean.png");

//         scene("main", () => {

//             // Add the rectangle sprite
//             const rect = add([
//                 sprite("rectangle"), // Use the sprite
//                 rotate(0),
//                 pos(width() / 2, height() / 2), // Center of the screen
//                 anchor("center"),         // Rotate around the center
//                 "rotatingRect"          // Tag for easy access
//             ]);

//             // Rotate the rectangle every frame
//             onUpdate("rotatingRect", (rect) => {
//                 rect.angle += ROT_SPEED * dt(); // Rotate based on time
//             });
//         });

// go("main");