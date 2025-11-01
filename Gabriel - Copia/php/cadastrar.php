<?php
require_once "conexao.php";

$data = json_decode(file_get_contents("php://input"), true);

$titulo = $data['titulo'] ?? '';
$genero = $data['genero'] ?? '';
$plataforma = $data['plataforma'] ?? '';
$descricao = $data['descricao'] ?? '';

if ($titulo && $genero && $plataforma) {
    $stmt = $conn->prepare("INSERT INTO jogos (titulo, genero, plataforma, descricao) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $titulo, $genero, $plataforma, $descricao);
    if ($stmt->execute()) {
        echo json_encode(["status" => "ok"]);
    } else {
        echo json_encode(["status" => "erro", "msg" => $stmt->error]);
    }
    $stmt->close();
} else {
    echo json_encode(["status" => "erro", "msg" => "Campos obrigatórios"]);
}
?>
