<?php
header('Content-Type: text/html; charset=utf-8');

use PHPMailer\PHPMailer\PHPMailer;

require_once("../phpmailer/phpmailer.php");
require_once("../phpmailer/smtp.php");
require_once("../phpmailer/exception.php");
require_once("../phpmailer/credenciais.php");


function enviarEmail($email, $data, $html = "")
{

    $mail = new PHPMailer;
    $mail->Host = 'smtp.hostinger.com';
    $mail->isSMTP();
    $mail->Port = 465;
    $mail->SMTPSecure = 'ssl';
    $mail->SMTPAuth = true;
    $mail->SMTPDebug = 0;
    $mail->Username = 'contato@4four.tech';
    $mail->Password = 'SEDzz!SUYAE+h5*';
    $mail->setFrom('contato@4four.tech', 'CONDIÇÕES AMBIENTAIS');
    $mail->addReplyTo('condicoesambientais@gmail.com', 'CONDIÇÕES AMBIENTAIS');
    $mail->addAddress($email);

    $mail->CharSet = 'UTF-8';
    $mail->isHTML(true);
    $mail->Subject = "CONDIÇÕES AMBIENTAIS {$data}";

    $body = file_get_contents("./mail.html");
    $mail->Body = $body;

    return $mail->send();

}