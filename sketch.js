let angleSlider,
	circleRadius,
	angleInput,
	sinSpan,
	cosSpan,
	tanSpan,
	secSpan,
	cscSpan,
	cotSpan,
	angleState,
	angleStateChanged;

function setup() {
	const canvas = createCanvas(600, 400);
	rectMode(CENTER);

	canvas.parent('sketch-holder');

	angleSlider = document.querySelector('#angle-slider');
	angleInput = document.querySelector('#angle-input');

	sinSpan = document.querySelector('#sin');
	cosSpan = document.querySelector('#cos');
	tanSpan = document.querySelector('#tan');
	secSpan = document.querySelector('#sec');
	cscSpan = document.querySelector('#csc');
	cotSpan = document.querySelector('#cot');

	circleRadius = 100;
	angleState = 1;
}

function draw() {
	if (!angleInput.matches(':focus')) {
		angleInput.value = angleState;
	}
	angleState = angleSlider.value;

	angleInput.addEventListener('change', e => {
		const value = e.target.value;
		if (value < 0 && value > 360) e.target.value = 360;
		angleSlider.value = e.target.value;
		angleStateChanged = true;
	});

	const rawAngle = radians(angleState);
	const angle = treatAngle(rawAngle);

	const sinValue = sin(rawAngle),
		cosValue = cos(rawAngle),
		tanValue =
			(rawAngle != HALF_PI) & (rawAngle != PI + HALF_PI)
				? tan(rawAngle)
				: 'Indefinido',
		secValue = cosValue != 0 ? 1 / cosValue : 'Indefinido',
		cscValue = sinValue != 0 ? 1 / sinValue : 'Indefinido',
		cotValue = tanValue != 0 ? 1 / tanValue : 'Indefinido';

	sinSpan.textContent = `sen ${angleState} ≅ ${roundValue(sinValue)}`;
	cosSpan.textContent = `cos ${angleState} ≅ ${roundValue(cosValue)}`;
	tanSpan.textContent = `tan ${angleState} ≅ ${roundValue(tanValue)}`;
	secSpan.textContent = `sec ${angleState} ≅ ${roundValue(secValue)}`;
	cscSpan.textContent = `csc ${angleState} ≅ ${roundValue(cscValue)}`;
	cotSpan.textContent = `cot ${angleState} ≅ ${roundValue(cotValue)}`;

	background(220);
	noFill();

	push();
	strokeWeight(2);
	circle(width / 2, height / 2, circleRadius * 2);
	pop();

	push();
	strokeWeight(0.5);
	line(0, height / 2, width, height / 2);
	line(width / 2, 0, width / 2, height);
	pop();

	push();
	strokeWeight(2);
	stroke(255, 0, 0);
	translate(width / 2, height / 2);

	drawArc(angle);
	drawRadius(angle, color(255, 0, 0, 100));

	let rawReduction;
	if (rawAngle > HALF_PI && rawAngle < PI) {
		rawReduction = PI - rawAngle;
	} else if (rawAngle >= PI && rawAngle < PI + HALF_PI) {
		rawReduction = PI + rawAngle;
	} else if (rawAngle >= PI + HALF_PI && rawAngle < TWO_PI) {
		rawReduction = TWO_PI - rawAngle;
	}

	if (rawReduction) {
		let reduction = treatAngle(rawReduction);
		stroke(0, 0, 255);
		drawArc(reduction);
		drawRadius(reduction, color(0, 0, 255, 100));
	}

	pop();
	angleStateChanged = false;
}

function drawRadius(angle, color) {
	stroke(color);
	line(0, 0, circleRadius * cos(angle), circleRadius * sin(angle));
}

function drawArc(angle) {
	arc(0, 0, circleRadius * 2, circleRadius * 2, angle, 0);
}

function treatAngle(angle) {
	return angle ? (angle == TWO_PI ? TWO_PI : TWO_PI - angle) : 0;
}

function roundValue(value, decimals = 2) {
	return typeof value == 'number'
		? Math.round(cos(value) * 10 ** decimals) / 10 ** decimals
		: 'Indefinido';
}
