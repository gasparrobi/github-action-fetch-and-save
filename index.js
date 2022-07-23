import * as core from '@actions/core';
import axios from 'axios';
import { to } from 'await-to-js';
import { mkdirP } from '@actions/io';
import { promises as fs } from 'fs';

const fetchAndSaveFile = async (url, path = '', fileName = 'test.json') => {
  if (!url) return core.setFailed('missing url');

  const [error, response] = await to(axios.get(url));
  if (error) return core.setFailed(error);

  const _path = path.replace(/^\/|\/$/g, '');

  if (_path) await mkdirP(path);

  await fs.writeFile(
    `${_path ? _path + '/' : ''}${fileName}`,
    JSON.stringify(response.data),
    'utf-8'
  );
};

try {
  const nameToGreet = core.getInput('who-to-greet');
  const url = core.getInput('fetch-url');
  const path = core.getInput('file-path') || '';
  const fileName = core.getInput('file-name');
  fetchAndSaveFile(url, path, fileName);
} catch (error) {
  core.setFailed(error.message);
}
