import path from 'path';
import debug from 'debug';

/*
 * A little utility to centralize the debug name
 */

export const cDebug = (filename: string) => {
  return debug(`gf:${path.basename(filename, '.ts')}`);
};
