'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to ng-js! A generator written by ' + chalk.red('Nikhil (@nikhilraghava)')
    ));
    // Ask the user if he wants to continue
    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'Your project name:',
      default: this.appname
    }, {
      type: 'input',
      name: 'projectAuthors',
      message: 'Authors:',
      store: true,
      default: 'None'
    }, {
      type: 'input',
      name: 'projectDescription',
      message: 'Description:',
      default: 'None'
    }, {
      type: 'input',
      name: 'projectKeywords',
      message: 'Keywords:',
      default: 'None'
    }, {
      type: 'input',
      name: 'projectMain',
      message: 'Main file:',
      default: 'index.html'
    }, {
      type: 'input',
      name: 'projectLicense',
      message: 'License:',
      default: 'MIT'
    }, {
      type: 'input',
      name: 'projectHome',
      message: 'Home page:',
      default: 'None'
    }];
    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    );
    this.fs.copyTpl(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json'), {
        name: this.props.projectName,
        authors: this.props.projectAuthors,
        description: this.props.projectDescription,
        keywords: this.props.projectKeywords,
        main: this.props.projectMain,
        license: this.props.projectLicense,
        homepage: this.props.projectHome
      }
    );
    this.fs.copy(
      this.templatePath('bowerrc'),
      this.destinationPath('.bowerrc')
    );
    mkdirp.sync('controllers');
    this.log('controllers directory has been created...');
    mkdirp.sync('directives');
    this.log('directives directory has been created...');
    mkdirp.sync('js');
    this.log('js directory has been created...');
    mkdirp.sync('media');
    this.log('media directory has been created...');
    mkdirp.sync('views');
    this.log('views directory has been created...');
    mkdirp.sync('dependencies');
    this.log('dependencies directory has been created...');
  },

  install: function () {
    this.installDependencies({
      npm: false,
      bower: true,
      yarn: false
    });
    // Show exit message
    this.log(yosay(chalk.yellow('I am done! See yo next time!')));
  }

});
