angular.module('starter.services', ['firebase'])

.factory("Points", function($firebaseArray) {

  var points_data = new Firebase("https://uwibootcamp.firebaseio.com/points");

  var points = $firebaseArray(points_data);

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

  var data = new Firebase("https://uwibootcamp.firebaseio.com/comments");

  var comments = $firebaseArray(data);

  return {
		all:function(pointId) {

      var arr_comments = [];

      console.log("Getting comments for point ID:"+pointId);

      //TODO: Fix to select correct comments for chosen point
      for(var i=0;i<comments.length;i++){
        // console.log(points[i].id,id);
        if(comments[i].point_id != pointId){
          comments.slice(i);
        }
      }

      arr_comments = comments;
      console.log(arr_comments);
      return arr_comments;

    }
  }

});
