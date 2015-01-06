offlineApp.factory('userFactory',['$http','$log',function($http,$log){
	var userFactory = {***REMOVED***;

	return userFactory;
***REMOVED***]);
offlineApp.controller('userCtrl',['$scope','$log','userFactory','offlineFactory',function($scope,$log,userFactory,offlineFactory){
	//The full list of users
	$scope.users = [];
	
	//The user we are currently editing
	$scope.user = {***REMOVED***;

	//A reference to the user we are editing
	$scope.editing = {***REMOVED***;
	
	//watch for a change to the rootScope variable which is updated when we sync
	$scope.$watch('userCleanRequest',function(cur,old){
 		getUsers();
 ***REMOVED***);

 	function getUsers(){
 		var userRequest = indexedDB.open("offlineExample",1);

		userRequest.onsuccess = function(e) {
	        db = e.target.result;
	        $scope.users = [];
	        var transaction = db.transaction(["user"], "readonly");
			var objectStore = transaction.objectStore("user");
			objectStore.openCursor().onsuccess = function(event) {
			  var cursor = event.target.result;
			  if (cursor) {
			    $scope.users.push(cursor.value);
			    cursor.continue();
			  ***REMOVED***
			  else {
			  	$scope.$apply();
			    //$log.info("Got all dates: ");
			    //$log.info($rootScope.dates);
			  ***REMOVED***
		***REMOVED***
	***REMOVED***
 ***REMOVED***

 	$scope.edit = function(user){
 		//we do not want to change the user until we click save so we are just going to copy it for now
 		$scope.user = angular.copy(user);
 		//we also want to have a reference to the user so that when we click save we can update
 		$scope.editing = user;
 ***REMOVED***

 	$scope.save = function(){
 		if($scope.user.id){
 			$scope.editing.name = $scope.user.name;
 			$scope.user = {***REMOVED***;
 	***REMOVED***
 		else{
 			$scope.users.push($scope.user);
 			$scope.user ={***REMOVED***;
 	***REMOVED***
 ***REMOVED***

 	$scope.newUser = function(){
 		$scope.editing = {***REMOVED***;
 		$scope.user ={***REMOVED***;
 ***REMOVED***
***REMOVED***]);