***REMOVED***

***REMOVED***
	$host='localhost';
	$user='root';
***REMOVED***
	$dbname='offline_users';
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***

$user = json_decode(file_get_contents("php://input"));
print_r($user);
if(isset($user->id) && is_int($user->id*1)){
	$r = sql("SELECT * FROM user WHERE id = ".$user->id);
	if(mysql_num_rows($r)>0){
		sql("UPDATE  user  SET name = '".$user->name."' WHERE id = ".$user->id);
		echo $user->id;
***REMOVED***
	else{
		sql("INSERT INTO  user  (name) VALUES('".$user->name."')");
		echo mysql_insert_id();
***REMOVED***
***REMOVED***
else{
	sql("INSERT INTO  user  (name) VALUES('".$user->name."')");
	echo mysql_insert_id();
***REMOVED***

***REMOVED***