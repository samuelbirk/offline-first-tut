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

$q = "SELECT * FROM user";
$r = sql($q);
$users = array();
while($t = mysql_fetch_assoc($r)){
	$users[]=$t;
***REMOVED***
echo json_encode($users);
***REMOVED***