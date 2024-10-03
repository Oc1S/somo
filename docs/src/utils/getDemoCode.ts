import fs from 'node:fs';
import path from 'node:path';

export const getDemoCode = (filename: string) => {
  return fs.readFileSync(filename, 'utf-8');
};
