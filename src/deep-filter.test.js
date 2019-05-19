import deepFilter from './deep-filter';

const isTruthy = value => !(value == null || value === '');

describe('deep-filter.js', () => {
  it('returns null for falsy value', () => {
    expect(deepFilter(null, isTruthy)).toBe(null);
    expect(deepFilter('', isTruthy)).toBe(null);
  });

  it('removes empty items', () => {
    const data = ['', null];
    expect(deepFilter(data, isTruthy)).toEqual([]);
  });

  it('removes empty properties', () => {
    const data = {
      foo: '',
      bar: ['', 4]
    };
    expect(deepFilter(data, isTruthy)).toEqual({
      bar: [4]
    });
  });

  it('returns filtered data', () => {
    const data = {
      foo: '',
      bar: {
        a: 'A',
        b: '',
        c: 'C',
        d: null
      },
      list: [null, 'D', 'E', '']
    };

    const result = {
      bar: {
        a: 'A',
        c: 'C'
      },
      list: ['D', 'E']
    };

    expect(deepFilter(data, isTruthy)).toEqual(result);
  });
});
