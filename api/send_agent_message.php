<?php
require_once 'config.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    
    // Get POST data
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!$data) {
        throw new Exception("No data received");
    }
    
    // Validate required fields
    if (empty($data['message_content'])) {
        throw new Exception("Message content is required");
    }
    
    // Always use "Agent" as sender name (no need for agent email/password)
    $sender_name = "Agent";
    $message_content = trim($data['message_content']);
    
    // Prepare and execute insert statement for agent messages
    $sql = "INSERT INTO messages (sender_name, message_content) 
            VALUES (:sender_name, :message_content)";
    
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':sender_name', $sender_name);
    $stmt->bindParam(':message_content', $message_content);
    
    if ($stmt->execute()) {
        $message_id = $db->lastInsertId();
        
        echo json_encode([
            'success' => true,
            'message' => 'Agent message sent successfully',
            'id' => $message_id
        ]);
    } else {
        throw new Exception("Failed to send agent message");
    }
    
} catch(Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>