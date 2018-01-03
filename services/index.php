
<?php
include "instaClass.php";

$obj_insta = new instaClass();

if(isset($_POST['instagram_login'])){

  $obj_insta->authInstagram();

}
?>

<!doctype html>
<html>
  <body>
    <form method='post' action=''>
       <input type='submit' value='Login with Instagram' name='instagram_login'>
    </form>
  </body>
</html>
