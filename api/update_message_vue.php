
<?php
require_once 'config.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    
    // Get POST data
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!$data || !isset($data['id_message'])) {
        throw new Exception("Message ID is required");
    }
    
    $id_message = (int)$data['id_message'];
    
    // Check if email exists
    $check_sql = "SELECT id_message, vue_par_admin FROM emails WHERE id_message = :id_message";
    $check_stmt = $db->prepare($check_sql);
    $check_stmt->bindParam(':id_message', $id_message, PDO::PARAM_INT);
    $check_stmt->execute();
    
    $message = $check_stmt->fetch();
    if (!$message) {
        throw new Exception("Email not found");
    }
    
    // Update email as viewed
    $sql = "UPDATE emails 
            SET vue_par_admin = 1, 
                date_vue_admin = CURRENT_TIMESTAMP 
            WHERE id_message = :id_message";
    
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':id_message', $id_message, PDO::PARAM_INT);
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Email marked as viewed successfully'
        ]);
    } else {
        throw new Exception("Failed to update email status");
    }
    
} catch(Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
