const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
canvas.width = 800;
canvas.height = 400;

// Player settings
const player = {
  x: 50,
  y: 300,
  width: 30,
  height: 30,
  color: 'red',
  dy: 0,
  gravity: 0.6,
  jumpPower: -12,
  grounded: false,
  speed: 3
};

// Platforms
const platforms = [
  { x: 0, y: 350, width: 800, height: 50, color: '#654321' },
  { x: 200, y: 280, width: 100, height: 20, color: '#654321' },
  { x: 400, y: 220, width: 100, height: 20, color: '#654321' }
];

// Key tracking
const keys = {};
document.addEventListener('keydown', e => {
  keys[e.code] = true;

  // Prevent space and arrow key default scrolling
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    e.preventDefault();
  }
});

document.addEventListener('keyup', e => {
  keys[e.code] = false;
});

function update() {
  // Horizontal movement
  if (keys['ArrowRight']) player.x += player.speed;
  if (keys['ArrowLeft']) player.x -= player.speed;

  // Apply gravity
  player.dy += player.gravity;
  player.y += player.dy;

  // Assume player is falling unless collision detected
  player.grounded = false;

  // Collision detection
  for (let plat of platforms) {
    if (
      player.x < plat.x + plat.width &&
      player.x + player.width > plat.x &&
      player.y + player.height > plat.y &&
      player.y + player.height - player.dy <= plat.y
    ) {
      // Land on platform
      player.y = plat.y - player.height;
      player.dy = 0;
      player.grounded = true;
    }
  }

  // Jumping logic (Space OR Up Arrow)
  if ((keys['Space'] || keys['ArrowUp']) && player.grounded) {
    player.dy = player.jumpPower;
    player.grounded = false;
  }

  // Respawn if falling off-screen
  if (player.y > canvas.height) {
    player.x = 50;
    player.y = 300;
    player.dy = 0;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Draw platforms
  for (let plat of platforms) {
    ctx.fillStyle = plat.color;
    ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
  }
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
