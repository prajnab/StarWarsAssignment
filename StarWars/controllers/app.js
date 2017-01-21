var myApp = angular.module("starWarsApp", ["ngRoute"])
.config(function ($routeProvider, $locationProvider){
                      $routeProvider.caseInsensitiveMatch = true;
                       $routeProvider
                           .when("/home", {
                           templateUrl: "templates/home.html",
                           controller: "homeController",
                           controllerAs: "homeCtrl"
                       })
                           .when("/films", {
                           templateUrl: "templates/list.html",
                           controller: "listController",
                           controllerAs: "listCtrl"
                       })
                           .when("/species", {
                           templateUrl: "templates/list.html",
                           controller: "listController",
                           controllerAs: "listCtrl"
                       })
                           .when("/planets", {
                           templateUrl: "templates/list.html",
                           controller: "listController",
                           controllerAs: "listCtrl"
                       })
                           .when("/people", {
                           templateUrl: "templates/list.html",
                           controller: "listController",
                           controllerAs: "listCtrl"
                       })
                           .when("/starships", {
                           templateUrl: "templates/list.html",
                           controller: "listController",
                           controllerAs: "listCtrl"
                       })
                           .when("/vehicles", {
                           templateUrl: "templates/list.html",
                           controller: "listController",
                           controllerAs: "listCtrl"
                       })
                       .when("/films/:id", {
                           templateUrl: "templates/details.html",
                           controller: "detailsController",
                           controllerAs: "detailsCtrl"
                       })
                       .when("/species/:id", {
                           templateUrl: "templates/details.html",
                           controller: "detailsController",
                           controllerAs: "detailsCtrl"
                       })
                       .when("/planets/:id", {
                           templateUrl: "templates/details.html",
                           controller: "detailsController",
                           controllerAs: "detailsCtrl"
                       })
                       .when("/people/:id", {
                           templateUrl: "templates/details.html",
                           controller: "detailsController",
                           controllerAs: "detailsCtrl"
                       })
                       .when("/starships/:id", {
                           templateUrl: "templates/details.html",
                           controller: "detailsController",
                           controllerAs: "detailsCtrl"
                       })
                       .when("/vehicles/:id", {
                           templateUrl: "templates/details.html",
                           controller: "detailsController",
                           controllerAs: "detailsCtrl"
                       })
                           .otherwise({
                           redirectTo: "/home"
                       })
                       //$locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');
                   })
.controller("navBarController", function($scope, $location) {
            $scope.isNavBarActive = function (viewLocation) {
                console.log("viewLocation : " + viewLocation + "path : " + $location.path());
                return (("/" + viewLocation) === $location.path()); 
            };
})
.controller("homeController", function ($rootScope, $window) {
    $rootScope.isNavBarVisible = false;
    $rootScope.tabsData = [
        { name: "films", path: "#/films", logo: "assets/img/topics/films_normal.png", hoverLogo: "assets/img/topics/films_pressed.png" },
        { name: "species", path: "#/species", logo: "assets/img/topics/species_normal.png", hoverLogo: "assets/img/topics/species_pressed.png" },
        { name: "planets", path: "#/planets", logo: "assets/img/topics/planets_normal.png", hoverLogo: "assets/img/topics/planets_pressed.png" },
        { name: "people", path: "#/people", logo: "assets/img/topics/characters_normal.png", hoverLogo: "assets/img/topics/characters_pressed.png" },
        { name: "starships", path: "#/starships", logo: "assets/img/topics/droids_normal.png", hoverLogo: "assets/img/topics/droids_pressed.png" },
        { name: "vehicles", path: "#/vehicles", logo: "assets/img/topics/vehicles_normal.png", hoverLogo: "assets/img/topics/vehicles_pressed.png" }
    ];
    $rootScope.onFooterItemClicked = function ()
    {
        $window.location.href = "www.robosoftin.com";
    }
})
.controller("listController", function($scope, $http, $location, $rootScope){
    $rootScope.isNavBarVisible = true;
    
     var successCallback = function (response) {
         $scope.nextUrl = response.data.next;
         $scope.prevUrl = response.data.previous;
         $scope.listData = response.data.results;
    };

    var errorCallback = function (response) {
        $scope.error = response.data;
    };
    
    $scope.path = $location.path();
    console.log($scope.path);
    
    $http.get("http://swapi.co/api" + $scope.path).then(successCallback, errorCallback);
    
    $scope.getPreviousListData = function () {
        console.log($scope.prevUrl);
        $http.get($scope.prevUrl).then(successCallback, errorCallback);
    };

    $scope.getNextListData = function () {
        console.log($scope.nextUrl);
        $http.get($scope.nextUrl).then(successCallback, errorCallback);
    };
})
.controller("detailsController", function($scope, $http, $location, $rootScope){
    $rootScope.isNavBarVisible = true;
    
     var successCallback = function (response) {
         $scope.detailsData = response.data;
         console.log(response.data);
    };

    var errorCallback = function (response) {
        $scope.error = response.data;
    };
    $scope.path = $location.path();
    console.log($scope.path);
    $http.get("http://swapi.co/api" + $scope.path).then(successCallback, errorCallback)
});

