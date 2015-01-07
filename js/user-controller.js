offlineApp.factory('userFactory',['$http','$log',function($http,$log){
	var userFactory = {};
	userFactory.postUser = function(user){
		return $http.post('postUser.php',user);
	}
	return userFactory;
}]);
offlineApp.controller('userCtrl',['$scope','$log','userFactory','offlineFactory',function($scope,$log,userFactory,offlineFactory){
	//The full list of users
	$scope.users = [];
	
	//The user we are currently editing
	$scope.user = {};

	//A reference to the user we are editing
	$scope.editing = {};
	
	//watch for a change to the rootScope variable which is updated when we sync
	$scope.$watch('userCleanRequest',function(cur,old){
 		getUsers();
 	});

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
			  }
			  else {
			  	$scope.$apply();
			    //$log.info("Got all dates: ");
			    //$log.info($rootScope.dates);
			  }
			}
		}
 	}

 	$scope.edit = function(user){
 		//we do not want to change the user until we click save so we are just going to copy it for now
 		$scope.user = angular.copy(user);
 		//we also want to have a reference to the user so that when we click save we can update
 		$scope.editing = user;
 	}

 	$scope.save = function(){
 		$scope.user.dirty_update_time = new Date().getTime();
 		$scope.user.dirty = 'dirty';
 		if($scope.online){
 			//we are online so let's try to save the data to the server
 			userFactory.postUser($scope.user).success(function (data) {
 				//the data saved succesfully so let's set the scope id to match the one on the server
 				$scope.user.id = data;//make sure it is set to an int
 				$scope.user.dirty = 'clean';
 				//Save the data to the browser
 				var userRequest = indexedDB.open("offlineExample",1);//open the browser indexedDB

				userRequest.onsuccess = function(e) {//if successful write to the browser
	 				var userTransaction = db.transaction(["user"], "readwrite");
					var userStore = userTransaction.objectStore("user");
					var request = userStore.put($scope.user,$scope.user.id);
				}

 			}).error(function (error){
 				//something went wrong so let's just save it to the browser and mark it as dirty
 				$scope.user.dirty = 'dirty';
 				//Save the data to the browser
 				var userRequest = indexedDB.open("offlineExample",1);//open the browser indexedDB

				racRequest.onsuccess = function(e) {//if successful write to the browser
	 				var userTransaction = db.transaction(["user"], "readwrite");
					var userStore = userTransaction.objectStore("user");
					var request = userStore.put($scope.user,$scope.user.id);
				}
 			});
 			if($scope.editing.id){
 				$scope.editing = $scope.user;
 			}
 			else{
 				$scope.users.push($scope.user);
 			}
 		}//end of if online
 		else{
 			//we are offline so let's just mark it dirty and save it 
			$scope.user.dirty = 'dirty';
			//Save the data to the browser
			var offlineExampleRequest = indexedDB.open("offlineExample",1);//open the browser indexedDB

			offlineExampleRequest.onsuccess = function(e) {//if successful write to the browser
 				var userTransaction = db.transaction(["user"], "readwrite");
				var userStore = userTransaction.objectStore("user");
				var request = userStore.put($scope.user,$scope.user.id);
			}
 		}
 	}//end of save function

 	$scope.newUser = function(){
 		$scope.editing = {};
 		$scope.user ={};
 	}
}]);