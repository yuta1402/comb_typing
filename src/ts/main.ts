import TypingCore = require('./typingCore');
import JsonUtil = require('./jsonUtil');

class PlayerStatus {
	private _correctType: number;
	private _missType: number;
	private _combo: number;
	private _maxCombo: number;

	constructor() {
		this.init();
	}

	public init() {
		this._correctType = 0;
		this._missType = 0;
		this._combo = 0;
		this._maxCombo = 0;
	}

	public correct() {
		this._correctType++;
		this._combo++;
		if(this._combo > this._maxCombo) {
			this._maxCombo = this._combo;
		}
	}

	public miss() {
		this._missType++;
		this._combo = 0;
	}

	public getSpeedMin(elapsed: number): number {
		return Math.ceil(this._correctType / elapsed * 1000 * 60);
	}

	get correctType(): number { return this._correctType; }
	get missType(): number { return this._missType; }
	get combo(): number { return this._combo; }
	get maxCombo(): number { return this._maxCombo; }
}

class PlayerStatusElements {
	private correctElement: HTMLElement;
	private missElement: HTMLElement;
	private speedElement: HTMLElement;
	private comboElement: HTMLElement;
	private maxComboElement: HTMLElement;

	constructor(private playerStatus: PlayerStatus) {
		this.correctElement = document.getElementById('correct');
		this.missElement = document.getElementById('miss');
		this.speedElement = document.getElementById('speed');
		this.comboElement = document.getElementById('combo');
		this.maxComboElement = document.getElementById('maxCombo');

		this.correctElement.innerHTML = 'correct: 0';
		this.missElement.innerHTML = 'miss: 0';
		this.speedElement.innerHTML = 'speed: 0';
		this.comboElement.innerHTML = 'combo: 0';
		this.maxComboElement.innerHTML = 'maxCombo: 0';
	}

	public update(elapsed: number) {
		const ps = this.playerStatus;

		this.correctElement.innerHTML = 'correct: ' + ps.correctType.toString();
		this.missElement.innerHTML = 'miss: ' + ps.missType.toString();
		this.comboElement.innerHTML = 'combo: ' + ps.combo.toString();
		this.maxComboElement.innerHTML = 'maxCombo: ' + ps.maxCombo.toString();
		this.speedElement.innerHTML = 'speed: ' + ps.getSpeedMin(elapsed).toString();
	}
}

let isEnd = false;
let questionIndex = 0;
let questionMaxIndex: number;
let questions: string[];

const tc = new TypingCore();
const ps = new PlayerStatus();
const pse = new PlayerStatusElements(ps);

const we = document.getElementById('word');
const typedElement = we.childNodes[1];
const waitingElement = we.childNodes[2];

let startTime = new Date();

const ignoreKeys :string[] = ['Alt', 'Shift', 'Control'];

// const audio = new Audio();
// audio.src = "./music.wav";
// audio.play();

const init = () => {
	questionIndex = 0;
	startTime = new Date();
	tc.initLine(questions[0]);
	waitingElement.textContent = tc.waitingRoma;
	typedElement.textContent = tc.typedRoma;
	ps.init();
	pse.update(1);
	// audio.currentTime = 0;
	// audio.play();
}

document.addEventListener('keydown', (e) => {
	if(e.key === 'Escape') {
		init();
		return;
	}

	if(isEnd) {
		return;
	}

	if(ignoreKeys.indexOf(e.key) >= 0) {
		return;
	}

	if(tc.tryType(e.key)) {
		ps.correct();
		const elapsed: number = Date.now() - startTime.getTime();
		pse.update(elapsed);
	} else {
		ps.miss();
		const elapsed: number = Date.now() - startTime.getTime();
		pse.update(elapsed);
	}

	if(tc.isEndLine()) {
		if(questionIndex >= questionMaxIndex - 1) {
			isEnd = true;
			we.innerHTML = "Finish!!";
			we.style.color = "red";
			return;
		}

		questionIndex++;
		tc.initLine(questions[questionIndex]);
	}

	typedElement.textContent = tc.typedRoma;
	waitingElement.textContent = tc.waitingRoma;
});

JsonUtil.readFileAsync('./data/test.json', (data: any) => {
	questions = data;
	questionMaxIndex = questions.length;
	tc.initLine(questions[0]);
	waitingElement.textContent = tc.waitingRoma;
});

// const currentTimeElement = document.getElementById('currentTime');
// let timerId;
//
// const updateTimerText = () => {
// 	timerId = setTimeout(() => {
// 		const elapsed = audio.currentTime.toFixed(0);
//
// 		currentTimeElement.innerHTML = audio.currentTime.toFixed(0).toString();
// 		updateTimerText();
// 	}, 10);
// };
//
// updateTimerText();
