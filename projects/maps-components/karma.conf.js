// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: ['--no-sandbox', '--disable-gpu', '--headless', '--remote-debugging-port=9222'],
      },
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, '../../coverage/maps-components'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text' }, { type: 'text-summary' }],
      // Coverage floor (backlog/007): the 2026-09 baseline is 53.3/36.8/53.3/54.0 -
      // the thresholds sit ~1pt below it so counting noise cannot fail a run.
      // Ratchet upwards as coverage grows; never let a change lower it.
      check: {
        global: {
          statements: 52,
          branches: 36,
          functions: 52,
          lines: 53,
        },
      },
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    restartOnFileChange: true,
  });
};
