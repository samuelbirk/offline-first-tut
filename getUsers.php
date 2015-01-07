<?php

include_once('include.php');

$q = "SELECT * FROM user";
$r = sql($q);
$users = array();
$i = 0;
while($t = mysql_fetch_assoc($r)){
	$users[$i]=$t;
	$users[$i]['dirty'] = 'clean';
	$i++;
}
echo json_encode($users);
?>