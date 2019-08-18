import path from 'path';
import debug from 'debug';

/*
 * A little utility to centralize the debug name
 */

export const cDebug = (filename: string, msg: string) => {
  console.log('sono in debug');
  return debug(`gf:${path.basename(filename, '.ts')}`)(msg);
};
