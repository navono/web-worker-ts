import * as R from 'ramda';

export function sayHello(name: string): string {
  console.log(R.includes('a', 'this is a test'));
  // setTimeout(() => ctx.postMessage({
  //   foo: 'boo'
  // }), 2000);

  return `Hello ${name}!`;
}
