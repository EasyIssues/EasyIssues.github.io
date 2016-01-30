/*
  Import all Angular components via ES6 imports and register them
  at your module via their corresponding functions (controller, service, etc.).
*/
import angular from 'angular';
import 'angular-ui-router';
import 'firebase';
import Router from './Router';
import MainController from './controllers/MainController';

angular.module('ripIssues', ['ui.router', 'firebase'])
  .config(Router)
	.controller('mainCtrl', MainController);
