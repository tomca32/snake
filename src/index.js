import _join from 'lodash/join';

const arr = ['sdf', 'fds'];

const joinArray = ([a, b]) => _join([a, b]);

console.log(joinArray(arr));
