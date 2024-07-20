<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json;charset=utf-8');

require_once('./conn_db.php');

try {
    $sql = "SELECT * FROM product";
    $query = $link->query($sql);
    $results = $query->fetchAll(PDO::FETCH_ASSOC);
    if ($results) {
        foreach($results as &$result) {
            $sqlImage = sprintf("SELECT * FROM product_img WHERE p_id= %d", $result['p_id']);
            $queryImage = $link->query($sqlImage);
            $images = $queryImage->fetchAll(PDO::FETCH_ASSOC);
            $result['img'] = $images;
        }
        unset($result);
        $data = array (
            'success' => true,
            'message' => 'Product found',
            'products' => $results,
        );
    } else {
        $data = array (
            'success' => false,
            'message' => 'No product found',
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