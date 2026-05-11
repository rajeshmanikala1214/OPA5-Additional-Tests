const os = require("os");

module.exports = function (config) {
  "use strict";

  // Dynamic IP detection
  const networkInterfaces = os.networkInterfaces();

  const containerIp = Object.values(networkInterfaces)
    .flat()
    .find((i) => i.family === "IPv4" && !i.internal)?.address || "0.0.0.0";

  config.set({

    basePath: "",

    frameworks: ["ui5", "qunit"],

    ui5: {
      url: "https://sapui5.hana.ondemand.com",
      mode: "script",

      config: {
        async: true,

        resourceRoots: {
  "ns.HTML5Module": "webapp" 
}
      },

      tests: [
        "ns.HTML5Module.test.unit.AllTests",
        "ns.HTML5Module.test.integration.AllJourneys"
      ]
    },

    // files: [
    //   {
    //     pattern: "webapp/**",
    //     served: true,
    //     included: false,
    //     watched: true
    //   }
    // ],

    exclude: [
      "karma.conf.js"
    ],

    preprocessors: {
      "webapp/{controller,model}/*.js": ["coverage"]
    },

    reporters: [
      "progress",
      "coverage",
      "junit",
      "sonarqubeUnit"
    ],

    coverageReporter: {
      dir: "reports",

      reporters: [
        {
          type: "cobertura",
          subdir: "coverage",
          file: "coverage.xml"
        },
        {
          type: "lcov",
          subdir: "coverage"
        },
        {
          type: "text-summary"
        }
      ]
    },

    junitReporter: {
      outputDir: "reports",
      outputFile: "TESTS-karma.xml",
      useBrowserName: false,
      suite: "KarmaTests"
    },

    // SonarQube Generic Test Execution Report
    sonarQubeUnitReporter: {
      sonarQubeVersion: "LATEST",
      outputFile: "reports/test-execution.xml",
      overrideTestDescription: true,
      testPaths: ["webapp/test"],
      testFilePattern: ".js",
      useBrowserName: false
    },

    port: 9876,

    hostname:
      process.env.PIPER_SELENIUM_HOSTNAME || containerIp,

    listenAddress: "0.0.0.0",

    colors: true,

    logLevel: config.LOG_DEBUG,

    autoWatch: false,

    singleRun: true,

    browsers: ["ChromeHeadlessNoSandbox"],

    customLaunchers: {

      ChromeHeadlessNoSandbox: {

        base: "ChromeHeadless",

        flags: [
          "--no-sandbox",
          "--disable-dev-shm-usage",
          "--disable-gpu",
          "--headless",
          "--remote-debugging-port=9222"
        ]
      }

      /*
      // OPTIONAL: Selenium Grid Launcher
      SeleniumChrome: {
        base: "WebDriver",

        config: {
          hostname:
            process.env.PIPER_SELENIUM_WEBDRIVER_HOSTNAME || "selenium",

          port:
            parseInt(process.env.PIPER_SELENIUM_WEBDRIVER_PORT) || 4444
        },

        browserName: "chrome",

        name: "Karma",

        flags: [
          "--no-sandbox",
          "--disable-dev-shm-usage"
        ],

        pseudoActivityInterval: 30000
      }
      */
    },

    captureTimeout: 210000,

    browserDisconnectTimeout: 210000,

    browserDisconnectTolerance: 3,

    browserNoActivityTimeout: 210000,

    reportSlowerThan: 500,

    plugins: [
      "karma-ui5",
      "karma-qunit",
     // "karma-mocha",
      "karma-chrome-launcher",
      "karma-junit-reporter",
      //"karma-browserify",
      "karma-coverage",
      "karma-webdriver-launcher",
      "karma-sonarqube-unit-reporter"
    ],

    concurrency: 1,

    forceJSONP: true
  });
};