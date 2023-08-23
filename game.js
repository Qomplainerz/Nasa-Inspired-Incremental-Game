// Spaceship object
const spaceship =
{
	x: 375,
	y: 550,
	width: 50,
	height: 50,
	speed: 1,
	fuel: 100,
	health: 100,
	distance: 0,
	speedLevel: 0,
	fuelLevel: 0,
	sizeLevel: 0,
	healthLevel: 0
};

// Speed upgrades
const speedUpgrades =
[
	{ cost: 100, effect: 1 },
	{ cost: 200, effect: 2 },
	{ cost: 300, effect: 3 }
];

// Fuel upgrades
const fuelUpgrades =
[
	{ cost: 200, effect: 10 },
	{ cost: 400, effect: 20 },
	{ cost: 600, effect: 30 }
];

// Size upgrades
const sizeUpgrades =
[
	{ cost: 250, effect: 5 },
	{ cost: 500, effect: 10 },
	{ cost: 750, effect: 15 }
];

// Health upgrades
const healthUpgrades =
[
	{ cost: 150, effect: 10 },
	{ cost: 300, effect: 20 },
	{ cost: 450, effect: 30 }
];

// Reference to the spaceship element
const spaceshipElement = document.getElementById('spaceship');

// Variables to track time for meteoroid collision check
let lastCollisionCheck = Date.now();

function gameLoop()
{
	// Update spaceship position
	spaceship.y -= spaceship.speed;
	spaceshipElement.style.bottom = spaceship.y + 'px';

	// Update distance traveled
	spaceship.distance += spaceship.speed;
	document.getElementById('xp').innerText = `XP: ${spaceship.distance}`;

	// Decrease fuel
	spaceship.fuel -= 0.1;
	if (spaceship.fuel <= 0)
	{
		spaceship.fuel = 0;
		resetGame();
		return;
	}
	document.getElementById('fuel').innerText = `Fuel: ${spaceship.fuel.toFixed(2)}%`;

	// Check for meteoroid collision once per second
	if (Date.now() - lastCollisionCheck >= 1000)
	{
		if (Math.random() < 0.05)
		{
			collideWithMeteoroid();
		}
		lastCollisionCheck = Date.now();
	}

	// Continue game loop
	requestAnimationFrame(gameLoop);
}

// Start game loop
gameLoop();

// Upgrade speed
function upgradeSpeed()
{
	if (spaceship.speedLevel < speedUpgrades.length && spaceship.distance >= speedUpgrades[spaceship.speedLevel].cost)
	{
		spaceship.speed += speedUpgrades[spaceship.speedLevel].effect;
		spaceship.distance -= speedUpgrades[spaceship.speedLevel].cost;
		spaceship.speedLevel++;
		document.getElementById('xp').innerText = `XP: ${spaceship.distance}`;
		document.getElementById('btn_upgrade_speed').innerText = `Increase Speed (Cost: ${speedUpgrades[spaceship.speedLevel].cost} XP)`;
	}
}

// Upgrade fuel
function upgradeFuel()
{
	if (spaceship.fuelLevel < fuelUpgrades.length && spaceship.distance >= fuelUpgrades[spaceship.fuelLevel].cost)
	{
		spaceship.fuel += fuelUpgrades[spaceship.fuelLevel].effect; // Increase fuel capacity
		spaceship.distance -= fuelUpgrades[spaceship.fuelLevel].cost;
		spaceship.fuelLevel++;
		document.getElementById('xp').innerText = `XP: ${spaceship.distance}`;
		document.getElementById('btn_upgrade_fuel').innerText = `Increase Fuel (Cost: ${fuelUpgrades[spaceship.fuelLevel].cost} XP)`;
	}
}

// Upgrade health
function upgradeHealth()
{
	if (spaceship.healthLevel < healthUpgrades.length && spaceship.distance >= healthUpgrades[spaceship.healthLevel].cost)
	{
		spaceship.health += healthUpgrades[spaceship.healthLevel].effect;
		spaceship.distance -= healthUpgrades[spaceship.healthLevel].cost;
		spaceship.healthLevel++;
		document.getElementById('xp').innerText = `XP: ${spaceship.distance}`;
		document.getElementById('btn_upgrade_health').innerText = `Increase Health (Cost: ${healthUpgrades[spaceship.healthLevel].cost} XP)`;
	}
}

// Decrease size
function upgradeSize()
{
	if (spaceship.sizeLevel < sizeUpgrades.length && spaceship.distance >= sizeUpgrades[spaceship.sizeLevel].cost)
	{
		spaceship.width -= sizeUpgrades[spaceship.sizeLevel].effect;
		spaceship.height -= sizeUpgrades[spaceship.sizeLevel].effect;
		spaceshipElement.style.width = spaceship.width + 'px';
		spaceshipElement.style.height = spaceship.height + 'px';
		spaceship.distance -= sizeUpgrades[spaceship.sizeLevel].cost;
		spaceship.sizeLevel++;
		document.getElementById('xp').innerText = `XP: ${spaceship.distance}`;
		document.getElementById('btn_upgrade_size').innerText = `Decrease Size (Cost: ${sizeUpgrades[spaceship.sizeLevel].cost} XP)`;
	}
}

// Reset the game to the starting point
function resetGame()
{
	alert("Game Over! Starting again..."); // Feedback to the player

	// Reset spaceship properties
	spaceship.x = 375;
	spaceship.y = 550;
	spaceship.width = 50;
	spaceship.height = 50;
	spaceship.speed = 1;
	spaceship.fuel = 100;
	spaceship.health = 100;
	spaceship.distance = 0;
	spaceship.speedLevel = 0;
	spaceship.fuelLevel = 0;
	spaceship.sizeLevel = 0;
	spaceship.healthLevel = 0;

	// Reset UI elements
	document.getElementById('xp').innerText = `XP: ${spaceship.distance}`;
	document.getElementById('fuel').innerText = `Fuel: ${spaceship.fuel}%`;
	document.getElementById('health').innerText = `Health: ${spaceship.health}%`;
	document.getElementById('btn_upgrade_speed').innerText = `Increase Speed (Cost: ${speedUpgrades[spaceship.speedLevel].cost} XP)`;
	document.getElementById('btn_upgrade_fuel').innerText = `Increase Fuel (Cost: ${fuelUpgrades[spaceship.fuelLevel].cost} XP)`;
	document.getElementById('btn_upgrade_health').innerText = `Increase Health (Cost: ${healthUpgrades[spaceship.healthLevel].cost} XP)`;
	document.getElementById('btn_upgrade_size').innerText = `Decrease Size (Cost: ${sizeUpgrades[spaceship.sizeLevel].cost} XP)`;
}

// Handle collision with a meteoroid
function collideWithMeteoroid()
{
	spaceship.health -= 10; // Decrease health by a fixed amount
	if (spaceship.health <= 0)
	{
		spaceship.health = 0;
		resetGame();
		return;
	}

	// Update health display
	document.getElementById('health').innerText = `Health: ${spaceship.health}%`;

	// You can also add visual or sound effects for the collision
}

document.getElementById('btn_upgrade_speed').addEventListener('click', upgradeSpeed);
document.getElementById('btn_upgrade_fuel').addEventListener('click', upgradeFuel);
document.getElementById('btn_upgrade_health').addEventListener('click', upgradeHealth);
document.getElementById('btn_upgrade_size').addEventListener('click', upgradeSize);
