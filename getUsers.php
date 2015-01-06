<?php

function sql($query){
	$host='localhost';
	$user='root';
	$password='';
	$dbname='offline_users';
	$cxn = mysql_connect($host, $user, $password, $dbname);
	if(!$cxn){
		die("Could not connect");
	}
	$link=mysql_select_db($dbname);
	$result=mysql_query($query);
	if (!$result) {
	    $message  = 'Invalid query: ' . mysql_error() . "\n";
	    $message .= 'Whole query: ' . $query;
	    die($message);
	}
		return $result;
}

$q = "SELECT * FROM user";
$r = sql($q);
$users = array();
while($t = mysql_fetch_assoc($r)){
	$users[]=$t;
}
return json_encode($users);
?>