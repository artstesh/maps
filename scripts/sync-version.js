// Keeps the library project manifest version in sync with the published root
// package.json version. Runs from the `version` lifecycle script on release:
// npm sets npm_package_version to the freshly bumped version.
const fs = require('fs');

const path = 'projects/maps-components/package.json';
const manifest = JSON.parse(fs.readFileSync(path, 'utf8'));
manifest.version = process.env.npm_package_version;
fs.writeFileSync(path, JSON.stringify(manifest, null, 2) + '\n');
