import ms from 'ms';
import lunchtime from './lunchtime.js';
import millisecondsUntil from './millisecondsUntil.js';
import WebWorker from 'web-worker:./workers/my.worker.ts';

const worker = new WebWorker();
worker.onmessage = (e: MessageEvent) => {
	console.log('recv message', e.data);
}

export default async function howLongUntilLunch(hours: number = 12, minutes: number = 30): Promise<string> {
	const millisecondsUntilLunchTime = millisecondsUntil(lunchtime(hours, minutes));

	worker.postMessage('a');

	return ms(millisecondsUntilLunchTime, { long: true });
}
