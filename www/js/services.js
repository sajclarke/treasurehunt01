angular.module('starter.services', ['firebase'])

.factory("Points", function($firebaseArray, localStorageService) {

  var points = [];

  if (localStorageService.get('pointsData')) {
    console.log('load from local');
    points = localStorageService.get('pointsData');
  } else {
    console.log('load fresh');

    var fb = new Firebase('https://uwibootcamp-test.firebaseio.com/');
    fb.set(
      {
        "points": [
        {
            id:1,
            title: "Grapefruit of Wrath",
            latitude: 13.105849,
            longitude: -59.5815219
        },
        {
            id:2,
            title: "Wind Through the Keyhole",
            latitude: 13.1337264,
            longitude: -59.5594634
        },
        {
            id:3,
            title: "Art of Racing in the Rain",
            latitude: 13.1091092,
            longitude: -59.4897689
        }
      ]
    },function(data){

    });


  }

  var points_data = new Firebase("https://uwibootcamp-test.firebaseio.com/points");

  points = $firebaseArray(points_data);
  console.log(points);

  window.localStorage.setItem("points_data", JSON.stringify($firebaseArray(points_data)));

  // localStorageService.set('pointsData', points);

  console.log(localStorage.getItem('points_data'));


  // console.log(points);


  return {
		all:function() {


      return points;

    },
    get:function(id){
      var points_arr = points;

      var sel_point = '';

      console.log("Getting info for point ID:"+id);

      for(var i=0;i<points_arr.length;i++){
        // console.log(points[i].id,id);
        if(points[i].id == id){
          sel_point = points[i];
        }
      }

      // console.log(points_arr);
      // console.log(sel_point);

      return sel_point;

    }
  }

})

.factory("Comments", function($firebaseArray) {

  var data = new Firebase("https://uwibootcamp-test.firebaseio.com");

  var comments = $firebaseArray(data.child("comments"));

  return {
		all:function(pointId) {

      var arr_comments = [];

      console.log("Getting comments for point ID:"+pointId);
      console.log(comments);
      //TODO: Fix to select correct comments for chosen point
      if(comments.length)
      for(var i=0;i<comments.length;i++){
        // console.log(points[i].id,pointId);

        pointId = parseInt(pointId);
        if(comments[i].point_id != pointId){
          comments.splice(i,1);
            console.log(comments[i].point_id,pointId);
        }
        // console.log(i, 0)
      }

      arr_comments = comments;
      console.log(arr_comments);
      return arr_comments;

    }
  }

});
