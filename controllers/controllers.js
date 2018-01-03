app.controller('mainController', function ($scope, $window, $location, $mdSidenav, $http, $location) {
  $scope.login = function () {
    var redirectURL = 'http://localhost/hay_previa_ver2/';
    var clientId = "550b63e2c02641d48dcb75926d358e55";
    var url = "https://api.instagram.com/oauth/authorize/?client_id="+ clientId +"&redirect_uri="+ redirectURL +"&response_type=token"
    $window.location.href = url;
  }
    $scope.getDatos = function(){
      document.getElementById('image-side').src = localStorage.getItem("profile_picture");
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

app.controller('inicioCtrl', function ($rootScope, $scope, $http, $window, $location) {
/*     $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    }; */

    
    $scope.verPerfil = function(){
      //Ejemplo de cómo colocar imagen de perfil
      document.getElementById('foto').src = localStorage.getItem("profile_picture");
      document.getElementById('id').innerHTML  = localStorage.getItem("id");
      document.getElementById('username').innerHTML  = localStorage.getItem("username");
      document.getElementById('full_name').innerHTML  = localStorage.getItem("full_name");
      document.getElementById('bio').innerHTML  = localStorage.getItem("bio");
      document.getElementById('website').innerHTML  = localStorage.getItem("website");
      document.getElementById('is_business').innerHTML  = localStorage.getItem("is_business");
      document.getElementById('foto').src = localStorage.getItem("profile_picture");

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



app.controller('tokenCtrl', function ($route, $routeParams, $http, $location) {
  console.log("$routeParams.token_accesso")
  console.log($routeParams.token_accesso)
  var url = "https://api.instagram.com/v1/users/self/?access_token=";
  var access_token = $routeParams.token_accesso.replace("access_token=","");
  localStorage.setItem("access_token", access_token);

  $http.get(url + access_token).then(function (res) {
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

app.controller('buscarCtrl', function ($route, $rootScope, $routeParams, Map) {

})

app.controller('crearCtrl', function ($location, $scope, $mdDialog) {
  navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError, {
    enableHighAccuracy: true
  });

  $scope.tipoDeEvento = function (ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
      .title('¿Qué evento vas a hacer?')
      .css('justify-content', 'center !important')
      .targetEvent(ev)
      .ok('Una Previa')
      .cancel('Una Joda');

    $mdDialog.show(confirm).then(function () {
      $('#txt_evento').text('Vas a hacer una Previa');
    }, function () {
      $('#txt_evento').text('Vas a hacer un Joda');
    });
  };

  $scope.tipoDePrivacidad = function (ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
      .title('¿Es Pública o Privada?')
      .css('text-align', 'center !important')
      .textContent('Si elegís la opcion "Pública", la dirección de tu evento estará accesible para todos los usuarios. Pero si elegís la opcion "Privada", tu dirección sera mostrada en forma de un icono de radio de 1km. Para que un usuario acceda a tu direccion exacta, tendra que mandarte una solicitud, y vos, aceptarla. ')
      .targetEvent(ev)
      .ok('Privada')
      .cancel('Pública');

    $mdDialog.show(confirm).then(function () {
      $('#txt_priv').text('Evento Privado');
    }, function () {
      $('#txt_priv').text('Evento Público');
    });
  };

})


app.controller('loginCtrl', function ($routeParams, $location) {
  var tk = localStorage.getItem("access_token");
  if (!tk){
    $location.path("/login");
  } else {
    $location.path("/");
  }
})

app.controller('perfilCtrl', function ($scope, $location) {
  console.log("estoy en perfil")
  $scope.foto = localStorage.getItem("profile_picture");
  $scope.username = localStorage.getItem("username");
  $scope.id = localStorage.getItem("id");
  $scope.full_name  = localStorage.getItem("full_name");
  $scope.bio  = localStorage.getItem("bio");
  $scope.website  = localStorage.getItem("website");
  $scope.is_business  = localStorage.getItem("is_business");
})

app.controller('ajustesCtrl', function () {

})



