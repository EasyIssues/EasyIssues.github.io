export default ['$stateProvider', '$urlRouterProvider', 'markedProvider', function($stateProvider, $urlRouterProvider, markedProvider) {
  markedProvider.setOptions({gfm: true});

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: './partials/home.html',
  })

  $urlRouterProvider.otherwise('/');
}];
