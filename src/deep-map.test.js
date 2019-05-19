import deepMap from './deep-map'

describe('deep-map.js', () => {
  const addTwo = value => value + 2

  it('returns base data', () => {
    expect(deepMap()).toBe(null);
    expect(deepMap(null)).toBe(null);
    expect(deepMap([])).toEqual([]);
    expect(deepMap({})).toEqual({});
  })

  it('handles primitive value', () => {
    expect(deepMap('Jake', addTwo)).toBe('Jake2');
    expect(deepMap(2, addTwo)).toBe(4);
  })

  it('iterates over multidimensional array', () => {
    const data = ['dog', ['fish', 'shark'], 'cat'];
    const result = ['dog2', ['fish2', 'shark2'], 'cat2'];

    expect(deepMap(data, addTwo)).toEqual(result);
  })

  it('iterates over multidimensional object', () => {
    const data = {
      dog: 'Jake',
      fish: ['Goldie', 'Sunny'],
      cat: 'Kitty'
    };
    const result = {
      dog: 'Jake2',
      fish: ['Goldie2', 'Sunny2'],
      cat: 'Kitty2'
    };

    expect(deepMap(data, addTwo)).toEqual(result);
  })
})
