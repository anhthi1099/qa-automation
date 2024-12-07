import fs from 'fs-extra';

async function main() {
  fs.ensureDir('test-result').catch(() => {});
  fs.emptyDir('test-result').catch(() => {});
}

main();
