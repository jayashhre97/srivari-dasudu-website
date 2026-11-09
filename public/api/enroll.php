<?php
/**
 * Srivari Dasudu - Vedic School Admission API Endpoint
 * Handles secure submission, server-side validation, and persistence for Hostinger PHP environment.
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON payload']);
    exit;
}

// 1. Server-side Validation
$studentName = trim($data['studentName'] ?? '');
$studentAge = intval($data['studentAge'] ?? 0);
$gothram = trim($data['gothram'] ?? '');
$fatherName = trim($data['fatherName'] ?? '');
$motherName = trim($data['motherName'] ?? '');
$selectedVeda = trim($data['selectedVeda'] ?? '');
$phone = trim($data['phone'] ?? '');
$nativePlace = trim($data['nativePlace'] ?? '');
$notes = trim($data['notes'] ?? '');

$allowedVedas = [
    'Rigveda (ఋగ్వేదం)',
    'Yajurveda (యజుర్వేదం)',
    'Samaveda (సామవేదం)',
    'Atharvaveda (అథర్వవేదం)'
];

$errors = [];

if (empty($studentName)) {
    $errors['studentName'] = 'Student name is required';
}

if ($studentAge < 6 || $studentAge > 30) {
    $errors['studentAge'] = 'Student age must be between 6 and 30';
}

if (empty($gothram)) {
    $errors['gothram'] = 'Gothram is required';
}

if (empty($fatherName)) {
    $errors['fatherName'] = "Father's name is required";
}

if (empty($motherName)) {
    $errors['motherName'] = "Mother's name is required";
}

if (empty($selectedVeda) || !in_array($selectedVeda, $allowedVedas)) {
    $errors['selectedVeda'] = 'Please select a valid Veda';
}

if (empty($phone) || strlen(preg_replace('/[^0-9]/', '', $phone)) < 10) {
    $errors['phone'] = 'A valid 10-digit mobile number is required';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// 2. Generate Reference ID
$enrollmentId = 'SRV-VED-' . date('Y') . '-' . strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 6));

$record = [
    'enrollmentId' => $enrollmentId,
    'studentName' => htmlspecialchars($studentName, ENT_QUOTES, 'UTF-8'),
    'studentAge' => $studentAge,
    'gothram' => htmlspecialchars($gothram, ENT_QUOTES, 'UTF-8'),
    'fatherName' => htmlspecialchars($fatherName, ENT_QUOTES, 'UTF-8'),
    'motherName' => htmlspecialchars($motherName, ENT_QUOTES, 'UTF-8'),
    'selectedVeda' => $selectedVeda,
    'phone' => htmlspecialchars($phone, ENT_QUOTES, 'UTF-8'),
    'nativePlace' => htmlspecialchars($nativePlace, ENT_QUOTES, 'UTF-8'),
    'notes' => htmlspecialchars($notes, ENT_QUOTES, 'UTF-8'),
    'submittedAt' => date('c'),
    'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
];

// 3. Store Securely in protected data directory
$storageDir = __DIR__ . '/../data';
if (!is_dir($storageDir)) {
    @mkdir($storageDir, 0755, true);
    // Write .htaccess to protect database directory from web access
    @file_put_contents($storageDir . '/.htaccess', "Deny from all\n");
}

$dataFile = $storageDir . '/enrollments.json';
$existing = [];
if (file_exists($dataFile)) {
    $raw = @file_get_contents($dataFile);
    if ($raw) {
        $existing = json_decode($raw, true) ?: [];
    }
}

array_unshift($existing, $record);
@file_put_contents($dataFile, json_encode($existing, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);

// 4. Optional Admin Notification Email
$adminEmail = 'srivaridasudu@gmail.com';
$subject = "New Vedic School Enrollment: {$studentName} ({$selectedVeda})";
$message = "Srivari Dasudu Veda Pathashala - New Enrollment\n\n"
         . "Reference: {$enrollmentId}\n"
         . "Student Name: {$studentName}\n"
         . "Age: {$studentAge}\n"
         . "Selected Veda: {$selectedVeda}\n"
         . "Gothram: {$gothram}\n"
         . "Father's Name: {$fatherName}\n"
         . "Mother's Name: {$motherName}\n"
         . "Contact Phone: {$phone}\n"
         . "Native Place: {$nativePlace}\n"
         . "Notes: {$notes}\n"
         . "Date: " . date('Y-m-d H:i:s') . "\n";

$headers = 'From: noreply@srivaridasudu.com' . "\r\n" .
           'Reply-To: noreply@srivaridasudu.com' . "\r\n" .
           'X-Mailer: PHP/' . phpversion();

@mail($adminEmail, $subject, $message, $headers);

// 5. Send Successful Response
http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Enrollment submitted successfully',
    'enrollmentId' => $enrollmentId,
    'record' => $record
]);

