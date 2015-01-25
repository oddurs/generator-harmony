'use strict';

// Requires
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var util = require('util');

module.exports = yeoman.generators.Base.extend({

  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.option('test-framework', {
      desc: 'Test framework to be invoked',
      type: String,
      defaults: 'mocha'
    });

    this.option('skip-welcome-message', {
      desc: 'Skips the welcome message',
      type: Boolean
    });

    this.option('skip-install', {
      desc: 'Skips the installation of dependencies',
      type: Boolean
    });

    this.option('skip-install-message', {
      desc: 'Skips the message after the installation of dependencies',
      type: Boolean
    });
  },

  initializing: function() {
    this.pkg = require('../package.json');

    // Yeoman greeting
    this.log(yosay(
      'Welcome to the exceptional' + chalk.red('Bedrock') + ' generator!'
    ));
  },

  userPrompt: function() {
    var done = this.async();

    // Prompts for User and Repo
    var prompts = [{
      type: 'input',
      name: 'fullName',
      message: 'What is your full name?',
      default: 'John Smith'
    }, {
      type: 'input',
      name: 'gitHubUserName',
      message: 'What is your GitHub user name?',
      default: 'user'
    }, {
      type: 'input',
      name: 'gitHubRepoName',
      message: 'What is the name of your GitHub repo?',
      default: 'project'
    }];

    this.prompt(prompts, function(props) {
      this.fullName = props.fullName;
      this.gitHubUserName = props.gitHubUserName;
      this.gitHubRepoName = props.gitHubRepoName;
      done();
    }.bind(this));
  },

  integrationsPrompt: function() {
    var done = this.async();

    // // Prompts for badge integrations
    var prompts = [{
      type: 'confirm',
      name: 'isCoverallsEnabled',
      message: 'Would you like to enable the Coveralls badge?',
      default: true
    }, {
      type: 'confirm',
      name: 'isTravisEnabled',
      message: 'Would you like to enable the Travis badge?',
      default: true
    }];

    this.prompt(prompts, function(props) {
      this.isCoverallsEnabled = props.isCoverallsEnabled;
      this.isTravisEnabled = props.isTravisEnabled;

      done();
    }.bind(this));
  },

  licensePrompt: function() {
    var done = this.async();

    // List of possible licenses
    var licenses = [{
      name: 'Apache 2.0',
      value: 'apache'
    }, {
      name: 'MIT',
      value: 'mit'
    }];

    // // Prompts for licenses
    var prompts = [{
      type: 'list',
      name: 'license',
      message: 'What license do you want to use?:',
      choices: licenses
    }];

    this.prompt(prompts, function(props) {
      var filename = props.license + '.txt';

      // data for template
      this.fullName = props.fullName;
      this.year = (new Date()).getFullYear();

      this.template(filename, 'LICENSE');
      done();
    }.bind(this));
  },

  writing: {
    app: function() {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
    },

    projectfiles: function() {
      this.fs.copy(
        this.templatePath('_editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    },

    licenseFiles: function() {
      console.log('=============');
    }
  },

  install: function() {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
