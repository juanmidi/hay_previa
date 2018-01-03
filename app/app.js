var app = angular.module('myApp', ['ngRoute','satellizer','ngMaterial']);

// //constantes
// app.constant('OPTIONS', {
//   constante1: false,
//   constante2: 'valor1'
// })

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal',{
      'default': '500', // by default use shade 400 from the pink palette for primary intentions
})
    .accentPalette('blue');
})

app.config(['$locationProvider','$routeProvider', '$authProvider', 
  function ($locationProvider, $routeProvider, $authProvider ) {
    $locationProvider.hashPrefix('');

    $authProvider.oauth2({
      name: 'instagram',
      clientId: '550b63e2c02641d48dcb75926d358e55',
      redirectUri: 'http://localhost/hay_previa_ver2/',
      requiredUrlParams: ['scope'],
      responseType: 'token',
      scope: ['basic'],
      scopeDelimiter: '+',
      oauthType: '2.0',
      authorizationEndpoint: 'https://api.instagram.com/oauth/authorize'
    });

    $routeProvider
      .when('/', {
        title: 'Inicio',
        templateUrl: 'partials/inicio.html',
        controller: 'inicioCtrl'
      })
      .when('/login', {
        title: 'Login',
        templateUrl: 'partials/login.html',
        controller: 'loginCtrl'
      })
      .when('/crear', {
        title: 'Crear',
        templateUrl: 'partials/crear_evento.html',
        controller: 'crearCtrl'
      })
      .when('/ajustes', {
        title: 'Ajustes',
        templateUrl: 'partials/ajustes.html',
        controller: 'ajustesCtrl'
      })
      .when('/buscar', {
        title: 'Buscar',
        templateUrl: 'partials/buscar_previa.html',
        controller: 'buscarCtrl'
      })
      .when('/perfil', {
        title: 'Perfil',
        templateUrl: 'partials/perfil.html',
        controller: 'perfilCtrl'
      })
      .when('/:token_accesso', {
          //si esta ruta no se agrega el satellizer NO levanta el access_token
          //No importa el nombre el parámetro. Yo puse '/:token_accesso'
          //Pero podés poner lo que quieras
      })
      .otherwise({
        redirectTo: '/'
      });

}])

