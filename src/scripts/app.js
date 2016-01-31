/*
  Import all Angular components via ES6 imports and register them
  at your module via their corresponding functions (controller, service, etc.).
*/
// import angular from 'angular';
import 'angular-ui-router';
// import firebase from 'firebase';
import Router from './Router';
import { Auth } from './services/authentication'
import { MainController } from './controllers/MainController';

angular.module('ripIssues', ['ui.router', 'firebase', 'hc.marked'])
  .constant('base_url', 'https://easyissues.firebaseio.com/')
  .config(Router)
  .service('Auth', Auth)
	.controller('mainCtrl', MainController);
