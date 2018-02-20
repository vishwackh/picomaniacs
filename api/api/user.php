<?php



 $app->get('/', function ($request, $response, $args) {

    $db = new DbHandler();
    $date1 =  date('Y-m-d H:i:s', time());
    echo $date1;
    $userid = '123';
    $item_id = 1;
    $quantity = 5;
    $days    = 3;
    $orderid = 'ord';   
    $query = "insert into subscribe_details (user_id,item_id,quantity,days,orderid,date) values (".$userid.",'".$item_id."','".$quantity."','".$days."','".$orderid."','".$date1."')";
    $dbresult = $db->insert($query);
    echo json_encode($dbresult);

 });

$app->post('/login', function ($request, $response, $args) {
    $result =  new stdClass();
    $param =  $request->getParsedBody();
    $userName = $param['userName'];
    $password = $param['password'];
    $db = new DbHandler();
    $query = "select count(id) as count,token,id,firstName,email,active from login where userName ='".$userName."' and password ='".$password."'" ;
    $dbresult  = $db->getOneRecord($query);
    $user = $dbresult['firstName'];
    $email = $dbresult['email'];

    $active = $dbresult['active']; 
    if( $dbresult['count']  == 1 ){
      $token = openssl_random_pseudo_bytes(16);
      $token = bin2hex($token);
        $query = "update login set token='".$token."' where id=". $dbresult['id'];
        $dbresult = $db->insert($query);
        $result->status = true ;
        $result->token =  $token;
        $result->userName =  $user;
        $result->email = $email ;
        $result->active = $active ;
    }else {
         $result->status = false ;
    }
    echo json_encode($result);
});

$app->post('/register', function ($request, $response, $args) {
    $result =  new stdClass();
    $param =  $request->getParsedBody();
    $userName = $param['userName'];
    $password = $param['password'];
    $location = $param['location'];
    $pinCode = $param['pinCode'];
    $firstName = $param['firstName'];
    $lastName = $param['lastName'];
    $address1 = $param['address1'];
    $address2 = $param['address2'];
    $landMark = $param['landMark'];
    $city = $param['city'];
    $state = $param['state'];
    $email = $param['email'];
    $mobile = $param['mobile'];
    $date = date('Y-m-d H:i:s', time());
    $token = openssl_random_pseudo_bytes(16);
    $token = bin2hex($token);
    $db = new DbHandler();
    $email_Verfication_no = mt_rand(1000, 9999);

    date_default_timezone_set('Asia/Kolkata');
    $timezone = date_default_timezone_get();
    $date1 = date('Y-m-d H:i:s', time());

    $query = "insert into login (userName,password,firstName,lastName,email,phone,token,createdDate,updatedDate,verificationcode) values ('".$userName."','".$password."','".$firstName."','".$lastName."','".$email."','".$mobile."','".$token."','".$date1."','".$date1."','".$email_Verfication_no."')"; 
    //echo $query; 
    $dbresult = $db->insert($query);

    $db_id = $dbresult ;
    // echo json_encode($dbresult);
    if($dbresult !== 0){
        $query = "insert into user_deatils (userId,location,pincode,address,address2,city,ladmark,state,updated_date) values ('".$dbresult."','".$location."','".$pinCode."','".$address1."','".$address2."','".$city."','".$landMark."','".$state."','".$date1."' )";
        $dbresult = $db->insert($query);
        // echo json_encode($query);
        if($dbresult === 'NULL' ){
            $result->status = false ;
        }else{
            $template = file_get_contents("mail_templates/registration.html");
            $variables['name'] = $firstName;
            $variables['otp'] = $email_Verfication_no;
            foreach($variables as $key => $value) {
                $template = str_replace('{{'.$key.'}}', $value, $template);
            }
            $to  =  $email;
            $subject ="email Verification";
            $db = new DbHandler();
            $query = "select * from system_details order by id desc";
            $dbresult1 = $db->getOneRecord($query);
            $orderEmail =  $dbresult1["email_id"] ;
            $mail_status = sent_mail($to,$subject,$template,$orderEmail);
            $loginID = 'syed@freshjoy.in';
            $passwordOtp =  "joy123"; 
            $mobileOtp =  $mobile ;
            $senderid = "FRSHJY" ;
            $route_id = 2;

            $smsText = urlencode('Thank you for registering with FRESHJOY ' . "\r\n"
                    . (string)$email_Verfication_no. "\r\n"
                    . 'is the onetime password (OTP) for validation');

        
            $url = "http://198.15.98.50/API/pushsms.aspx?loginID=syed@freshjoy.in&password=joy123&mobile=".$mobileOtp."&text=".$smsText."&senderid=FRSHJY&route_id=1&Unicode=0";
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_exec($ch);
            curl_close($ch);


           //if($mail_status){
                $result->status = true ;
                $result->data = $db_id ;
                // $result->sms = $output;

            // }else {
            //      $result->status = false ;
            //      $result->message = "Email Verification Faild" ;
            // }
        }
    }else {
         $result->status = false ;
         $result->message = "Username or Email-id Already Exists, Please Change The Username " ;
    }
     echo json_encode($result);
});





$app->get('/getproducts', function ($request, $response, $args) {
    $result =  new stdClass();
    $db = new DbHandler();
    $query = "select * from product_details order by id desc";
    $dbresult = $db->getRecords($query);
    $result->status = true ;
    $result->data = $dbresult ;
    echo json_encode($result);
});

$app->get('/getsysinfo', function ($request, $response, $args) {
    $result =  new stdClass();
    $db = new DbHandler();
    $query = "select * from system_details order by id desc";
    $dbresult = $db->getOneRecord($query);
    $result->status = true ;
    $result->data = $dbresult ;
    echo json_encode($result);

});

$app->get('/getlocation', function ($request, $response, $args) {
    $result =  new stdClass();
    $db = new DbHandler();
    $query = "select * from location ORDER BY pindocde,name ASC";
    $dbresult = $db->getRecords($query);
    $result->status = true ;
    $result->data = $dbresult ;
    echo json_encode($result);

});


// $app->post('/fileUpload', function ($request, $response, $args) {

//      $files = $request->getUploadedFiles();
//     if (empty($files['file'])) {
//         throw new Exception('Expected a newfile');
//     }else {
//         $target_dir = "upload/";
//         $newfile = $files['file'];
//         $newfile->moveTo($target_dir.$_FILES['file']['name']);
//     }
// });


  $app->post('/getProfile', function ($request, $response, $args) {
    $result =  new stdClass();
    $param =  $request->getParsedBody();
    $userid = json_encode(getUserId());
    if($userid == 'false'){
        $result->status = false ;
        echo json_encode($result); 
        exit();
    }else {
        $db = new DbHandler();
        $query = "select ln.userName,ln.firstName,ln.lastName,ln.phone,ln.email,ud.address,ud.address2,ud.city,ud.ladmark,ud.location,ud.pincode,ud.state   from login as ln LEFT JOIN user_deatils as ud on ud.userId = ln.id where ln.id =".$userid;
        $dbresult = $db->getOneRecord($query);
        $result->status = true ;
        $result->data = $dbresult;
        echo json_encode($result); 
        exit();
    }
  });


  
  $app->post('/updateProfile', function ($request, $response, $args) {
    $result =  new stdClass();
    $param =  $request->getParsedBody();
    $userName = $param['userName'];
    $location = $param['location'];
    $pinCode = $param['pincode'];
    $firstName = $param['firstName'];
    $lastName = $param['lastName'];
    $address1 = $param['address'];
    $address2 = $param['address2'];
    $landMark = $param['ladmark'];
    $city = $param['city'];
    $state = $param['state'];
    $email = $param['email'];
    $mobile = $param['phone'];
    $userid = json_encode(getUserId());
    $date1 =  date('Y-m-d H:i:s', time());

  

     if($userid == 'false'){
        $result->status = false ;
        echo json_encode($result); 
        exit();
    }else {
        $db = new DbHandler();
        $query = "update login set firstName ='".$firstName."' , lastName = '".$lastName."' , phone ='".$mobile."' , updatedDate = '".$date1."' where id = ".$userid; 
    
        $dbresult = $db->insert($query);
        $query = "update user_deatils set address ='". $address1 ."' , address2 = '". $address2 ."', pincode = '". $pinCode ."', location ='". $location ."' , city ='". $city ."', ladmark = '".$landMark."' , state ='" . $state ."' , updated_date = '".$date1."' where userId = ". $userid; 
        $dbresult = $db->insert($query);
            // echo $query; 
        $result->status = true ;
        echo json_encode($result);
    }


  });



  $app->post('/verify', function ($request, $response, $args) {
    $result =  new stdClass();
    $param =  $request->getParsedBody();
    $userid = json_encode(getUserId());
    $otp = $param['otp'];

     $db = new DbHandler();
     $query = "select id from login where id =".$userid." and verificationcode ='". $otp ."'";
     //echo $query;
     $dbresult = $db->getOneRecord($query);
     if($dbresult !== null){
        $query = "update login set active= 1 where id=". $dbresult['id'];
        $dbresult = $db->insert($query);
        $result->status = true;
     }else{
         $result->status = false;
         $result->message = "please check the otp";
     }
     echo json_encode($result);
  });


  
  $app->post('/changePasswod', function ($request, $response, $args) {
     $result =  new stdClass();
     $param =  $request->getParsedBody();
     $oldpassword = $param['oldpassword'];
     $newpassword = $param['newpassword'];
     $userid = json_encode(getUserId());

    if($userid == 'false'){
        $result->status = false ;
        echo json_encode($result); 
        exit();
    }else {
         $db = new DbHandler();
        $query = "select id from login where id=".$userid." and password ='".$oldpassword."'";
        $dbresult = $db->getRecords($query);
        if($dbresult === 'NULL')
        {
            $result->status = true ;
            $result->message = "Please check the password";
        }else{
            $query = "update login set password = '".$newpassword."' where id=". $userid;
            $dbresult = $db->insert($query);
            $result->status = true ;
        }        
        echo json_encode($result); 
    }
  });



  
  $app->post('/forgotpassword', function ($request, $response, $args) {
        $result =  new stdClass();
        $param =  $request->getParsedBody();
        $mail = $param['mail'];

        $db = new DbHandler();
        $query = "select id,userName from login where email ='".$mail."'";
        $dbresult = $db->getOneRecord($query);
        // echo json_encode( $dbresult);
        if($dbresult  != "NULL"){
            $newpass = mt_rand(100000, 999999);
            $query = "update login set password = '".$newpass."' where id=". $dbresult["id"];
            $dbresult = $db->insert($query);

            $template = file_get_contents("mail_templates/password-reset.html");
            $variables['name'] = $dbresult["userName"];
            $variables['password_reset'] = $newpass;
            foreach($variables as $key => $value) {
                $template = str_replace('{{'.$key.'}}', $value, $template);
            }
            $to  =  $mail;
            $subject ="Password Reset";


             $db = new DbHandler();
            $query = "select * from system_details order by id desc";
            $dbresult1 = $db->getOneRecord($query);
            $orderEmail =  $dbresult1["email_id"] ;


            $mail_status = sent_mail($to,$subject,$template,$orderEmail);
            if($mail_status){
                    $result->status = true ;
                    $result->message = "please check your email id" ;
                }else {
                    $result->status = false ;
                    $result->message = "PLease try later" ;
                }
        }else{
            $result->status = false ;
            $result->message = "email not received with FRESHJOY" ;

        }
        echo json_encode($result);

  });


  $app->post('/verifyOtp', function ($request, $response, $args) {
    $result =  new stdClass();
    $param =  $request->getParsedBody();
    $userid = $param['userid'];
    $otp = $param['otp'];

     $db = new DbHandler();
     $query = "select id,userName,email,subscribe,active,token from login where id =".$userid." and verificationcode ='". $otp ."'";

     $dbresult1 = $db->getOneRecord($query);
     if($dbresult1 !== null){
        
        $token = openssl_random_pseudo_bytes(16);
        $token1 = bin2hex($token);

        $query = "update login set active= 1  where id=". $dbresult1['id'];
        $dbresult = $db->insert($query);
        $result->status = true;

        $result->token =  $dbresult1['token'];
        $result->userName = $dbresult1['userName'];
        $result->email = $dbresult1['email'] ;
        $result->active = $dbresult1['active'] ;
        $result->subscribe = $dbresult1['subscribe'] ;

     }else{
         $result->status = false;
         $result->message = "please check the otp";
     }
     echo json_encode($result);
  });
