<?php

ini_set("log_errors", 1);
error_reporting(E_ALL);

function getValues () {

	$dbhost = 'localhost';
	$dbuser = 'getlos1q_website';
	$dbpass = 'Peis1uBTzI5;';
	$db = 'getlos1q_website'; 
	$conn = mysql_connect($dbhost, $dbuser, $dbpass);
	if (!$conn) {
		return false;
	}
	$sql = 'SELECT * FROM aex';

	mysql_select_db($db);
	$result = mysql_query($sql, $conn);

	$ret = [];

	while ($row = mysql_fetch_array($result)) {
		$ret[$row["date"]] = floatval($row["value"]);
	}
	return $ret;
}

$string = file_get_contents("../data/aex.json");

$json = json_decode($string, true);

$count = count($json["aex"]);

$values = getValues();
var_dump($values);

for ($i = 0; $i < $count; $i++) {
	if (array_key_exists($json["aex"][$i]["date"], $values)) {
		$json["aex"][$i]["value"] = $values[$json["aex"][$i]["date"]];
	}
}

var_dump($json);

file_put_contents("../dev/V2/data/aex_generated.json", json_encode($json, JSON_PRETTY_PRINT));
file_put_contents("../data/aex_generated.json", json_encode($json, JSON_PRETTY_PRINT));
