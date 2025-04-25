export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Transform JavaScript/JSX files
    '^.+\\.mjs$': 'babel-jest',  // Transform ES Modules
  },
  testEnvironment: 'jsdom', // Use jsdom for React tests
  moduleNameMapper: {
    '^axios$': require.resolve('axios'), // Map axios to its CommonJS version
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(axios)/)', // Ensure axios is transformed
  ],
};