<?php

function check_login($con, $redirect = true)
{
    if (isset($_SESSION['user_id'])) {
        $id = $_SESSION['user_id'];
        $query = "select * from users where user_id = '$id' limit 1";
        $result = mysqli_query($con, $query);
        if ($result && mysqli_num_rows($result) > 0) {
            $user_data = mysqli_fetch_assoc($result);
            return $user_data;
        }
    }

	// Store the current page URL before redirecting
	$_SESSION['return_to'] = $_SERVER['REQUEST_URI'];

    // If $redirect is true, redirect to login, otherwise return null
    if ($redirect) {
        header("Location: login.php");
        die;
    } else {
        return null;
    }
}


function random_num($length)
{

	$text = "";
	if($length < 5)
	{
		$length = 5;
	}

	$len = rand(4,$length);

	for ($i=0; $i < $len; $i++) { 
		# code...

		$text .= rand(0,9);
	}

	return $text;
}