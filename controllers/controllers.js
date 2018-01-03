app.service('Map', function ($q) {
    
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 13
    });
    var infoWindow = new google.maps.InfoWindow({ map: map });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Tu ubicación');
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
});

app.controller('mainController', function ($scope, $window, $location, $mdSidenav, $http, $location, $auth) {

  $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {
          //****************************
          //resultados
          console.log('Ya está loggeado con ' + provider + '!');
          console.log("access_token")
          console.log(response)
          //****************************

          var url = "https://api.instagram.com/v1/users/self/?access_token=";
          var access_token = response.access_token;
          localStorage.setItem("access_token", access_token);

          $http.get(url + access_token).then(function(res){
            //guarda en local los datos de usuario
            localStorage.setItem("id", res.data.data.id);
            localStorage.setItem("username", res.data.data.username);
            localStorage.setItem("full_name", res.data.data.full_name);
            localStorage.setItem("profile_picture", res.data.data.profile_picture);
            localStorage.setItem("bio", res.data.data.bio);
            localStorage.setItem("website", res.data.data.website);
            localStorage.setItem("is_business", res.data.data.is_business);
            $location.path('/');
          })
        })
        .catch(function(error) {
          if (error.message) {
            // Satellizer promise reject error.
            console.log(error.message);
          } else if (error.data) {
            // HTTP response error from server
            console.log(error.data.message, error.status);
          } else {
            console.log(error);
          }
        });
    };

    $scope.getDatos = function(){
      document.getElementById('foto').src = localStorage.getItem("profile_picture");
      // document.getElementById('id').innerHTML  = localStorage.getItem("id");
      document.getElementById('username').innerHTML  = localStorage.getItem("username");
      // document.getElementById('full_name').innerHTML  = localStorage.getItem("full_name");
      // document.getElementById('bio').innerHTML  = localStorage.getItem("bio");
      // document.getElementById('website').innerHTML  = localStorage.getItem("website");
      // document.getElementById('is_business').innerHTML  = localStorage.getItem("is_business");
    }

    $scope.openSideNavPanel = function() {
        $mdSidenav('left').open();
    };
    $scope.closeSideNavPanel = function() {
        $mdSidenav('left').close();
    };


    $scope.crear = function(){
      $location.path("/crear");
      $scope.closeSideNavPanel();
    }

    $scope.inicio = function(){
      $location.path("/");
      $scope.closeSideNavPanel();
    }
  
    $scope.buscar = function(){
      $location.path("/buscar");
      $scope.closeSideNavPanel();
    }

    $scope.perfil = function(){
      $location.path("/perfil");
      $scope.closeSideNavPanel();
    }

    $scope.ajustes = function(){
      $location.path("/ajustes");
      $scope.closeSideNavPanel();
    }

})

app.controller('inicioCtrl', function ($rootScope, $scope, $http, $auth, $window, $location) {
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    
    $scope.verPerfil = function(){
      //Ejemplo de cómo colocar imagen de perfil
      document.getElementById('foto').src = localStorage.getItem("profile_picture");
      document.getElementById('id').innerHTML  = localStorage.getItem("id");
      document.getElementById('username').innerHTML  = localStorage.getItem("username");
      document.getElementById('full_name').innerHTML  = localStorage.getItem("full_name");
      document.getElementById('bio').innerHTML  = localStorage.getItem("bio");
      document.getElementById('website').innerHTML  = localStorage.getItem("website");
      document.getElementById('is_business').innerHTML  = localStorage.getItem("is_business");
    }
    
    // $scope.verPerfil();
    var tmp = localStorage.getItem("access_token");
    if(!tmp){
      $location.path("/login");
    } else {
      $location.path("/");
      $scope.getDatos();
    }

});

app.controller('loginCtrl', function () {

})

app.controller('buscarCtrl', function ($route, $rootScope, $routeParams, Map) {

})

app.controller('crearCtrl', function ($location) {

})

app.controller('perfilCtrl', function ($scope, $location) {

  $scope.foto = localStorage.getItem("profile_picture");
  $scope.username = localStorage.getItem("username");
  $scope.id = localStorage.getItem("id");
  $scope.full_name  = localStorage.getItem("full_name");
  $scope.bio  = localStorage.getItem("bio");
  $scope.website  = localStorage.getItem("website");
  $scope.is_business  = localStorage.getItem("is_business");
})

app.controller('ajustesCtrl', function ($location) {

})



