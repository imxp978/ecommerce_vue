<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json;charset=utf-8');

require_once('./conn_db.php');

$input = json_decode(file_get_contents('php://input'), true);

$email = $input['email'];
$passWord = md5($input['password']);

try {
  $sql = "INSERT INTO member (email, pw1) VALUES (?,?)";
  $params = [$email, $passWord ];
  $stmt = $link->prepare($sql);
  $query = $stmt->execute($params);
  if ($query) {
    $data = array (
      'success' => true,
      'message' => 'Sign up success'
    );
  } else {
    $data = array (
      'success' => false,
      'message' => 'Database error',
    );
  }
} catch(Exception $e) {
  $data = array (
    'success' => false,
    'message' => 'Sign up failed'
  );
}
echo json_encode($data, JSON_UNESCAPED_UNICODE);

?>