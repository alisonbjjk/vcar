<?php
header('Content-Type: text/html; charset=utf-8');

use PHPMailer\PHPMailer\PHPMailer;

require_once("../phpmailer/phpmailer.php");
require_once("../phpmailer/smtp.php");
require_once("../phpmailer/exception.php");
require_once("../phpmailer/credenciais.php");
require_once("./function.php");

$nome = filter_input(INPUT_POST, 'nome');
$email = filter_input(INPUT_POST, 'email');
$telefone = filter_input(INPUT_POST, 'telefone');
$atividades = filter_input(INPUT_POST, 'atividades');
$motivo = filter_input(INPUT_POST, 'motivo');
$tipoMapa = filter_input(INPUT_POST, 'tipoMapa');
date_default_timezone_set('America/Sao_Paulo');
$data = date('d/m/Y H:i:s');

$validaCaptcha = false;
if (isset($_POST['g-recaptcha-response'])) {
    $getResponse = "https://www.google.com/recaptcha/api/siteverify?secret=6LcuEIQqAAAAAJGsQpKHKe8ZwJY1BGGB0CfhLeal&response={$_POST['g-recaptcha-response']}";
    $GoogleResponse = (file_get_contents($getResponse));
    $captcha = json_decode($GoogleResponse);
    if ($captcha->success == false) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Recaptcha não selecionado.']);
        die();
    }
}

$mail = new PHPMailer;
$mail->Host = 'smtp.hostinger.com';
$mail->isSMTP();
$mail->Port = 465;
$mail->SMTPSecure = 'ssl';
$mail->SMTPAuth = true;
$mail->SMTPDebug = 0;
$mail->Username = 'contato@condicoesambientais.com.br';
$mail->Password = '';
$mail->setFrom('contato@condicoesambientais.com.br', 'contato');
$mail->addReplyTo($email, 'contato');

if (isset($_FILES['file']) && $_FILES['file']['error'] == UPLOAD_ERR_OK) {
    $mail->addAttachment($_FILES['file']['tmp_name'], $_FILES['file']['name']);
}

$mail->addAddress('condicoesambientais@gmail.com');

$mail->CharSet = 'UTF-8';
$mail->isHTML(true);
$mail->Subject = "Nova Entrada de Formulário {$data}";
$mail->Body = "
<h2>Dados do novo Contato</h2></br>
<h3>Nome: <strong>{$nome}</strong></h3></br>
<h3>Email: <strong>{$email}</strong></h3></br>
<h3>Telefone: <strong>{$telefone}</strong></h3></br>
<h3>Atividades: <strong>{$atividades}</strong></h3></br>
<h3>Motivo: <strong>{$motivo}</strong></h3></br>
<h3>Tipo Mapa: <strong>{$tipoMapa}</strong></h3></br>
";

$enviar = enviarEmail($email, $data);

if (!$mail->send()) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro inesperado! cod.1', 'log' => $mail->ErrorInfo]);
} else if (!$enviar) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro inesperado! cod.2', 'log' => $email->ErrorInfo]);
} else {
    echo json_encode(['sucesso' => true, 'mensagem' => 'Enviado com sucesso!', 'log' => 'Email enviado com sucesso.']);
}