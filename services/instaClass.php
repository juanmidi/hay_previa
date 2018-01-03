<?php

include "insta_constant.php";

class instaClass{

  public $token_array;
  
  // Authentication
  public function authInstagram(){

    $url = "https://api.instagram.com/oauth/authorize/?client_id="._INSTAGRAM_CLIENT_ID."&redirect_uri="._INSTAGRAM_REDIRECT_URL."&response_type=code";
    header('location: '.$url);

  }
  
  // Set Access Token
  public function setAccess_token($code){

    $this->token_array = array("client_id"=>_INSTAGRAM_CLIENT_ID,
        "client_secret"=>_INSTAGRAM_CLIENT_SECRET,
        "grant_type"=>authorization_code,
        "redirect_uri"=>_INSTAGRAM_REDIRECT_URL,
        "code"=>$code);
  }
  
  // Get user details
  public function getUserDetails(){

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL,"https://api.instagram.com/oauth/access_token");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $this->token_array );
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $result = curl_exec ($ch);

    curl_close ($ch);

    return json_decode($result);

  }

}