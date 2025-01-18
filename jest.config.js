export default {
    transform: {},
    testEnvironment: "node", // Use "node" for server-side tests
    extensionsToTreatAsEsm: [".ts"],
    moduleNameMapper: {
      "^(\\.{1,2}/.*)\\.js$": "$1", // Map imports to support ESM
    },
   
  };
  