# deep

Basic functions to recursively work with nested data when you do not care about the context.

## Introduction
The `iteratee` or `predicate` functions are invoked with three arguments (in order):

- `value [Any]` The current iteration value
- `key [Mixed]` The key for iteration value
- `parent [Mixed]` The key of data containing iteration value

`Mixed` is equal to:
  - `String` for object property
  - `Number` for array index
  - `Undefined` for primitive

## Example
```
{
  parent: [
    childA,
    [childB, childC],
    childD
  ]
}
```
iterations arguments:
1. childA, 0, "parent"
2. childB, 0, 1
3. childC, 1, 1
4. childD, 0, "parent"

## Functions

```javascript
deepEach(data, iteratee)
```
- `data [Any]` The data to iterate over
- `iteratee [Function]` The function invoked per iteration

Returns `data`

```javascript
deepMap(data, iteratee)
```
- `data [Any]` The data to iterate over
- `iteratee [Function]` The function invoked per iteration

Returns the new mapped `data`

```javascript
deepFilter(data, predicate)
```
- `data [Any]` The data to iterate over
- `predicate [Function]` The function invoked per iteration

Returns the new filtered `data`.

**Important!** When `data` is primitive and predicate returns `false` then function returns `Null`.
