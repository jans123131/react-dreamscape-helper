<?php
require_once 'config.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    
    // Get query parameters
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
    $search = isset($_GET['search']) ? trim($_GET['search']) : '';
    
    // Ensure minimum values
    $page = max(1, $page);
    $limit = max(1, min(100, $limit)); // Cap at 100 records per page
    
    // Base query for agent messages
    $base_query = "FROM messages WHERE 1=1";
    
    // Add search filter if provided
    if (!empty($search)) {
        $base_query .= " AND (sender_name LIKE :search OR message_content LIKE :search)";
    }
    
    // Get total count
    $count_sql = "SELECT COUNT(*) as total " . $base_query;
    $count_stmt = $db->prepare($count_sql);
    
    if (!empty($search)) {
        $search_param = '%' . $search . '%';
        $count_stmt->bindParam(':search', $search_param);
    }
    
    $count_stmt->execute();
    $total_records = $count_stmt->fetch()['total'];
    
    // Calculate pagination
    $total_pages = ceil($total_records / $limit);
    $offset = ($page - 1) * $limit;
    
    // Get agent messages with pagination
    $messages_sql = "SELECT id, sender_name, message_content, created_at " . 
                    $base_query . 
                    " ORDER BY created_at DESC LIMIT :limit OFFSET :offset";
    
    $messages_stmt = $db->prepare($messages_sql);
    
    if (!empty($search)) {
        $messages_stmt->bindParam(':search', $search_param);
    }
    
    $messages_stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
    $messages_stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
    $messages_stmt->execute();
    
    $messages = $messages_stmt->fetchAll();
    
    // Return JSON response
    echo json_encode([
        'success' => true,
        'data' => $messages,
        'pagination' => [
            'current_page' => $page,
            'total_pages' => $total_pages,
            'total_records' => $total_records,
            'per_page' => $limit,
            'has_next' => $page < $total_pages,
            'has_previous' => $page > 1
        ]
    ]);
    
} catch(Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>