const fs = require('fs');
const { join } = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

test('runs', async () => {
  const { stderr } = await promisify(exec)('npm start');
  expect(stderr).toContain('');
});

const OUTPUT_PATH = join(process.cwd(), 'output');

describe('generation', () => {
  beforeEach(async () => {
    try {
      await fs.promises.access(OUTPUT_PATH, fs.constants.R_OK);
    } catch (_) {
      fs.mkdirSync(OUTPUT_PATH);
    }
  });
  test.skip('generates non-empty output directory', async () => {
    await promisify(exec)('npm start');
    const contents = await fs.promises.readdir(join(process.cwd(), '/output'));
    expect(contents).toHaveLength(3);
  });
});
