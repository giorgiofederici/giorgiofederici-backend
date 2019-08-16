module.exports = {
  extends: '@istanbuljs/nyc-config-typescript',
  // reporter: ['text', 'html', 'text-summary', 'lcov'],
  reporter: ['text'],
  // include: ['./server/**/*.ts'],
  include: ['server/*.ts', 'server/**/*.ts'],
  extension: ['.ts'],
  all: true,
  require: ['ts-node/register'],
  'check-coverage': false
};
