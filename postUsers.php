<?php

function sql($query){
	$host='localhost';
	$user='root';
	$password='';
	$dbname='offline';
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

$users = json_decode(file_get_contents("php://input"));
foreach($users as $user){
	if(isset($user->id)){
		$r = sql("SELECT * FROM user WHERE id = ".$user->id);
		if(mysql_num_rows($r)>0){
			sql("UPDATE user SET name = '".$user->name."' WHERE id = ".$user->id);
		}
		else{
			sql("INSERT INTO user (name) VALUES('".$user->name."')");
		}
	}
	else{
		sql("INSERT INTO user (name) VALUES('".$user->name."')");
	}
}
?>