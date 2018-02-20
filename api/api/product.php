<?php
$app->post('/adminlogin', function ($request, $response, $args) {
$result =  new stdClass();
$param =  $request->getParsedBody();
$userName = $param['userName'];
$password = $param['password'];
$db = new DbHandler();
$query = "select count(id) as count,token,id from login where type= 1 and userName ='".$userName."' and password ='".$password."'" ;
$dbresult  = $db->getOneRecord($query);

$token = $dbresult['token'];
$id = $dbresult['id'];

if( $dbresult['count']  == 1 ){
    $token = openssl_random_pseudo_bytes(16);
    $token = bin2hex($token);

    $query = "update login set token='".$token."' where id=". $dbresult['id'];
    $dbresult = $db->insert($query);

    $result->status = true ;
    $result->token =  $token;
}else {
        $result->status = false ;
}

echo json_encode($result);
});

$app->post('/addImage', function ($request, $response, $args) {
        
        
    if(json_encode(getAdminUserId()) == "false" ){
    echo "no authentication";
    exit();
    }
    
    
    $result =  new stdClass();
    $files = $request->getUploadedFiles();
    
    $name = $_POST['name'];
     
    date_default_timezone_set('Asia/Kolkata');
    $timezone = date_default_timezone_get();
    $date1 = date('Y-m-d H:i:s', time());
    

    if (!empty($files['file'])) {  
        $image = $_FILES['file']['name'];
        $result =  new stdClass();
        $db = new DbHandler();
        
            $target_dir = "upload/";
            $newfile = $files['file'];
            $newfile->moveTo($target_dir.$_FILES['file']['name']);                
            $query = "insert into picoSlider (name,url) values ('".$name."','".$image."')";
            $db = new DbHandler();
            $dbresult = $db->insert($query);
            $result->status = true ;
   
}
    echo json_encode($result); 
});

$app->get('/homeImageList', function ($request, $response, $args) {

    $result =  new stdClass();
    $db = new DbHandler();
    $query = "select * from picoSlider order by id desc";
    $dbresult = $db->getRecords($query);
    $result->status = true ;
    $result->data = $dbresult ;
    echo json_encode($result);
}); 
$app->post('/deleteImage', function ($request, $response, $args) {
        
    if(json_encode(getAdminUserId()) == "false" ){
    echo "no authentication";
    exit();
}

$result =  new stdClass();
$param =  $request->getParsedBody();
$id = $param['id'];

$db = new DbHandler();
$query = "delete from picoSlider where id =". $id ; 
$dbresult = $db->insert($query);  
if($query){
    $filename=$param['url'];            
    unlink("upload/" .$filename);
}  
$result->status = true ;
echo json_encode($result);

});
$app->post('/addPreWeddingImage', function ($request, $response, $args) {


    if(json_encode(getAdminUserId()) == "false" ){
    echo "no authentication";
    exit();
    }
    
    
    $result =  new stdClass();
    $files = $request->getUploadedFiles();
    
    $name = $_POST['name'];
     
    date_default_timezone_set('Asia/Kolkata');
    $timezone = date_default_timezone_get();
    $date1 = date('Y-m-d H:i:s', time());
    
    
    if (!empty($files['file'])) {  
        $image = $_FILES['file']['name'];
        $result =  new stdClass();
        $db = new DbHandler();
        
            $target_dir = "upload/";
            $newfile = $files['file'];
            $newfile->moveTo($target_dir.$_FILES['file']['name']);                
            $query = "insert into picoPreWedding (name,url) values ('".$name."','".$image."')";
            $db = new DbHandler();
            $dbresult = $db->insert($query);
            $result->status = true ;
    
    }
    echo json_encode($result); 
    }); 
$app->get('/preWeddingList', function ($request, $response, $args) {

    $result =  new stdClass();
    $db = new DbHandler();
    $query = "select * from picoPreWedding order by id desc";
    $dbresult = $db->getRecords($query);
    $result->status = true ;
    $result->data = $dbresult ;
    echo json_encode($result);
});
$app->post('/deletepreWeddingImage', function ($request, $response, $args) {
        
    if(json_encode(getAdminUserId()) == "false" ){
    echo "no authentication";
    exit();
}

$result =  new stdClass();
$param =  $request->getParsedBody();
$id = $param['id'];

$db = new DbHandler();
$query = "delete from picoPreWedding where id =". $id ; 
$dbresult = $db->insert($query);  
if($query){
    $filename=$param['url'];            
    unlink("upload/" .$filename);
}  
$result->status = true ;
echo json_encode($result);

});

$app->post('/addWeddingImage', function ($request, $response, $args) {


    if(json_encode(getAdminUserId()) == "false" ){
    echo "no authentication";
    exit();
    }
    
    
    $result =  new stdClass();
    $files = $request->getUploadedFiles();
    
    $name = $_POST['name'];
     
    date_default_timezone_set('Asia/Kolkata');
    $timezone = date_default_timezone_get();
    $date1 = date('Y-m-d H:i:s', time());
    
    
    if (!empty($files['file'])) {  
        $image = $_FILES['file']['name'];
        $result =  new stdClass();
        $db = new DbHandler();
        
            $target_dir = "upload/";
            $newfile = $files['file'];
            $newfile->moveTo($target_dir.$_FILES['file']['name']);                
            $query = "insert into picoWedding (name,url) values ('".$name."','".$image."')";
            $db = new DbHandler();
            $dbresult = $db->insert($query);
            $result->status = true ;
    
    }
    echo json_encode($result); 
    }); 

$app->get('/weddingList', function ($request, $response, $args) {

    $result =  new stdClass();
    $db = new DbHandler();
    $query = "select * from picoWedding order by id desc";
    $dbresult = $db->getRecords($query);
    $result->status = true ;
    $result->data = $dbresult ;
    echo json_encode($result);
});

$app->post('/deleteweddingImage', function ($request, $response, $args) {
        
    if(json_encode(getAdminUserId()) == "false" ){
    echo "no authentication";
    exit();
}

$result =  new stdClass();
$param =  $request->getParsedBody();
$id = $param['id'];

$db = new DbHandler();
$query = "delete from picoWedding where id =". $id ; 
$dbresult = $db->insert($query);  
if($query){
    $filename=$param['url'];            
    unlink("upload/" .$filename);
}  
$result->status = true ;
echo json_encode($result);

});

$app->post('/addPostWeddingImage', function ($request, $response, $args) {


    if(json_encode(getAdminUserId()) == "false" ){
    echo "no authentication";
    exit();
    }
    
    
    $result =  new stdClass();
    $files = $request->getUploadedFiles();
    
    $name = $_POST['name'];
     
    date_default_timezone_set('Asia/Kolkata');
    $timezone = date_default_timezone_get();
    $date1 = date('Y-m-d H:i:s', time());
    
    
    if (!empty($files['file'])) {  
        $image = $_FILES['file']['name'];
        $result =  new stdClass();
        $db = new DbHandler();
        
            $target_dir = "upload/";
            $newfile = $files['file'];
            $newfile->moveTo($target_dir.$_FILES['file']['name']);                
            $query = "insert into picoPostWedding (name,url) values ('".$name."','".$image."')";
            $db = new DbHandler();
            $dbresult = $db->insert($query);
            $result->status = true ;
    
    }
    echo json_encode($result); 
    }); 

$app->get('/postWeddingList', function ($request, $response, $args) {

    $result =  new stdClass();
    $db = new DbHandler();
    $query = "select * from picoPostWedding order by id desc";
    $dbresult = $db->getRecords($query);
    $result->status = true ;
    $result->data = $dbresult ;
    echo json_encode($result);
});
$app->post('/deletepostWeddingImage', function ($request, $response, $args) {
        
    if(json_encode(getAdminUserId()) == "false" ){
    echo "no authentication";
    exit();
}

$result =  new stdClass();
$param =  $request->getParsedBody();
$id = $param['id'];

$db = new DbHandler();
$query = "delete from picoPostWedding where id =". $id ; 
$dbresult = $db->insert($query);  
if($query){
    $filename=$param['url'];            
    unlink("upload/" .$filename);
}  
$result->status = true ;
echo json_encode($result);

});
$app->post('/addBabyPhotoImage', function ($request, $response, $args) {


    if(json_encode(getAdminUserId()) == "false" ){
    echo "no authentication";
    exit();
    }
    
    
    $result =  new stdClass();
    $files = $request->getUploadedFiles();
    
    $name = $_POST['name'];
     
    date_default_timezone_set('Asia/Kolkata');
    $timezone = date_default_timezone_get();
    $date1 = date('Y-m-d H:i:s', time());
    
    
    if (!empty($files['file'])) {  
        $image = $_FILES['file']['name'];
        $result =  new stdClass();
        $db = new DbHandler();
        
            $target_dir = "upload/";
            $newfile = $files['file'];
            $newfile->moveTo($target_dir.$_FILES['file']['name']);                
            $query = "insert into picoBabyPhoto (name,url) values ('".$name."','".$image."')";
            $db = new DbHandler();
            $dbresult = $db->insert($query);
            $result->status = true ;
    
    }
    echo json_encode($result); 
    });

$app->get('/babyPhotoList', function ($request, $response, $args) {

    $result =  new stdClass();
    $db = new DbHandler();
    $query = "select * from picoBabyPhoto order by id desc";
    $dbresult = $db->getRecords($query);
    $result->status = true ;
    $result->data = $dbresult ;
    echo json_encode($result);
});
$app->post('/deletebabyPhotoImage', function ($request, $response, $args) {
        
    if(json_encode(getAdminUserId()) == "false" ){
    echo "no authentication";
    exit();
}

$result =  new stdClass();
$param =  $request->getParsedBody();
$id = $param['id'];

$db = new DbHandler();
$query = "delete from picoBabyPhoto where id =". $id ; 
$dbresult = $db->insert($query);  
if($query){
    $filename=$param['url'];            
    unlink("upload/" .$filename);
}  
$result->status = true ;
echo json_encode($result);

});
    

