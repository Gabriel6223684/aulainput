<?php
require_once "conexao.php";

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? 0;

if ($id) {
    $stmt = $conn->prepare("DELETE FROM jogos WHERE id=?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        echo json_encode(["status" => "ok"]);
    } else {
        echo json_encode(["status" => "erro", "msg" => $stmt->error]);
    }
    $stmt->close();
} else {
    echo json_encode(["status" => "erro", "msg" => "ID inválido"]);
}
?>
