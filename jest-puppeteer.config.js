const puppeteer = require('puppeteer-core')
const { launchArgs } = require('puppeteer-testing-library')

module.exports = {
  launch: {
    executablePath:
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: launchArgs(),
    // devtools: true,
  },
}
