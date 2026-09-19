'use strict';

// A real smoke test for a repository that ships no test suite of its own.
//
// auto-xml is a Vue 3 + TypeScript project. package.json defines no `test`
// script, and its devDependencies are the vue-cli toolchain, not a test
// runner. `yarn build` (vue-cli-service build) is what actually exercises
// the source: it compiles src/main.ts, renders src/App.vue (which mounts
// src/components/HelloWorld.vue) and copies src/assets/logo.png into the
// output. This checks that the build CI just ran is the real thing, not an
// empty or broken one.

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist');

assert.ok(
  fs.existsSync(distDir),
  'dist/ does not exist -- `yarn build` must run before this smoke test'
);

assert.ok(
  fs.existsSync(path.join(distDir, 'index.html')),
  'dist/index.html was not generated -- public/index.html should be emitted there by vue-cli-service build'
);

const jsDir = path.join(distDir, 'js');
assert.ok(
  fs.existsSync(jsDir) && fs.statSync(jsDir).isDirectory(),
  'dist/js does not exist -- vue-cli-service build should emit the compiled app bundle there'
);

const jsFiles = fs.readdirSync(jsDir).filter((name) => name.endsWith('.js'));
assert.ok(
  jsFiles.length > 0,
  'dist/js has no .js files -- the webpack build produced no app bundle'
);

const bundleSource = jsFiles
  .map((name) => fs.readFileSync(path.join(jsDir, name), 'utf8'))
  .join('\n');

assert.ok(
  /Welcome to Your Vue\.js \+ TypeScript App/.test(bundleSource),
  "none of dist/js/*.js contain HelloWorld.vue's message -- src/App.vue no longer renders <HelloWorld>, or the build did not pick it up"
);

const imgDir = path.join(distDir, 'img');
assert.ok(
  fs.existsSync(imgDir) &&
    fs.readdirSync(imgDir).some((name) => name.endsWith('.png')),
  'dist/img has no .png file -- src/assets/logo.png, referenced by App.vue, was not copied into the build'
);

console.log(
  'smoke test passed: dist/ has index.html, a js bundle containing the HelloWorld message, and the copied logo image'
);
