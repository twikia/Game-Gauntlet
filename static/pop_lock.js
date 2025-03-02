import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

kaboom({ //Options go within the kaboom call
    global: true,
    fullscreen: true, //or false
    scale: 1, //or 2 etc
    debug: true,
    clearColor: [0, 0, 0, 1], //background colour
});


const SLIDER_WIDTH = 600;
const SLIDER_HEIGHT = 20;
const SLIDER_X = width() / 2 - SLIDER_WIDTH / 2;
const SLIDER_Y_START = 250; // Start higher up
const SLIDER_Y_SPACING = 60; // Space between sliders

const RECT_WIDTH = 20;
const RECT_HEIGHT = 40;
const RECT_SPEED = 250;

const CIRCLE_RADIUS = 15;

loadSprite("key", "static\\imgs\\key.png");
loadSprite("lock", "static\\imgs\\lock.png");
loadSprite("background", "static\\imgs\\laser_room.jpg")
loadSprite("won_background", "static\\imgs\\won_back_pop.jpg")

scene("game", () => {

    add([
        sprite("background"),
        pos(0, -150),
        scale(1.3),// Scale up as needed
        "background" // Add tag for moving all backgrounds
    ]);

    add([
        text("Use Space or Click", {
        size: 36, // Adjust font size as needed
        font: "sans-serif", // Use a standard font
        }),
        pos(width() / 2, 24), // Position at the top, centered horizontally
        anchor("top"),       // Anchor to the top center
        color(255, 255, 255), // White color
    ]);


    let currentSliderIndex = 0; // Track the currently active slider
    let currSliderSpeed = rand(100, 300);

    // --- Create Sliders and Rectangles ---
    const sliders = [];
    const playerRects = [];
    const targetCircles = [];

    for (let i = 0; i < 8; i++) {
        const sliderY = SLIDER_Y_START + i * SLIDER_Y_SPACING;

        // Slider
        const slider = add([
            rect(SLIDER_WIDTH, SLIDER_HEIGHT),
            pos(SLIDER_X, sliderY),
            color(150, 150, 150),
            area(),
            "slider",
            { sliderIndex: i } // Add a custom property to identify the slider
        ]);
        sliders.push(slider);

        // Rectangle
        const rectXStart = SLIDER_X;
        const rectY = sliderY - (RECT_HEIGHT - SLIDER_HEIGHT) / 2;
        const playerRect = add([
            sprite("key"),
            scale(.8),
            // rect(RECT_WIDTH, RECT_HEIGHT),
            pos(rectXStart, rectY - 25),
            // color(0, 0, 255),
            area(),
            "playerRect",  // All rectangles get the tag
            { sliderIndex: i, active: (i === 0) } // Only the first is active initially
        ]);
        playerRects.push(playerRect);


        // Target Circle
        const circleX = SLIDER_X + rand(150, SLIDER_WIDTH);
        const circleY = sliderY + SLIDER_HEIGHT / 2;
        const targetCircle = add([
            sprite("lock"),
            scale(.9),
            // circle(CIRCLE_RADIUS),
            pos(circleX, circleY),
            // color(255, 0, 0),
            anchor("center"),
            area(),
            "targetCircle",
            { sliderIndex: i }
        ]);
        targetCircles.push(targetCircle);
    }

    function clicked_stuff(){
        const activeRect = playerRects[currentSliderIndex];
        const activeCircle = targetCircles[currentSliderIndex];

      if (activeRect.pos.x <= activeCircle.pos.x + 5 && activeCircle.pos.x <= activeRect.pos.x + activeRect.width + 5) {

            // Move to the next slider (if there is one)
            currentSliderIndex++;
            if (currentSliderIndex < sliders.length) {
                playerRects[currentSliderIndex - 1].active = false; // Deactivate previous
                playerRects[currentSliderIndex].active = true; // Activate next
            } else {
                // All sliders completed!
                go("win");
                return; // Prevent game over
            }
            currSliderSpeed = rand(500, 900);
        } else {
            // Lose condition
            go("lose");
        }
    };

    onKeyPress("space", clicked_stuff);
    // --- Click Handling ---
    onClick(() => {
        clicked_stuff()
    });


    // --- Movement ---
    onUpdate("playerRect", (playerRect) => {
        if (playerRect.active) { // Only move the active rectangle
          playerRect.move(currSliderSpeed, 0);
        }


        // Game over if any rectangle reaches the end
        if (playerRect.pos.x + RECT_WIDTH > SLIDER_X + SLIDER_WIDTH) {
            go("lose");
        }
    });

});

scene("lose", () => {
//   add([
//     text(`Game Over!\nSpace to Restart`),
//     pos(width()/2, height()/2),
//     anchor("center")
//   ]);

//   onKeyPress("space", () => go("game"));
//   onClick(() => go("game"));
  go("game");
});

scene("win", () => {
    add([
        sprite("won_background"),
        pos(0, -150),
        scale(1.3),// Scale up as needed
        "background" // Add tag for moving all backgrounds
    ]);


     add([
        text(`You Win!\nSpace to Restart`),
        pos(width()/2, height()/2),
        anchor("center")
    ]);

    wait(1.5, () => {
        window.location.href = "/after_game";  // Redirect to the Flask route
    });
});

go("game");