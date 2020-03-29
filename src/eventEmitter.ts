export type EventCallback = (...args: any) => void;

type Callbacks = {
	[event: string]: EventCallback[];
};

export class EventEmitter {
	private callbacks = {} as Callbacks;

	on(event: string, callback: EventCallback) {
		if (!this.callbacks[event]) {
			this.callbacks[event] = [];
		}
		this.callbacks[event].push(callback);
	}

	async dispatch(event: string, args: any): Promise<void[]> {
		const callbacks = this.callbacks[event];
		if (callbacks) {
			const promises = callbacks.map(callback => callback(args));
			return Promise.all(promises);
		}
		return [];
	}
}
