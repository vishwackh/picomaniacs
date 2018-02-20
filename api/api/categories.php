<?php
$app->post('/addCategory', function ($request, $response, $args) {

    if(json_encode(getAdminUserId()) == "false" ){
        echo "no authentication";
        exit();
    }

    $result =  new stdClass();
    $param =  $request->getParsedBody();
    $name = $param['name'];
    $db = new DbHandler();
    $query = "insert into locationentity (name) values ('".$name."')";
    $dbresult = $db->insert($query);
    if($dbresult !== 0){
            $result->status = true ;
    }else {
         $result->status = false ;
    }
     echo json_encode($result);

});
$app->get('/getCategory', function ($request, $response, $args) {
    
         if(json_encode(getAdminUserId()) == "false" ){
            echo "no authentication";
            exit();
        }
    
        $result =  new stdClass();
        $db = new DbHandler();
        $query = "select * from locationentity order by id desc ";
        $dbresult = $db->getRecords($query);
        $result->status = true ;
        $result->data = $dbresult ;
        echo json_encode($result);
});
$app->post('/deleteCategory', function ($request, $response, $args) {

     if(json_encode(getAdminUserId()) == "false" ){
        echo "no authentication";
        exit();
    }

    $result =  new stdClass();
    $param =  $request->getParsedBody();
    $id = $param['id'];
    $db = new DbHandler();
    $query = "delete from locationentity where id =". $id ; 
    $dbresult = $db->insert($query);    
    $result->status = true ;
    echo json_encode($result);

});

