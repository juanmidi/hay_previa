<?php
 	require_once("Rest.inc.php");
	require_once("connection.php");
	include "instaClass.php";

	class API extends REST {
	
		public $data = "";
		
		// const DB_SERVER = "127.0.0.1";
		// const DB_USER = "root";
		// const DB_PASSWORD = "";
		// // const DB = "escuela1_gimnasio";
		// const DB = "popo";

		// const DB_SERVER = "127.0.0.1";
		// const DB_USER = "escuela1";
		// const DB_PASSWORD = "eXYumn4693";
		// const DB = "escuela1_gimnasio";
		// const DB = "escuela1_desarrollo";

		private $db = NULL;
		private $mysqli = NULL;
		public function __construct(){
			parent::__construct();				// Init parent contructor
			$this->dbConnect();					// Initiate Database connection
		}
		
		/*
		 *  Connect to Database
		*/
		private function dbConnect(){
			$this->mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB);
		}
		
		/*
		 * Dynmically call the method based on the query string
		 */
		public function processApi(){
			$func = strtolower(trim(str_replace("/","",$_REQUEST['x'])));
			if((int)method_exists($this,$func) > 0)
				$this->$func();
			else
				$this->response('',404); // If the method not exist with in this class "Page not found".
		}
				
		private function login(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			$tmp = json_decode(file_get_contents("php://input"),true);
			$user = $tmp['user'];
			$pass = $tmp['pass'];

			if(!empty($user) and !empty($pass)){
					//$query="SELECT uid, name, email FROM users WHERE email = '$email' AND password = '".md5($password)."' LIMIT 1";
					
					$query="SELECT * FROM usuarios WHERE user = '$user' AND pass = '$pass' LIMIT 1";
					$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
					$result = array();
					if($r->num_rows > 0) {
						//$result = $r->fetch_assoc();
						$result = array_map('utf8_encode', $r->fetch_assoc());	

						// If success everythig is good send header as "OK" and user details
						$this->response($this->json($result), 200);
					}
					$this->response('', 204);	// If no records "No Content" status
			}
			
			$error = array('status' => "Failed", "msg" => "Usuarios o contraseña no válida");
			$this->response($this->json($error), 400);
		}
		

		private function login_instagram(){
			$obj_insta = new instaClass();
			$obj_insta->authInstagram();
		}
		
		/*
		 *	Encode array into JSON
		*/
		private function json($data){
			if(is_array($data)){
				return json_encode($data, JSON_UNESCAPED_UNICODE);
			}
		}

		private function utf8_converter($array)
		{
		    array_walk_recursive($array, function(&$item, $key){
		        if(!mb_detect_encoding($item, 'utf-8', true)){
		                $item = utf8_encode($item);
		        }
		    });
		 
		    return $array;
		}

	}
	
	// Initiiate Library
	
	$api = new API;
	$api->processApi();
?>