<?php

use PHPMailer\PHPMailer\PHPMailer;

require_once("../phpmailer/phpmailer.php");
require_once("../phpmailer/smtp.php");
require_once("../phpmailer/exception.php");
require_once("../phpmailer/credenciais.php");
require_once("./function.php");

$nome = filter_input(INPUT_POST, 'nome');
$email = filter_input(INPUT_POST, 'email');
$cpf = filter_input(INPUT_POST, 'cpf');
$telefone = filter_input(INPUT_POST, 'telefone');
$cep = filter_input(INPUT_POST, 'cep');
$uf = filter_input(INPUT_POST, 'uf');
$cidade = filter_input(INPUT_POST, 'cidade');
$rua = filter_input(INPUT_POST, 'rua');
$bairro = filter_input(INPUT_POST, 'bairro');
$numero = filter_input(INPUT_POST, 'numero');
$complemento = filter_input(INPUT_POST, 'complemento');
$motivo = filter_input(INPUT_POST, 'motivo');

$mail = new PHPMailer;
$mail->Host = 'smtp.hostinger.com';
$mail->isSMTP();
$mail->Port = 465;
$mail->SMTPSecure = 'ssl';
$mail->SMTPAuth = true;
$mail->SMTPDebug = 0;
$mail->Username = 'contato@4four.tech';
$mail->Password = '';
$mail->setFrom('contato@4four.tech', 'VCAR');
$mail->addReplyTo($email, 'contato');

if (isset($_FILES['file']) && $_FILES['file']['error'] == UPLOAD_ERR_OK) {
    $mail->addAttachment($_FILES['file']['tmp_name'], $_FILES['file']['name']);
}

$mail->addAddress('alisonbjjk@gmail.com');

$mail->isHTML(true);
$mail->Subject = 'Novo Contato';
$mail->Body = "
<h2>Dados do novo Contato</h2></br>
<h3>Nome: <strong>{$nome}</strong></h3></br>
<h3>CPF: <strong>{$cpf}</strong></h3></br>
<h3>email: <strong>{$email}</strong></h3></br>
<h3>Telefone: <strong>{$telefone}</strong></h3></br>
<h3>Cep: <strong>{$cep}</strong></h3></br>
<h3>Cidade/UF: <strong>{$cidade}/{$uf}</strong></h3></br>
<h3>Rua - Bairro - N&uacute;mero: <strong>{$rua} - {$bairro} - {$numero}</strong></h3></br>
<h3>Complemento: <strong>{$complemento}</strong></h3></br>
<h3>Motivo: <strong>{$motivo}</strong></h3></br>
";

$enviar = enviarEmail($email);

if (!$mail->send()) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro inesperado! cod.1', 'log' => $mail->ErrorInfo]);
} else if (!$enviar) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro inesperado! cod.1', 'log' => $email->ErrorInfo]);
} else {
    echo json_encode(['sucesso' => true, 'mensagem' => 'Enviado com sucesso!', 'log' => 'Email enviado com sucesso.']);
}