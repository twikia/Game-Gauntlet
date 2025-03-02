import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

// static/game.js
const FLOOR_HEIGHT = 48;
const JUMP_FORCE = 800;
const SPEED = 480;

// initialize context
kaboom({ //Options go within the kaboom call
    global: true,
    fullscreen: true, //or false
    scale: 1, //or 2 etc
    debug: true,
    clearColor: [0, 0, 0, 1], //background colour
});

// load assets
loadSprite("kang", "static\\imgs\\kangaroo.png"); // You can host sprites locally if you want!
loadSprite("background", "static\\imgs\\back.jpg");
loadSprite("tree", "static\\imgs\\tree.png");
loadSprite("ufo", "static\\imgs\\ufo.png");

// load sounds
loadSound("boing", "static\\audio\\boing.mp3");
loadSound("win", "static\\audio\\win.mp3")

scene("game", () => {
  // define gravity
  setGravity(1600);

  const BG_SPEED = 50; // Adjust for scrolling speed

    add([
        sprite("background"),
        pos(0, -50),
        scale(1.3),// Scale up as needed
        "background" // Add tag for moving all backgrounds
    ]);

     add([
        sprite("background"),
        pos(0, -50),
        pos(getSprite("background").width * 1.3, 0), //place second copy to the right.
        scale(1.3),// Scale up as needed
        "background"
    ]);


  // add a game object to screen
  const player = add([
    // list of components
    sprite("kang"),
    pos(250, 40),
    area(),
    body(),
  ]);

  // floor
  add([
    rect(width(), FLOOR_HEIGHT),
    outline(4),
    pos(0, height()),
    anchor("botleft"),
    area(),
    body({ isStatic: true }),
    color(255, 125, 25),
  ]);

    add([
        text("Use all 4 arrow keys", {
        size: 36, // Adjust font size as needed
        font: "sans-serif", // Use a standard font
        }),
        pos(width() / 2, 24), // Position at the top, centered horizontally
        anchor("top"),       // Anchor to the top center
        color(255, 255, 255), // White color
    ]);

  function jump() {
    if (player.isGrounded()) {
        play("boing");
      player.jump(1400);
    }
  }

  // jump when user press space
  onKeyPress("space", jump);
  onKeyPress("up", jump);
  onClick(jump);

  function spawnUFO() {
    const size = rand(.4, 1);
    // add tree obj
    add([
        sprite("ufo"),
        scale(size, size),
      area(),
      outline(4),
      pos(width(),rand(1, 600)),
      anchor("botleft"),
      color(255, 180, 255),
      move(LEFT, SPEED * 2),
      "tree",
    ]);

    // wait a random amount of time to spawn next tree
    wait(rand(0.5, 1.5), spawnUFO);
  }

  function spawnTree() {
    // add tree obj
    add([
        sprite("tree"),
        scale(1, rand(.5, 3.0)),
    //   rect(48, rand(32, 96)),
      area(),
      outline(4),
      pos(width(), height() - FLOOR_HEIGHT + 10),
      anchor("botleft"),
      color(255, 180, 255),
      move(LEFT, SPEED),
      "tree",
    ]);

    // wait a random amount of time to spawn next tree
    wait(rand(1.5, 3.0), spawnTree);
  }

  // start spawning trees
  spawnTree();
  spawnUFO();

  // lose if player collides with any game obj with tag "tree"
  player.onCollide("tree", () => {
    // go to "lose" scene and pass the score
    go("lose", score);
    burp();
    addKaboom(player.pos);
  });


  // keep track of score
  let score = 0;

  const scoreLabel = add([text(score), pos(24, 24)]);

  // Continuous movement while key is held
    const keyDown = {  // Use an object to track key states
        left: false,
        right: false,
        down: false
    };

    onKeyDown("left", () => { keyDown.left = true; });
    onKeyDown("right", () => { keyDown.right = true; });
    onKeyDown("down", () => { keyDown.down = true; });

    onKeyRelease("left", () => { keyDown.left = false; });
    onKeyRelease("right", () => { keyDown.right = false; });
    onKeyRelease("down", () => { keyDown.down = false; });

    
    onUpdate("background", (bg) => {
        bg.move(-BG_SPEED, 0); // Move to the left
        // Reset position when it goes off-screen
        if (bg.pos.x <= -bg.width) {
            bg.pos.x += bg.width*2; //times 2 since there are 2
        }
    });

  // increment score every frame
  onUpdate(() => {

    let moveDir = vec2(0, 0); // Use a Vec2 for direction

    if (keyDown.left) moveDir.x -= 1;
    if (keyDown.right) moveDir.x += 1;
    if (keyDown.down) moveDir.y += 1

    player.move(moveDir.x * 400, moveDir.y * 800)

    // Left boundary
    if (player.pos.x < 0) {
        player.pos.x = 0;
    }
    // Right boundary (consider player width)
    if (player.pos.x + player.width > width()) {
        player.pos.x = width() - player.width;
    }


    score++;
    scoreLabel.text = score;

    if (score > 2000) {
        // go.pos("win");
        burp();
        addKaboom(player.pos);
        play("win")
        score = 0
        add([
            text("wooon!!!"),
            pos(width() / 2, height() / 2 + 80),
            scale(2),
            anchor("center"),
          ]);

          wait(1, () => {
            window.location.href = "/after_game";  // Redirect to the Flask route
        });
        
    }
        
  });
});


scene("lose", (score) => {
    go("game");
  });


go("game");