'use strict';

// Requires
var yeoman    = require('yeoman-generator');
var chalk     = require('chalk');
var yosay     = require('yosay');
var path      = require('path');
var util      = require('util');
var shelljs   = require('shelljs');
// var licenses  = require('./licenses.js');


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
      name  : 'Academic Free License (v3)',
      value : 'afl3'
    }, {
      name  : 'Apache License (v2)',
      value : 'apache'
    }, {
      name  : 'FreeBSD (2-clause)',
      value : 'bsd2'
    }, {
      name  : 'BSD New (3-clause)',
      value : 'bsd3'
    }, {
      name  : 'Creative Commons (Attribution)',
      value : 'ccby4'
    }, {
      name  : 'Creative Commons (Attribution-NonCommercial)',
      value : 'ccbync4'
    }, {
      name  : 'Creative Commons (Attribution-NonCommercial-ShareAlike)',
      value : 'ccbyncsa4'
    }, {
      name  : 'Creative Commons (Attribution-ShareAlike)',
      value : 'ccbysa4'
    }, {
      name  : 'Creative Commons Zero/Public Domain',
      value : 'cczero1'
    }, {
      name  : 'GNU General Public License Version 1',
      value : 'gpl1'
    }, {
      name  : 'GNU General Public License Version 2',
      value : 'gpl2'
    }, {
      name  : 'GNU General Public License Version 3',
      value : 'gpl3'
    }, {
      name  : 'ISC License',
      value : 'isc'
    }, {
      name  : 'GNU Lesser General Public License Version 2.1',
      value : 'lgpl21'
    }, {
      name  : 'GNU Lesser General Public License Version 3',
      value : 'lgpl3'
    }, {
      name  : 'MIT License',
      value : 'mit'
    }, {
      name  : 'Mozilla Public License',
      value : 'moz'
    }, {
      name  : 'No License (Copyrighted)',
      value : 'nolicense'
    }, {
      name  : 'The Open Software License 3.0',
      value : 'osl3'
    }, {
      name  : 'Public Domain (Unlicense)',
      value : 'unlicense'
    }, {
      name  : 'WTFPL',
      value : 'wtfpl2'
    }, {
      name  : 'zlib License',
      value : 'zlib'
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
