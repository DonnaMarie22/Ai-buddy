const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'package.json',
  'src/main.js',
  'src/preload.js',
  'src/index.html',
  'src/styles.css',
  'src/renderer.js'
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(process.cwd(), file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
if (pkg.main !== 'src/main.js') {
  throw new Error('package.json main must point to src/main.js');
}

for (const script of ['start', 'check']) {
  if (!pkg.scripts || !pkg.scripts[script]) {
    throw new Error(`Missing npm script: ${script}`);
  }
}

for (const file of ['src/main.js', 'src/preload.js', 'src/renderer.js']) {
  new Function(fs.readFileSync(file, 'utf8'));
}

const html = fs.readFileSync('src/index.html', 'utf8');
for (const marker of ['Zora Hub', 'Memory bank', 'Provider settings', 'Warudo triggers']) {
  if (!html.includes(marker)) {
    throw new Error(`Missing UI marker: ${marker}`);
  }
}

console.log('Zora desktop shell validation passed.');
