<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json;charset=utf-8');

require_once('./conn_db.php');

try {
    $sql = "SELECT * FROM pyclass";
    $query = $link->query($sql);
    $result = $query->fetchAll(PDO::FETCH_ASSOC);
    if ($result) {
        $data = array (
            'success' => true,
            'message' => 'Category found',
            'categories' => $result,
        );
    } else {
        $data = array (
            'success' => false,
            'message' => 'No category found',
        );
    }
} catch(Exception $e) {
    $data = array(
        'success'=>false,
        'message'=>$e->getMessage(),
    );
}
echo json_encode($data, JSON_UNESCAPED_UNICODE);

?>