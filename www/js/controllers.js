angular.module('starter.controllers', ['starter.services','firebase'])


.controller('MapCtrl', function($scope, $ionicLoading, $state, $stateParams, $compile, Points) {

  var points = Points;
  //TODO: Move this to services
  var markers = Points.all();

  $scope.init = function() {
        console.log("Load data from firebase and initialize map");

        var myLatlng = new google.maps.LatLng(13.1704468,-59.6357891); //Sandy Lane Golf Course lol

        var mapOptions = {
          center: myLatlng,
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),mapOptions);

        //Detect user's location
        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            // var myLocation = new google.maps.Marker({
            //     position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
            //     map: map,
            //     title: "My Location"
            // });
        });


        // var marker = new google.maps.Marker({
        //   position: myLatlng,
        //   map: map,
        //   title: 'Uluru (Ayers Rock)'
        // });

        for(var x=0;x < markers.length;x++){

          var markerinfo = new google.maps.Marker({
            position: new google.maps.LatLng(markers[x].latitude,markers[x].longitude),
            map: map,
            title: markers[x].title
          });

          //Marker + infowindow + angularjs compiled ng-click
          var contentString = "<div><a ng-click='clickTest("+markers[x].id+")'>"+markers[x].title+"</a></div>";
          var compiled = $compile(contentString)($scope);

          var infowindow = new google.maps.InfoWindow({
            content: compiled[0]
          });


          google.maps.event.addListener(markerinfo, 'click', function() {
            infowindow.open(map,markerinfo);
          });

        }


        $scope.map = map;
    };

    // google.maps.event.addDomListener(window, 'load', initialize);

    $scope.centerOnMe = function() {
        if(!$scope.map) {
            return;
        }

        $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $ionicLoading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
    };

    //TODO: Fix this. Param is passing but content is not loading
    $scope.clickTest = function(point_id) {

        $state.go('tab.point-info', { pointId:point_id });

    };

})



.controller('PointsCtrl', function($scope, Points) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.points = Points.all();


})

.controller('PointInfoCtrl', function($scope, $stateParams, $firebase, $firebaseArray, Points, Comments, $ionicModal, $cordovaCamera) {

  console.log($stateParams);
  $scope.points = Points.all();
  $scope.point = Points.get($stateParams.pointId);
  $scope.point_id = $stateParams.pointId;

  $scope.comments = Comments.all($scope.point_id);

  console.log($scope.point);

  $ionicModal.fromTemplateUrl('templates/modal-newComment.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.commentmodal = modal;
  });


  // $scope.chats = Chats.all();
  $scope.addComment = function() {
    $scope.commentmodal.show()
  };

  $scope.closeCommentModal = function() {
    $scope.commentmodal.hide();
  };

  var timeInMs = Date.now();
  console.log(timeInMs);
  $scope.comment = [{
    text:'',
    point_id:'',
    comment_date: timeInMs
  }];

  // $ionicHistory.clearHistory();

  $scope.images = [];

  // var fb = new Firebase("https://uwibootcamp-test.firebaseio.com");
  var syncArray = $firebaseArray(fb.child("images"));
  $scope.images = syncArray;

  $scope.takePhoto = function() {
      var options = {
          quality : 75,
          destinationType : Camera.DestinationType.DATA_URL,
          sourceType : Camera.PictureSourceType.CAMERA,
          allowEdit : true,
          encodingType: Camera.EncodingType.JPEG,
          popoverOptions: CameraPopoverOptions,
          targetWidth: 500,
          targetHeight: 500,
          saveToPhotoAlbum: false
      };
      $cordovaCamera.getPicture(options).then(function(imageData) {
          syncArray.$add({image: imageData}).then(function() {
              alert("Image has been uploaded");
          });
      }, function(error) {
          console.error(error);
      });
  }

  $scope.saveComment = function(form){

    var ref = new Firebase("https://uwibootcamp-test.firebaseio.com/");
    var commentsRef = ref.child("comments");
    // commentsRef.set({
    //   alanisawesome: {
    //     date_of_birth: "June 23, 1912",
    //     full_name: "Alan Turing"
    //   },
    //   gracehop: {
    //     date_of_birth: "December 9, 1906",
    //     full_name: "Grace Hopper"
    //   }
    // });

    // var fb = new Firebase('https://uwibootcamp.firebaseio.com/');
    //
    commentsRef.push({
        text: $scope.comment.text,
        point_id: parseInt($scope.point_id)
    });

    //Clear the comment fields
    $scope.comment.text = '';
    $scope.comment.point_id = '';

    //Hide modal
    $scope.commentmodal.hide();

  }

})

.controller('AccountCtrl', function($scope) {

  //TODO: Use user profile info (facebook login?)

})


//TODO: To be removed? Useful direction function here
.controller('Map2Ctrl', function($scope, $ionicLoading, $compile) {
     function initialize() {
       var site = new google.maps.LatLng(55.9879314,-4.3042387);
       var hospital = new google.maps.LatLng(55.8934378,-4.2201905);

       var mapOptions = {
         streetViewControl:true,
         center: site,
         zoom: 18,
         mapTypeId: google.maps.MapTypeId.TERRAIN
       };
       var map = new google.maps.Map(document.getElementById("map"),
           mapOptions);

       //Marker + infowindow + angularjs compiled ng-click
       var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
       var compiled = $compile(contentString)($scope);

       var infowindow = new google.maps.InfoWindow({
         content: compiled[0]
       });

       var marker = new google.maps.Marker({
         position: site,
         map: map,
         title: 'Strathblane (Job Location)'
       });

       var hospitalRoute = new google.maps.Marker({
         position: hospital,
         map: map,
         title: 'Hospital (Stobhill)'
       });

       var infowindow = new google.maps.InfoWindow({
            content:"Project Location"
       });

       infowindow.open(map,marker);

       var hospitalwindow = new google.maps.InfoWindow({
            content:"Nearest Hospital"
       });

       hospitalwindow.open(map,hospitalRoute);

       google.maps.event.addListener(marker, 'click', function() {
         infowindow.open(map,marker);
       });

       $scope.map = map;

       var directionsService = new google.maps.DirectionsService();
       var directionsDisplay = new google.maps.DirectionsRenderer();

       var request = {
           origin : site,
           destination : hospital,
           travelMode : google.maps.TravelMode.DRIVING
       };
       directionsService.route(request, function(response, status) {
           if (status == google.maps.DirectionsStatus.OK) {
               directionsDisplay.setDirections(response);
           }
       });

       directionsDisplay.setMap(map);

     }

     google.maps.event.addDomListener(window, 'load', initialize);

     $scope.centerOnMe = function() {
       if(!$scope.map) {
         return;
       }

       $scope.loading = $ionicLoading.show({
         content: 'Getting current location...',
         showBackdrop: false
       });
       navigator.geolocation.getCurrentPosition(function(pos) {
         $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
         $scope.loading.hide();
       }, function(error) {
         alert('Unable to get location: ' + error.message);
       });
     };

     $scope.clickTest = function() {
       alert('Example of infowindow with ng-click')
     };

   });
