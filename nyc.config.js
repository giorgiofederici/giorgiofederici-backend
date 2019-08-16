module.exports = {
  extends: '@istanbuljs/nyc-config-typescript',
  // reporter: ['text', 'html', 'text-summary', 'lcov'],
  reporter: ['text'],
  // include: ['./server/**/*.ts'],
  all: true,
  extension: ['.ts'],
  require: ['ts-node/register'],
  'check-coverage': false
};
