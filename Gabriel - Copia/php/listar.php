<?php
require_once "conexao.php";

$sql = "SELECT * FROM jogos ORDER BY id DESC";
$res = $conn->query($sql);

$jogos = [];
while ($row = $res->fetch_assoc()) {
    $jogos[] = $row;
}

echo json_encode($jogos);
?>
