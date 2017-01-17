class TypingCore {
	private _originalRoma: string;
	private _typedRoma: string;
	private _waitingRoma: string;

	constructor() {
	}

	public tryType(key: string): boolean {
		if(this.isEndLine()) {
			return false;
		}

		if(key == this._waitingRoma[0]) {
			this._typedRoma += this._waitingRoma[0];
			this._waitingRoma = this._waitingRoma.substr(1);
			return true;
		}

		return false;
	}

	public initLine(line: string): void {
		this._originalRoma = line;
		this._waitingRoma = line;
		this._typedRoma = '';
	}

	public isEndLine(): boolean {
		if(this._waitingRoma == '') {
			return true;
		}

		return false;
	}

	get originalRoma(): string { return this._originalRoma; }
	get typedRoma(): string { return this._typedRoma; }
	get waitingRoma(): string { return this._waitingRoma; }

	// public getOriginalRoma(): string { return this.originalRoma; }
	// public getTypedRoma(): string { return this.typedRoma; }
	// public getWaitingRoma(): string { return this.waitingRoma; }
}

export = TypingCore;
