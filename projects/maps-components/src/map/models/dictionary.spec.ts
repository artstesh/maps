import { Forger } from '@artstesh/forger';
import { should } from '@artstesh/it-should';
import { Dictionary } from './dictionary';

describe('#map-models Dictionary', () => {
  it('put/take/has: store and retrieve by key', () => {
    const key = Forger.create<string>()!;
    const value = Forger.create<string>()!;
    const dic = new Dictionary<string>();
    //
    dic.put(key, value);
    //
    should().true(dic.has(key));
    should().string(dic.take(key)).equals(value);
    should().number(dic.size).equals(1);
    should().true(dic.keys[0] === key);
  });

  it('put: null value removes the key', () => {
    const dic = new Dictionary<string>();
    dic.put('a', 'v');
    //
    dic.put('a', null);
    //
    should().false(dic.has('a'));
    should().true(dic.take('a') === null);
  });

  it('rmv: removes only existing key', () => {
    const dic = new Dictionary<string>();
    dic.put('a', 'v');
    //
    dic.rmv('missing');
    dic.rmv('a');
    //
    should().false(dic.has('a'));
    should().number(dic.size).equals(0);
    should().true(dic.collection['a'] === undefined);
  });

  it('addOrUpdate: creates on missing key, updates on existing', () => {
    const dic = new Dictionary<number>();
    //
    dic.addOrUpdate('a', () => 1);
    dic.addOrUpdate('a', (current) => (current ?? 0) + 10);
    //
    should().number(dic.take('a')!).equals(11);
  });

  it('find: first matching element or null', () => {
    const dic = new Dictionary<number>();
    dic.put('a', 1);
    dic.put('b', 7);
    dic.put('c', 3);
    //
    should()
      .number(dic.find((v) => v > 5)!)
      .equals(7);
    should().true(dic.find((v) => v > 100) === null);
  });

  it('forEach: iterates values with index', () => {
    const dic = Dictionary.create({ a: 'x', b: 'y' });
    const visited: [string, number][] = [];
    //
    dic.forEach((v, i) => visited.push([v + i, i]));
    //
    should().number(visited.length).equals(2);
    should().true(visited[0][1] === 0 && visited[1][1] === 1);
    should().true(visited.every(([v]) => v === 'x0' || v === 'y1'));
  });

  it('create: builds from a record with optional transformation', () => {
    const dic = Dictionary.create({ a: 1, b: 2 }, (v) => v * 10);
    //
    should().number(dic.size).equals(2);
    should().number(dic.take('a')!).equals(10);
    should().number(dic.take('b')!).equals(20);
  });

  it('fromList: keys come from the id callback', () => {
    const dic = Dictionary.fromList(['x', 'y'], (e) => 'k-' + e);
    //
    should().number(dic.size).equals(2);
    should().string(dic.take('k-x')!).equals('x');
    should().string(dic.take('k-y')!).equals('y');
  });

  it('clone: shallow copy with optional transformation', () => {
    const original = Dictionary.create({ a: 1, b: 2 });
    //
    const plain = Dictionary.clone(original);
    const transformed = Dictionary.clone(original, (v) => v + 1);
    //
    original.put('a', 100);
    //
    should().number(plain.take('a')!).equals(1);
    should().number(transformed.take('a')!).equals(2);
    should().number(transformed.take('b')!).equals(3);
  });
});
