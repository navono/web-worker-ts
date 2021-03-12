import Worker from "./workers/my.worker";
const worker = new Worker();
console.log('worker', worker);


export default class Dog {
  name:string
  constructor(name: string) {
    this.name = name;
    worker.onmessage = (e: MessageEvent) => {
      console.log('recv message', e.data);
    }
  }

  public getName():string {
    worker.postMessage({ a: 1 });

    return this.name;
  }
}
