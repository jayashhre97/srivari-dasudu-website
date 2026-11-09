<?php
/**
 * Srivari Dasudu - Admin Vedic School Enrollments Viewer & Export
 */

header('Content-Type: application/json; charset=UTF-8');

// Optional Admin Token check (pass via ?token=... or Authorization header)
$adminSecret = getenv('ADMIN_SECRET') ?: 'srivari_vedic_2026';
$providedToken = $_GET['token'] ?? ($_SERVER['HTTP_AUTHORIZATION'] ?? '');

if (str_replace('Bearer ', '', $providedToken) !== $adminSecret) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Unauthorized']);
    exit;
}

$dataFile = __DIR__ . '/../data/enrollments.json';
if (!file_exists($dataFile)) {
    echo json_encode(['success' => true, 'count' => 0, 'enrollments' => []]);
    exit;
}

$raw = file_get_contents($dataFile);
$enrollments = json_decode($raw, true) ?: [];

echo json_encode([
    'success' => true,
    'count' => count($enrollments),
    'enrollments' => $enrollments
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

