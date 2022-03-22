let angleSlider, circleRadius, angleInput, sinSpan, cosSpan, tanSpan, angleState;
function setup() {
  createCanvas(600, 400);
  rectMode(CENTER)
  createSpan('Angle(degrees): ')
  angleSlider = createSlider(0, 360, 1, 1);
  angleSlider.style('width: 250px')
  
  angleInput = createInput('', 'number')
  
  createDiv('<h2>Relações trigonométricas: </h2>')
  sinSpan = createSpan();
  cosSpan = createSpan();
  tanSpan = createSpan();
  
  circleRadius = 100;
  angleState = 1;
  
}

function draw() {
  angleInput.value(angleSlider.value())
  angleState = angleInput.value()

  const rawAngle = radians(angleState)
  const angle = treatAngle(rawAngle)
  
  
  sinSpan.html(`sen ${angleState} ≅ ${Math.round(sin(rawAngle) * 100) / 100} <br>`)
  cosSpan.html(`cos ${angleState} ≅ ${Math.round(cos(rawAngle) * 100) / 100} <br>`)
  tanSpan.html(`tan ${angleState} ≅ ${(rawAngle != HALF_PI & rawAngle != PI + HALF_PI ) ? 
               Math.round(tan(rawAngle) * 100 / 100) : 'Indefinido' }`)
  
  background(220);
  noFill()
  
  push()
  strokeWeight(2)
  circle(width / 2, height / 2, circleRadius * 2)
  pop()
  
  push()
  strokeWeight(0.5)
  line(0, height / 2, width, height / 2)
  line(width / 2, 0 , width / 2, height)
  pop()
  
  push()
  strokeWeight(2)
  stroke(255, 0, 0)
  translate(width / 2, height / 2)
  
  
  
  drawArc(angle)
  drawRadius(angle, color(255, 0, 0, 100))
  
  let rawReduction;
  if (rawAngle > HALF_PI && rawAngle < PI) {
    rawReduction = PI - rawAngle;
    
  } else if (rawAngle >= PI && rawAngle < PI + HALF_PI) {
    rawReduction = PI + rawAngle;
    
  } else if (rawAngle >= PI + HALF_PI && rawAngle < TWO_PI) {
    rawReduction = TWO_PI - rawAngle
  }
  
  
  if (rawReduction) {
    let reduction = treatAngle(rawReduction)
    stroke(0, 0, 255)
    drawArc(reduction)
    drawRadius(reduction, color(0, 0, 255, 100))
    
  }
  
  pop()
}

function drawRadius(angle, color) {
  stroke(color)
  line(0, 0, circleRadius * cos(angle), circleRadius * sin(angle))
}

function drawArc(angle) {
  arc(0, 0, circleRadius * 2, circleRadius * 2, angle, 0)
}

function treatAngle(angle) {
  return angle ? (angle == TWO_PI ? TWO_PI : TWO_PI - angle) : 0 
}