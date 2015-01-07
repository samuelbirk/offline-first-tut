<?php
function sql($query){
	$host='';
	$user='';
	$password='';
	$dbname='';
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
?>