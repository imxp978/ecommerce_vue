<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json;charset=utf-8');

require_once('./conn_db.php');

$input = json_decode(file_get_contents('php://input'), true);

$userName = $input['username'];
$passWord = $input['password'];

try {
  $sql = "SELECT * FROM member WHERE email = ? AND pw1 = ?";
  $params = [$userName, $passWord];
  $stmt = $link->prepare($sql);
  $query = $stmt->execute($params);
  if ($query) {
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (count($result)>0) {
      $data = array(
        'success' => true,
        'message' => 'Login success',
        'user' => $result[0]['email'],
      );
    } else {
      $data = array(
        'success' => false,
        'message' => 'Invalid username or password',
      );
    }
  } else {
    $data = array(
      'success' => false,
      'message' => 'Query failed',
    );
  }

} catch(Exception $e) {
  $data = array(
    'success' => false,
    'message' => 'Database error',
  );
}
echo json_encode($data, JSON_UNESCAPED_UNICODE);

?>