import { Computer } from './computer';
import dividePlugin from './plugns/divide';
import minusPlugin from './plugns/minus';
import modPlugin from './plugns/mod';
import multiplyPlugin from './plugns/multiply';
import parenPlugin from './plugns/paren';
import plusPlugin from './plugns/plus';
import powerPlugin from './plugns/power';
import { jiaoPlugin, yuanPlugin } from './plugns/RMB';

const calc = new Computer();

calc.addPlugins([
  plusPlugin,
  minusPlugin,
  multiplyPlugin,
  dividePlugin,
  modPlugin,
  yuanPlugin,
  jiaoPlugin,
  parenPlugin,
  powerPlugin,
]);

describe('operator：', () => {
  it('2 + 3 * 2 - 1 / 2 + 5 % 3', () => {
    const res = calc.calc('2 + 3 * 2 - 1 / 2 + 5 % 3'); // 2 3 2 * + 1 2 / - 5 3 % +
    expect(res).toBe(9.5);
  });
});

describe('单位：', () => {
  it('3元+8角', () => {
    const res = calc.calc('3元 + 8角');
    expect(res).toBe(3.8);
  });
});

describe('brackets：', () => {
  it('2 * (3 + 5)', () => {
    const res = calc.calc('2 * (3 + 5)');
    expect(res).toBe(16);
  });

  it('(2 + 3) * (7 - 3)', () => {
    const res = calc.calc('(2 + 3) * (7 - 3)');
    expect(res).toBe(20);
  });

  it('(((2 + 3) * 5) - 1) / 6', () => {
    const res = calc.calc('(((2 + 3) * 5) - 1) / 6');
    expect(res).toBe(4);
  });
});

describe('power：', () => {
  it('3 ^ 2', () => {
    const res = calc.calc('3 ^ 2');
    expect(res).toBe(9);
  });

  it('5 ^ 3 * 2 + 3', () => {
    const res = calc.calc('5 ^ 3 * 2 + 3');
    expect(res).toBe(253);
  });

  it('3 * 4 ^ (2 + 1)', () => {
    const res = calc.calc('3 * 4 ^ (2 + 1)');
    expect(res).toBe(192);
  });
});
