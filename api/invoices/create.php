
<?php
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new Database();
    $db = $database->getConnection();
    
    $data = json_decode(file_get_contents("php://input"));
    
    if (!empty($data->invoice_number) && !empty($data->client_name) && 
        !empty($data->issue_date) && !empty($data->due_date) && 
        !empty($data->subtotal) && !empty($data->tax_amount) && 
        !empty($data->total_amount)) {
        
        try {
            // Check if invoice number already exists
            $check_query = "SELECT id FROM invoices WHERE invoice_number = :invoice_number";
            $check_stmt = $db->prepare($check_query);
            $check_stmt->bindParam(":invoice_number", $data->invoice_number);
            $check_stmt->execute();
            
            if ($check_stmt->rowCount() > 0) {
                http_response_code(400);
                echo json_encode(array("message" => "Invoice number already exists."));
                return;
            }
            
            // Serialize items array to JSON string if provided
            $items_json = isset($data->items) ? json_encode($data->items) : '[]';
            
            $query = "INSERT INTO invoices (id, invoice_number, client_name, issue_date, due_date, 
                                          items, subtotal, tax_amount, total_amount, notes, user_id) 
                      VALUES (UUID(), :invoice_number, :client_name, :issue_date, :due_date, 
                             :items, :subtotal, :tax_amount, :total_amount, :notes, :user_id)";
            
            $stmt = $db->prepare($query);
            
            $stmt->bindParam(":invoice_number", $data->invoice_number);
            $stmt->bindParam(":client_name", $data->client_name);
            $stmt->bindParam(":issue_date", $data->issue_date);
            $stmt->bindParam(":due_date", $data->due_date);
            $stmt->bindParam(":items", $items_json);
            $stmt->bindParam(":subtotal", $data->subtotal);
            $stmt->bindParam(":tax_amount", $data->tax_amount);
            $stmt->bindParam(":total_amount", $data->total_amount);
            $stmt->bindParam(":notes", $data->notes);
            $stmt->bindParam(":user_id", $data->user_id);
            
            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(array(
                    "message" => "Invoice created successfully.",
                    "id" => $db->lastInsertId()
                ));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to create invoice."));
            }
        } catch(PDOException $e) {
            http_response_code(503);
            echo json_encode(array("message" => "Database error: " . $e->getMessage()));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to create invoice. Data is incomplete."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed."));
}
?>
