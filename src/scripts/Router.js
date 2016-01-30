export default ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('home', {
    url: '/',
    templateUrl: './partials/home.html',
  })

  $urlRouterProvider.otherwise('/');
}];
