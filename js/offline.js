function indexedDBOk() {
    return "indexedDB" in window;
***REMOVED***

//create our angular application
offlineApp = angular.module('offline',[]);

//create a service for getting and updating our list of users
offlineApp.factory('offlineFactory',['$http',function($http){
	var offlineFactory = {***REMOVED***;
	offlineFactory.getUsers = function(){
		return $http.get("getUsers.php");
***REMOVED***

	offlineFactory.postUsers = function(data){
		return $http.post("postUsers.php",data);
***REMOVED***
	return offlineFactory;
***REMOVED***]);

//create a controller for managing changes to our environment like going offline/online
offlineApp.run(['$window','$rootScope','$log', 'offlineFactory',function($window, $rootScope, $log, offlineFactory) {
	//set a variable that will be accessible when there is a change to the user table
	$rootScope.userRequest;
	$rootScope.userCleanRequest;

	//watch for changes to userRequest and apply when appropriate

	////////////////////////////////////////////////////
	//
	//	CREATE THE BROWSER DATABASE AND USER TABLE
	//
	////////////////////////////////////////////////////////
	if(indexedDBOk){
		//Create a new database
		//The first parameter is the name of the database and the second is the version
		//You can not use decimal places for the versions
		var dbRequest = indexedDB.open("offlineExample",1);

		//if there is a need to upgrade the database the following will be run. It will also be run the first time the user accesses the site
		dbRequest.onupgradeneeded = function(e) {
			//get and instance of the db
		    var db = e.target.result;

		    //check to see the database has a table named user
		    if(!db.objectStoreNames.contains("user")) {
		    	//if it does not already exist create the table `user`
		        db.createObjectStore("user");
		    ***REMOVED***
	***REMOVED***
		//callback if the dbrequest completed successfully
		dbRequest.onsuccess = function(e) {
			//now that we have a database let's load it up with data from the server
	        db = e.target.result;
	***REMOVED***

		//callback if the dbrequest did not complete
		dbRequest.onerror = function(e) {
	        db = e.target.result;
	***REMOVED***
***REMOVED***

	/////////////////////////////////////////////////////////
	//
	//	CHECK IF THE USER IS ONLINE OR OFFLINE
	//
	/////////////////////////////////////////////////////////
	//use the native browser indicator for whether it is online or offline
  	$rootScope.online = navigator.onLine;

  	//add an event listener to the window for when it changes to offline
  	$window.addEventListener("offline", function () {
    	$rootScope.$apply(function() {
          	$rootScope.online = false;
        ***REMOVED***);
      ***REMOVED***, false);

  	//add an event listener to the window for when it changes to online
  	$window.addEventListener("online", function () {
    	$rootScope.$apply(function() {
	        $rootScope.online = true;
	    ***REMOVED***);
  ***REMOVED***, false);

  	$rootScope.$watch('online',function(online_now,offline_before){
  		if(online_now==true && offline_before==true){
  			sync();
  	***REMOVED***
  ***REMOVED***);
  	//Send data from the browser that has not been sync'd and get data from the server
  	var sync = function(){
  		//set variable with dirty information
  		dirty = [];
  		var dbRequest = indexedDB.open("offlineExample",1);
  		//callback if the dbrequest completed successfully
		dbRequest.onsuccess = function(e) {
			//now that we have a database let's load it up with data from the server
	        db = e.target.result;
			
	  		var userTransaction = db.transaction(["user"], "readwrite");
	        var userStore = userTransaction.objectStore("user");

	        //loop through all of the votes in the browser and find those marked dirty to upload to the server
	        userStore.openCursor().onsuccess = function(event) {
			    var cursor = event.target.result;
			    if (cursor) {
			    	if(cursor.value.dirty == 'dirty'){
				    	dirty.push(cursor.value); //push the vote record into the dirty array
				***REMOVED***
			      cursor.continue();
			    ***REMOVED***
			    else {
			    	
			    	//we are finished looping so it is time to send the dirty records to the server
		     		offlineFactory.postUsers(dirty).success(function (data) {
		     			////////////////////////////////
				        //
				        //		GET CLEAN INFO
				        //
				        /////////////////////////////////
				        //now that we have updated the server data let's update the browser data
				        

				        ///////////////////////////////////////////
				        //	ADD ALL USER DATA TO BROWSER DB
				        ///////////////////////////////////////////
				        offlineFactory.getUsers().success(function(data){
				        	var userCleanTransaction = db.transaction(["user"], "readwrite");
	        				var userCleanStore = userCleanTransaction.objectStore("user");
	        				//delete the existing info so we are nice and clean
				        	$rootScope.userRequest = userCleanStore.clear();
				        	//loop through the data returned by the server
				        	for(i=0;i<data.length;i++){
								//add the record to the browser db
								data[i].id = data[i].id*1;//make sure that the id is set as an integer

								$rootScope.userCleanRequest = userCleanStore.put(data[i],data[i].id);

						***REMOVED***
				        ***REMOVED***).error(function(error){
				        	$log.error('There was an error downloading the user data.');
				        	$log.error(error);
				        ***REMOVED***);
				    ***REMOVED***);
			***REMOVED***
		***REMOVED***
	***REMOVED***;
  ***REMOVED***
***REMOVED***]);