const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
canvas.width = 800;
canvas.height = 400;

// Player
const player = {
  x: 50,
  y: 300,
  width: 30,
  height: 30,
  color: 'red',
  dy: 0,
  gravity: 0.5,
  jumpPower: -10,
  grounded: false,
  speed: 3
};

// Platforms
const platforms = [
  { x: 0, y: 350, width: 800, height: 50, color: '#654321' },
  { x: 200, y: 280, width: 100, height: 20, color: '#654321' },
  { x: 400, y: 220, width: 100, height: 20, color: '#654321' }
];

const keys = {};

// Listen for key events
document.addEventListener('keydown', e => keys[e.code] = true);
document.addEventListener('keyup', e => keys[e.code] = false);

function update() {
  // Horizontal movement
  if (keys['ArrowRight']) player.x += player.speed;
  if (keys['ArrowLeft']) player.x -= player.speed;

  // Apply gravity
  player.dy += player.gravity;
  player.y += player.dy;

  // Jump
  if (keys['Space'] && player.grounded) {
    player.dy = player.jumpPower;
    player.grounded = false;
  }

  // Collision detection
  player.grounded = false;
  platforms.forEach(plat => {
    if (
      player.x < plat.x + plat.width &&
      player.x + player.width > plat.x &&
      player.y + player.height > plat.y &&
      player.y + player.height < plat.y + plat.height + player.dy
    ) {
      player.y = plat.y - player.height;
      player.dy = 0;
      player.grounded = true;
    }
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Draw platforms
  platforms.forEach(plat => {
    ctx.fillStyle = plat.color;
    ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
  });
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
