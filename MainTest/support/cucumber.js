module.exports = {
  default: {
    require: [
      "./MainTest/**/*.ts"
    ],
    parallel: 3,          // number of workers
    requireModule: ["ts-node/register"],
    format: ["progress"],
    publishQuiet: true
  }
};
