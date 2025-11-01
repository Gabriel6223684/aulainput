<?php
require_once "conexao.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? 0;
$titulo = $data['titulo'] ?? '';
$genero = $data['genero'] ?? '';
$plataforma = $data['plataforma'] ?? '';
$descricao = $data['descricao'] ?? '';

if ($id && $titulo && $genero && $plataforma) {
    $stmt = $conn->prepare("UPDATE jogos SET titulo=?, genero=?, plataforma=?, descricao=? WHERE id=?");
    $stmt->bind_param("ssssi", $titulo, $genero, $plataforma, $descricao, $id);
    if ($stmt->execute()) {
        echo json_encode(["status" => "ok"]);
    } else {
        echo json_encode(["status" => "erro", "msg" => $stmt->error]);
    }
    $stmt->close();
} else {
    echo json_encode(["status" => "erro", "msg" => "Dados inválidos"]);
}
?>
