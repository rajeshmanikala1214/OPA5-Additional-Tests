module.exports = function(config) {

  config.set({

    frameworks: ['ui5', 'qunit'],

    ui5: {
      url: "https://sapui5.hana.ondemand.com",
      mode: "script",
      config: {
        async: true,
        resourceRoots: {
          "ns.HTML5Module": "./webapp"
        }
      },
      tests: [
        "ns/HTML5Module/test/unit/AllTests",
        "ns/HTML5Module/test/integration/AllJourneys"
      ]
    },

    preprocessors: {
      'webapp/{controller,model}/*.js': ['coverage']
    },

    reporters: ['progress', 'coverage', 'junit'],

    coverageReporter: {
      dir: 'reports',
      reporters: [
        { type: 'cobertura', subdir: '.', file: 'coverage.xml' },
        { type: 'lcov', subdir: 'lcov' },
        { type: 'text-summary' }
      ]
    },

    junitReporter: {
      outputDir: 'reports',
      outputFile: 'TESTS-karma.xml',
      useBrowserName: false
    },

    browsers: ['ChromeHeadlessNoSandbox'],

    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--remote-debugging-port=9222'
        ]
      }
    },

    plugins: [
      'karma-ui5',
      'karma-qunit',
      'karma-chrome-launcher',
      'karma-junit-reporter',
      'karma-coverage'
    ],

    singleRun: true,
    autoWatch: false,

    browserNoActivityTimeout: 210000,
    captureTimeout: 210000
  });
};