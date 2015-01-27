'use strict';

// Requires
var yeoman    = require('yeoman-generator');
var chalk     = require('chalk');
var yosay     = require('yosay');
var path      = require('path');
var util      = require('util');
var shelljs   = require('shelljs');


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
    var done = this.async();

    this.pkg = require('../package.json');

    // Yeoman greeting
    this.log(yosay(
      'Welcome to the exceptional ' + chalk.red('Harmony') + ' generator!'
    ));

    this.gitInfo = {
      name: shelljs.exec('git config user.name', {silent: true}).output.replace(/\n/g, ''),
      email: shelljs.exec('git config user.email', {silent: true}).output.replace(/\n/g, '')
    }
    done();
  },

  userPrompt: function() {
    var done = this.async();

    this.log('\nPersonal Information\n');

    // Prompts for User and Repo
    var prompts = [{
      type    : 'input',
      name    : 'user',
      message : 'What is your GitHub user name?',
      default : ''
    }];

    this.prompt(prompts, function(props) {
      this.user = props.user;
      done();
    }.bind(this));
  },

  userConfirmationPrompt: function () {
    var done = this.async();

    var prompts = [{
      type    : 'input',
      name    : 'name',
      message : 'What is your full name?',
      default : this.gitInfo.name
    }, {
      type    : 'input',
      name    : 'email',
      message : 'What is your email?',
      default : this.gitInfo.email
    }, {
      type    : 'input',
      name    : 'repo',
      message : 'What is the name of your GitHub repo?',
      default : 'project'
    }, {
      type    : 'input',
      name    : 'description',
      message : 'Give a short description about your project',
      default : ''
    }];

    this.prompt(prompts, function(props) {
      this.name        = props.name;
      this.email       = props.email;
      this.repo        = props.repo;
      this.description = props.description;
      done();
    }.bind(this));
  },

  integrationsPrompt: function() {
    var done = this.async();

    this.log('\nProject Integrations\n');

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

    this.log('\nLicensing Information\n');

    // List of possible licenses
    var licenses = [{
      name  : 'Apache 2.0 License',
      value : 'apache'
    }, {
      name  : 'MIT License',
      value : 'mit'
    }, {
      name  : 'Unlicense',
      value : 'unlicense'
    }, {
      name  : 'Academic Free License ("AFL") v. 3.0',
      value : 'afl3'
    }, {
      name  : 'New BSD License',
      value : 'bsd3'
    }, {
      name  : 'Simplified BSD License',
      value : 'bsd2'
    }, {
      name  : 'Open Software License v. 3.0',
      value : 'osl3'
    }, {
      name  : 'NewBSD',
      value : 'newbsd'
    }, {
      name  : 'Internet Systems Consortium (ISC)',
      value : 'isc'
    }, {
      name  : 'No License (Copyrighted)',
      value : 'nolicense'
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
      this.licenseName = function () {
        for (var i = 0; i < licenses.length; i++) {
          if (this.license === licenses[i].value) {
            return licenses[i].name;
          }
        }
        return "Unlicensed";
      }
      done();
    }.bind(this));
  },

  writing: {
    projectfiles: function() {
      this.fs.copy(
        this.templatePath('_editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('_jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('_CHANGELOG.md'),
        this.destinationPath('CHANGELOG.md')
      );
      this.fs.copy(
        this.templatePath('_CONTRIBUTING.md'),
        this.destinationPath('CONTRIBUTING.md')
      );
    },

    generateFiles: function() {
      var context = {
        name        : this.name,
        user        : this.user,
        repo        : this.repo,
        description : this.description,
        year        : this.year,
        coverall    : this.coverall,
        travis      : this.travis,
        license     : this.license,
        licenseName : this.licenseName()
      };
      // Generate license file
      this.template('licenses/' + this.license + '.txt', 'LICENSE.txt', context);

      // Generate readme
      this.template('_README.md', 'README.md', context);

      // Generate contribution guide
      this.template('_CONTRIBUTING.md', 'CONTRIBUTING.md', context);
    }
  }
});
