class SpecStorageProto {
	private nameSpace = 'spec.';

	public get analyticsOptIn(): boolean {
		return this.getItem('analyticsOptIn', false);
	}
	public set analyticsOptIn(value: boolean) {
		this.setItem('analyticsOptIn', value);
	}

	private getItem(key: string, defaultValue: any = null): any {
		if (!window.localStorage) return defaultValue;

		try {
			const val = JSON.parse(window.localStorage.getItem(this.nameSpace + key)!);
			if (defaultValue !== null && typeof val !== typeof defaultValue)
				return defaultValue;
			return val;
		} catch (err) {
			return defaultValue;
		}
	}

	private setItem(key: string, data: any) {
		if (!window.localStorage) return;

		window.localStorage.setItem(this.nameSpace + key, JSON.stringify(data));
	}
}

export const SpecStorage = new SpecStorageProto();