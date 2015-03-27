<?php

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
		$ret[$row["date"]] = $row["value"];
	}
	return $ret;
}

$string = file_get_contents("./aex.json");
$json = json_decode($string, true);

$count = count($json["aex"]);

$values = getValues();

for ($i = 0; $i < $count; $i++) {
	if (array_key_exists($json["aex"][$i]["date"], $values)) {
		$json["aex"][$i]["value"] = $values[$json["aex"][$i]["date"]];
	}
}

header('Content-Type: application/json');
echo json_encode($json);
