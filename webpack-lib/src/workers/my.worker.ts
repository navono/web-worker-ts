import * as R from 'ramda';

const ctx: Worker = self as any;

ctx.onmessage = (event: MessageEvent) => {
  console.log(event);

  console.log(R.includes('a', 'this is a test'));

  setTimeout(() => ctx.postMessage({
    foo: 'boo'
  }), 3000);
}

export default null as any;

// export default class WebpackWorker extends Worker {
//   constructor() {
//     super("");
//   }
// }
