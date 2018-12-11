import calc from './index';

describe('calc', () => {

  it('0.1+0.2', () => {
    const res = calc('0.1+0.2');
    expect(res).toBe(0.3);
  });

  it('0.1+0.7', () => {
    const res = calc('0.1+0.7');
    expect(res).toBe(0.8);
  });

  it('1.19 * 10', () => {
    const res = calc('1.19 * 10');
    expect(res).toBe(11.9);
  });

  it('99 % 6', () => {
    const res = calc('99 % 6');
    expect(res).toBe(3);
  });

  it('10 * (3 + 9) / 12', () => {
    const res = calc('10 * (3 + 9) / 12');
    expect(res).toBe(10);
  });

  it('10 + (3 * 9) / 8', () => {
    const res = calc('10 + (3 * 9) / 8');
    expect(res).toBe(13.375);
  });

  it('(3 * ( 1 + 2.3 ) - 6 ) / 3 * ( 5 - 1 * ( 1 + 1 ) ) - 2', () => {
    const res = calc('(3 * ( 1 + 2.3 ) - 6 ) / 3 * ( 5 - 1 * ( 1 + 1 ) ) - 2');
    expect(res).toBe(1.9);
  });

});
