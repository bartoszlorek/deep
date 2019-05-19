import deepEach from './deep-each';

describe('deep-each.js', () => {
  const breakOnValueD = jest.fn(value => {
    if (value === 'D') {
      return false;
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not call on falsy', () => {
    const iteratee = jest.fn();
    deepEach(null, iteratee);

    expect(iteratee).toHaveBeenCalledTimes(0);
  });

  it('walks through input value', () => {
    const iteratee = jest.fn();
    deepEach(['A', {b: 'B'}, 'C'], iteratee);

    expect(iteratee.mock.calls).toEqual([
      ['A', 0, undefined],
      ['B', 'b', 1],
      ['C', 2, undefined]
    ]);
  });

  it('can break in multidimensional array', () => {
    deepEach(['A', ['B', 'C', ['D']], 'E'], breakOnValueD);

    expect(breakOnValueD.mock.calls).toEqual([
      ['A', 0, undefined],
      ['B', 0, 1],
      ['C', 1, 1],
      ['D', 0, 2]
    ]);
  });

  it('can break in multidimensional object', () => {
    const data = {
      a: 'A',
      b: [
        'B',
        'C',
        {
          d: 'D'
        }
      ],
      e: 'E'
    };

    deepEach(data, breakOnValueD);
    expect(breakOnValueD.mock.calls).toEqual([
      ['A', 'a', undefined],
      ['B', 0, 'b'],
      ['C', 1, 'b'],
      ['D', 'd', 2]
    ]);
  });
});
