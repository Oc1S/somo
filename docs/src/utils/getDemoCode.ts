import fs from 'node:fs';

export const getDemoCode = (filename: string) => {
  return fs.readFileSync(filename, 'utf-8');
};
