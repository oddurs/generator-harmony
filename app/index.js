'use strict';

// Requires
var yeoman = require('yeoman-generator');
var chalk  = require('chalk');
var yosay  = require('yosay');
var path   = require('path');
var util   = require('util');


module.exports = yeoman.generators.Base.extend({

  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);

    this.option('test-framework', {
      desc     : 'Test framework to be invoked',
      type     : String,
      defaults : 'mocha'
    });

    this.option('skip-welcome-message', {
      desc : 'Skips the welcome message',
      type : Boolean
    });

    this.option('skip-install', {
      desc : 'Skips the installation of dependencies',
      type : Boolean
    });

    this.option('skip-install-message', {
      desc : 'Skips the message after the installation of dependencies',
      type : Boolean
    });
  },

  initializing: function() {
    this.pkg = require('../package.json');

    // Yeoman greeting
    this.log(yosay(
      'Welcome to the exceptional ' + chalk.red('Bedrock') + ' generator!'
    ));
  },

  userPrompt: function() {
    var done = this.async();

    // Prompts for User and Repo
    var prompts = [{
      type    : 'input',
      name    : 'name',
      message : 'What is your full name?',
      default : 'John Smith'
    }, {
      type    : 'input',
      name    : 'gitHubUserName',
      message : 'What is your GitHub user name?',
      default : 'user'
    }, {
      type    : 'input',
      name    : 'email',
      message : 'What is your email?',
      default : 'name@company.com'
    }, {
      type    : 'input',
      name    : 'gitHubRepoName',
      message : 'What is the name of your GitHub repo?',
      default : 'project'
    }];

    this.prompt(prompts, function(props) {
      this.name  = props.name;
      this.user  = props.user;
      this.repo  = props.repo;
      this.email = props.email;
      done();
    }.bind(this));
  },

  integrationsPrompt: function() {
    var done = this.async();

    // // Prompts for badge integrations
    var prompts = [{
      type    : 'confirm',
      name    : 'isCoverallsEnabled',
      message : 'Would you like to enable the Coveralls badge?',
      default : true
    }, {
      type    : 'confirm',
      name    : 'isTravisEnabled',
      message : 'Would you like to enable the Travis badge?',
      default : true
    }];

    this.prompt(prompts, function(props) {
      this.coverall = props.coverall;
      this.travis   = props.travis;

      done();
    }.bind(this));
  },

  licensePrompt: function() {
    var done = this.async();

    // List of possible licenses
    var licenses = [{
      name  : 'Apache 2.0',
      value : 'apache'
    }, {
      name  : 'MIT',
      value : 'mit'
    }];

    // // Prompts for licenses
    var prompts = [{
      type    : 'list',
      name    : 'license',
      message : 'What license do you want to use?:',
      choices : licenses
    }];

    this.prompt(prompts, function(props) {
      this.year    = (new Date()).getFullYear();
      this.license = props.license;

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
      this.fs.copy(
        this.templatePath('_CHANGELOG.md'),
        this.destinationPath('CHANGELOG.md')
      );
    },

    licenseFiles: function() {
      var context = {
        name : this.name,
        year : this.year
      };
      this.template('licenses/' + this.license + '.txt', 'LICENSE.txt', context);
    },

    readmeFiles: function() {
      var context = {
        name     : this.name,
        user     : this.user,
        repo     : this.repo,
        year     : this.year,
        coverall : this.coverall,
        travis   : this.travis,
        license  : this.license
      };
      this.template('_README.md', 'README.md', context);
    },
  },

  install: function() {
    this.installDependencies({
      skipInstall : this.options['skip-install']
    });
  }
});
