import dom from 'jsdom-global';
import fs from 'fs';

const domOption = {
  resources: 'usable',
  runScripts: 'dangerously',
};
const readOption = {
  encoding: 'utf-8',
};

// accepts a relative path string like 'src/my-dom.html'
// returns a clear function on global envs such as `window`, `document` etc
module.exports = (path) => {
  const view = fs.readFileSync(path, readOption);
  return dom(view, domOption);
};
