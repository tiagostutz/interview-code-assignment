/// <reference types="jest" />

// Increase timeout for all tests
jest.setTimeout(10000);

// Mock console.error to avoid noise in test output
const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === "string" &&
    args[0].includes("Warning: ReactDOM.render is no longer supported")
  ) {
    return;
  }
  originalError.call(console, ...args);
};

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});
