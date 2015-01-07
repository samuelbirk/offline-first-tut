***REMOVED***

include_once('include.php');

$users = json_decode(file_get_contents("php://input"));
foreach($users as $user){
	if(isset($user->id)){
		$r = sql("SELECT * FROM user WHERE id = ".$user->id);
		if(mysql_num_rows($r)>0){
			sql("UPDATE user SET name = '".$user->name."' WHERE id = ".$user->id);
	***REMOVED***
		else{
			sql("INSERT INTO user (name) VALUES('".$user->name."')");
	***REMOVED***
***REMOVED***
	else{
		sql("INSERT INTO user (name) VALUES('".$user->name."')");
***REMOVED***
***REMOVED***
***REMOVED***