// Get the canvas element and its context
const canvas = document.getElementById("unit-circle");
const ctx = canvas.getContext("2d");

// Calculate the center point and radius of the circle
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 100;

colors = ["green", "blue", "red", "rgb(245, 0, 233)", "orange"];

// Define the function to draw the ray
function drawRay() {
  // Get the angle from the input field and convert it to radians
  const angle = document.getElementById("angle").value;
  const radians = (angle * Math.PI) / 180;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the unit circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.stroke();

  // Draw the ray
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX + radius * Math.cos(radians), centerY - radius * Math.sin(radians));
  ctx.stroke();
}

// Define the function to add the rays to the visualization
function drawRays() {
  // Get the angles from the input fields and convert them to radians
  const angles = [
    document.getElementById("angle1").value,
    document.getElementById("angle2").value,
    document.getElementById("angle3").value,
    document.getElementById("angle4").value,
    document.getElementById("angle5").value
  ];

  const toggles = [
    document.getElementById("toggle1").value,
    document.getElementById("toggle2").value,
    document.getElementById("toggle3").value,
    document.getElementById("toggle4").value,
    document.getElementById("toggle5").value
  ];

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the unit circle
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.stroke();
  // theta = 0 line
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 7]);
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(
    centerX + radius * Math.cos(0),
    centerY - radius * Math.sin(0)
  );
  ctx.stroke();
  // // ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  // ctx.stroke();

  // Draw the rays
  for (let i = 0; i < angles.length; i++) {
    if (angles[i]) {
      angleInRadians = toggles[i] == "radians";
      textPos = getTextPos(angles[i], angleInRadians, radius, centerX, centerY);
      theta = angleInRadians ? angles[i] : (angles[i] * Math.PI) / 180;
      ctx.strokeStyle = colors[i];
      ctx.lineWidth = 2;
      ctx.textAlign = "center";
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + radius * Math.cos(theta),
        centerY - radius * Math.sin(theta)
      );
      ctx.fillText(getLabelText(angles[i], angleInRadians), textPos[0], textPos[1]);
      ctx.stroke();
    }
  }
}

function getTextPos(angle, radians, radius, centerX, centerY){
  if (!radians) angle = (angle * Math.PI) / 180;
  while (angle < 0){
    angle += Math.PI + Math.PI;
  }
  angle = fmod(angle, Math.PI*2);
  console.log(angle);

  // Quadrants 1 and 4
  if (angle < Math.PI / 2 || (angle > 1.5 * Math.PI)){
    console.log("q1 or q4");
    radius = radius * 1.1;
    textPosX = centerX + (radius) * Math.cos(angle);
    textPosY = centerY - (radius) * Math.sin(angle);
    return [textPosX, textPosY];
  }
  // Quadrants 2 and 3
  else{
    console.log("q2 or q3");
    radius = radius * 1.25;
    textPosX = centerX + (radius) * Math.cos(angle);
    textPosY = centerY - (radius) * Math.sin(angle);
    return [textPosX, textPosY];
  }
}

function getLabelText(angle, radians){
  if (radians){
    return angle + " rad";
  }
  else{
    return angle + "°";
  }
}

function fmod(a,b) { 
  return Number((a - (Math.floor(a / b) * b)).toPrecision(8)); 
};