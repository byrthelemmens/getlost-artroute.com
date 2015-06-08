#!/usr/bin/php
<?php

// check if weekend day
// @LINK: http://stackoverflow.com/questions/4802335/checking-if-date-is-weekend-php
if (date('N', strtotime("now")) >= 6) {
	echo 'weekend!';
	exit;
}

$url = "http://finance.yahoo.com/q?s=%5EAEX"; 
$result = file_get_contents($url);

//$regex = '/class="yfnc_tabledata1">\d+\.\d+/';
$regex = '/Open:<\/th><td\sclass="yfnc_tabledata1">\d+\.\d+/';

$matches = [];
preg_match($regex, $result, $matches);

preg_match('/\d+\.\d+$/', $matches[0], $valueMatches);

$value = (float) $valueMatches[0];

echo $value . "\n\n";

// insert into mysql
// @LINK: http://www.tutorialspoint.com/php/mysql_insert_php.htm

$dbhost = 'localhost';
$dbuser = 'getlos1q_website';
$dbpass = 'Peis1uBTzI5;';
$db = 'getlos1q_website'; 
$conn = mysql_connect($dbhost, $dbuser, $dbpass);
if (!$conn) {
	die('Could not connect: ' . mysql_error());
}
$sql = 'INSERT INTO aex (value, date) VALUES (' . $value . ', NOW())';

mysql_select_db($db);
$retval = mysql_query($sql, $conn);
if (!$retval) {
	die('Could not enter data: ' . mysql_error());
}
echo "Entered data successfully\n";
mysql_close($conn);