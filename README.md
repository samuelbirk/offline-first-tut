offline-first-tut
=================

An example of how to build an offline first web application using Appcache, IndexedDB, and AngularJS.

Getting started:

git clone git@github.com:samuelbirk/offline-first-tut.git

create a new file in the directory called include.php

copy and paste the following code changing the variables where appropriate

<code>
	<?php
	function sql($query){
		$host='localhost';
		$user='root';
		$password='';
		$dbname='offline_user';
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
</code>

Create a new database called offline user and run the following sql

<code>

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

SET FOREIGN_KEY_CHECKS = 1;

</code>
