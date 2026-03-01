<?php
/* Add your Own Email Address At line # 3 */
$email_to = "info@domain.com";
$email_subject = "New Contact Form Submission";
$error_message = '';
/* Validation */
	if(empty($_POST['name'])){ /* Name */
		echo "Fields are not filled properly";
		die();
	}else if(empty($_POST['email'])){ /* Email */
		echo "Fields are not filled properly";
		die();
		}else if(empty($_POST['subject'])){ /* Subject */
		echo "Fields are not filled properly";
		die();
	}else if(empty($_POST['message'])){ /* Comment Message */
		echo "Fields are not filled properly";
		die();
	}else{     
	$name = $_POST['name']; /* Assign Name */
	$email = $_POST['email']; /* Assign Email */
	$email = $_POST['subject']; /* Assign Subject */
	$comments = $_POST['message']; /* Assign Comment */
	
	$email_message = '<html><body><head>';
	$email_message = '<title>Your Email Details Are Below</title>';
	$email_message = '</head>';
	$email_message .= '<h1>Your Details Are Below</h1>';
	$email_message .= '<table style="border-color: #ccc;" cellpadding="15">';
	/* Table Row Name */
	$email_message .= "<tr style='background: #eee;'><td><strong>Name:</strong> </td><td>" . strip_tags($_POST['name']) . "</td></tr>";
	/* Table Row Email */
	$email_message .= "<tr style='background: #fff;'><td><strong>Email:</strong> </td><td>" . strip_tags($_POST['email']) . "</td></tr>";
	/* Table Row Subject */
	$email_message .= "<tr style='background: #fff;'><td><strong>Subject:</strong> </td><td>" . strip_tags($_POST['subject']) . "</td></tr>";
	/* Table Row Comment */
	$email_message .= "<tr style='background: #eee;'><td><strong>Comment:</strong> </td><td>" . strip_tags($_POST['message']) . "</td></tr>";
	$email_message .= "</table>";
	$email_message .= "</body></html>";	
	
	
	/* Mail Headers */
	$headers = "From: " . $email . "\r\n";
	$headers .= "Reply-To: ". $email . "\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
	mail($email_to, $email_subject, $email_message, $headers); 
	}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Butcher's HTML 5 Responsive Templates</title>
    <!-- Css Files Start -->
    <link href="css/style.css" rel="stylesheet" type="text/css">
    <link href="css/bootstrap.css" rel="stylesheet" type="text/css">
    <!-- Css Files End -->
    <!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->
  </head>
  <body>
    <!--Wrapper Content Start-->
    <div id="wrapper">
      <!--Main Content Start-->
      <div class="thank-msg">
        <!-- Start of Thank -->
          <section class="container">
              <div class="error-page">
                <div class="holder">
                  <h2>Thank You
                  </h2>
                  <p>Thank you for your form submission, as soon as we get this we will get back to you shortly.
                  </p>
                </div>
              </div>
          </section>
        <!-- End of Thank --> 
      </div>
	</div>
    </body>
</html>
