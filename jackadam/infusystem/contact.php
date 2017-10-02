<?php

// Parse the params
$contact_first_name         = urldecode($_POST['contact_first_name']);
$contact_last_name          = urldecode($_POST['contact_last_name']);
$contact_email              = urldecode($_POST['contact_email']);
$contact_phone_number       = urldecode($_POST['contact_phone_number']);
$contact_phone_extension    = urldecode($_POST['contact_phone_extension']);
$contact_address            = urldecode($_POST['contact_address']);
$contact_best_time_to_call  = urldecode($_POST['contact_best_time_to_call']);
$contact_pump_source        = urldecode($_POST['contact_pump_source']);
$contact_comments           = urldecode($_POST['contact_comments']);
$contact_buyback_program    = urldecode($_POST['contact_buyback_program']);


// Build the email
// $to = 'jack@jackadam.net';
$to = 'infusionmadeeasy@infusystem.com';
$to_arte = 'arte@id29.com';
$headers = "From: contact@infusystem.com\r\nReply-To: $contact_email";

$subject = 'InfuSystem Contact Form';
$message = "The following was submitted via the InfuSystem Contact Form:\n\n";
$message .= "First Name: $contact_first_name \n";
$message .= "Last Name: $contact_last_name \n\n";
$message .= "Email Address: $contact_email \n\n";
$message .= "Phone Number: $contact_phone_number \n";
$message .= "Extension: $contact_phone_extension \n\n";
$message .= "Facility/Practice Name & Address: \n$contact_address \n\n";
$message .= "Best Time To Call: $contact_best_time_to_call \n\n";
$message .= "Pump Source: $contact_pump_source \n\n";
$message .= "Comments: \n$contact_comments \n\n";
$message .= "$contact_buyback_program \n";


// Send the email
// $mail_sent = true; 
$mail_sent = @mail($to, $subject, $message, $headers);
$mail_sent_to_arte = @mail($to_arte, $subject, $message, $headers);

$mail_sent = $mail_sent ? 'true' : 'false';
echo "<script>parent.Contact.sent($mail_sent)</script>";

?>