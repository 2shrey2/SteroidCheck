// utils.js
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export function getDirName(metaUrl) {
  return dirname(fileURLToPath(metaUrl));
}