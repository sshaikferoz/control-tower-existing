module.exports = () => {
  return {
    rootDir:'.',
    testPathIgnorePatterns:['/node_modules','/components'],
    preset: 'jest-puppeteer',
  }
}
