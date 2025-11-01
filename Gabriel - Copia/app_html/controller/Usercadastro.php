<?php

namespace app\controller;

class Usercadastro extends Base
{
    public function cadastro($request, $response)
    {
        $dadosTemplate = [
            'titulo' => 'Cadastro de usuário'
        ];
        return $this->getTwig()
            ->render($response, $this->setView('usuario/cadastro'), $dadosTemplate)
            ->withHeader('Content-Type', 'text/html')
            ->withStatus(200);
    }
}
