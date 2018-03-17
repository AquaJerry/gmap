import dom from 'jsdom-global';
import fs from 'fs';

const domOption = {
  resources: 'usable',
  runScripts: 'dangerously',
};
const readOption = {
  encoding: 'utf-8',
};

const view = fs.readFileSync('src/first-map.html', readOption);

// a clear function on global envs such as `window`, `document` etc
export default dom(view, domOption);
