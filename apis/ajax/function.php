<?php

use PHPMailer\PHPMailer\PHPMailer;

require_once("../phpmailer/phpmailer.php");
require_once("../phpmailer/smtp.php");
require_once("../phpmailer/exception.php");
require_once("../phpmailer/credenciais.php");

function enviarEmail($email, $html = "")
{
    $mail = new PHPMailer;
    $mail->Host = 'smtp.hostinger.com';
    $mail->isSMTP();
    $mail->Port = 465;
    $mail->SMTPSecure = 'ssl';
    $mail->SMTPAuth = true;
    $mail->SMTPDebug = 0;
    $mail->Username = 'contato@4four.tech';
    $mail->Password = '';
    $mail->setFrom('contato@4four.tech', 'EQUIPE VCAR');
    $mail->addReplyTo('contato@4four.tech', 'contato');
    $mail->addAddress($email);

    $mail->isHTML(true);
    $mail->Subject = 'EQUIPE VCAR';
    $mail->Body = "
    <h3>Recebemos sua solicitação, aguarde um prazo de até 24h para entrarmos em contato.</h3></br> 
    <h3>Atenciosamente, EQUIPE VCAR!</h3>
    ";

    return $mail->send();

}