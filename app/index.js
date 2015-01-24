'use strict';

// Requires
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var util = require('util');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');

    // Yeoman greeting
    this.log(yosay(
      'Welcome to the exceptional' + chalk.red('Bedrock') + ' generator!'
      ));
  },

  userPrompt: function () {
    var done = this.async();

    // Prompts for User and Repo
    var prompts = [{
      type: 'input',
      name: 'fullName',
      message: 'What is your full name?',
      default: 'John Smith'
    },{
      type: 'input',
      name: 'gitHubUserName',
      message: 'What is your GitHub user name?',
      default: 'user'
    },{
      type: 'input',
      name: 'gitHubRepoName',
      message: 'What is the name of your GitHub repo?',
      default: 'project'
    }];

    this.prompt(prompts, function (props) {
      this.fullName = props.fullName;
      this.gitHubUserName= props.gitHubUserName;
      this.gitHubRepoName = props.gitHubRepoName;
      done();
    }.bind(this));
  },

  integrationsPrompt: function () {
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

  licensePrompt: function () {
    var done = this.async();

    // List of possible licenses
    var licenses = [
      { name: 'Apache 2.0', value: 'apache' },
      { name: 'MIT', value: 'mit' },
      { name: 'Unlicense', value: 'unlicense' },
      { name: 'FreeBSD', value: 'freebsd' },
      { name: 'NewBSD', value: 'newbsd' },
      { name: 'Internet Systems Consortium (ISC)', value: 'isc' },
      { name: 'No License (Copyrighted)', value: 'nolicense' }
    ];

    // // Prompts for licenses
    var prompts = [{
      type: 'list',
      name: 'license',
      message: 'What license do you want to use?:',
      choices: licenses
    }];

    this.prompt(prompts, function(props) {
      var filename = props.license + '.md';

      // data for template
      this.year = (new Date()).getFullYear();
      this.name = props.name;

      this.template(filename, 'LICENSE');
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
        );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
        );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
        );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
        );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
