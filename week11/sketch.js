function setup() {
  createCanvas(400, 400);
  colorMode(HSB);

  // Set angle mode so that atan2() returns angles in degrees
  angleMode(DEGREES);

  describe('Two colorful rectangular eyes that follow the cursor with dynamic pupil sizes.');
}

function draw() {
  background(210, 50, 20);

  // Draw left eye
  let leftX = 120;
  let leftY = 180;

  // Calculate angle and distance between left eye and mouse
  let leftAngle = atan2(mouseY - leftY, mouseX - leftX);
  let leftDist = dist(mouseX, mouseY, leftX, leftY);

  push();
  translate(leftX, leftY);
  fill((frameCount % 360), 80, 100);
  rectMode(CENTER);
  rect(0, 0, 60, 80, 10); // Rectangle eye with rounded corners
  rotate(leftAngle);
  fill(0);
  ellipse(15, 0, constrain(40 - leftDist / 10, 10, 40), constrain(40 - leftDist / 10, 10, 40)); // Dynamic pupil size
  pop();

  // Draw right eye
  let rightX = 280;
  let rightY = 220;

  // Calculate angle and distance between right eye and mouse
  let rightAngle = atan2(mouseY - rightY, mouseX - rightX);
  let rightDist = dist(mouseX, mouseY, rightX, rightY);

  push();
  translate(rightX, rightY);
  fill((frameCount + 180) % 360, 80, 100); // Dynamic color for the right eye
  rectMode(CENTER);
  rect(0, 0, 60, 80, 10); // Rectangle eye with rounded corners
  rotate(rightAngle);
  fill(0);
  ellipse(15, 0, constrain(40 - rightDist / 10, 10, 40), constrain(40 - rightDist / 10, 10, 40)); // Dynamic pupil size
  pop();
}
