<?php
session_start();

$email_destinatario = 'info@colombinilelio.it';
$log_file = __DIR__ . '/log_errori.txt';
$rate_limit_file = __DIR__ . '/rate_limit/' . md5($_SERVER['REMOTE_ADDR']) . '.txt';
$max_tentativi = 3;
$finestra_tempo = 600;

function scrivi_log($messaggio) {
    global $log_file;
    $timestamp = date('Y-m-d H:i:s');
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    @file_put_contents($log_file, "[$timestamp] [IP: $ip] $messaggio" . PHP_EOL, FILE_APPEND | LOCK_EX);
}

function verifica_rate_limit() {
    global $rate_limit_file, $max_tentativi, $finestra_tempo;
    
    $rate_dir = dirname($rate_limit_file);
    if (!is_dir($rate_dir)) {
        @mkdir($rate_dir, 0755, true);
    }
    
    $tentativi = [];
    if (file_exists($rate_limit_file)) {
        $contenuto = @file_get_contents($rate_limit_file);
        $tentativi = json_decode($contenuto, true) ?: [];
    }
    
    $ora = time();
    $tentativi = array_filter($tentativi, function($t) use ($ora, $finestra_tempo) {
        return ($ora - $t) < $finestra_tempo;
    });
    
    if (count($tentativi) >= $max_tentativi) {
        return false;
    }
    
    $tentativi[] = $ora;
    @file_put_contents($rate_limit_file, json_encode(array_values($tentativi)), LOCK_EX);
    
    return true;
}

function genera_csrf_token() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        $_SESSION['csrf_token_time'] = time();
    }
    return $_SESSION['csrf_token'];
}

function verifica_csrf_token($token) {
    if (empty($token) || empty($_SESSION['csrf_token'])) {
        return false;
    }
    $valido = hash_equals($_SESSION['csrf_token'], $token);
    $scaduto = (time() - ($_SESSION['csrf_token_time'] ?? 0)) > 3600;
    return $valido && !$scaduto;
}

function pulisci_input($dato) {
    $dato = trim($dato);
    $dato = strip_tags($dato);
    return $dato;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /contatti');
    exit;
}

if (!verifica_rate_limit()) {
    scrivi_log('Rate limit superato');
    header('Location: /errore.html?code=429');
    exit;
}

$csrf_token = $_POST['csrf_token'] ?? '';
if (!verifica_csrf_token($csrf_token)) {
    scrivi_log('CSRF token non valido');
    header('Location: /errore.html?code=403');
    exit;
}

if (!empty($_POST['website'])) {
    scrivi_log('Honeypot attivato - possibile spam');
    http_response_code(200);
    header('Location: /thank-you.html');
    exit;
}

$nome = pulisci_input($_POST['nome'] ?? '');
$email = pulisci_input($_POST['email'] ?? '');
$telefono = pulisci_input($_POST['telefono'] ?? '');
$servizio = pulisci_input($_POST['servizio'] ?? '');
$messaggio = pulisci_input($_POST['messaggio'] ?? '');
$privacy = isset($_POST['privacy']) ? true : false;

$errori = [];

if (empty($nome) || strlen($nome) < 2) {
    $errori[] = 'nome';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errori[] = 'email';
}

if (empty($messaggio) || strlen($messaggio) < 10) {
    $errori[] = 'messaggio';
}

if (!$privacy) {
    $errori[] = 'privacy';
}

if (!empty($errori)) {
    scrivi_log('Validazione fallita: ' . implode(', ', $errori));
    header('Location: /contatti?error=' . implode(',', $errori));
    exit;
}

$servizi_map = [
    'macchine-agricole' => 'Macchine e Attrezzature Agricole',
    'giardinaggio' => 'Attrezzature Giardinaggio',
    'autofficina' => 'Autofficina',
    'ricambi' => 'Ricambi Agricoli e Giardinaggio',
    'assistenza' => 'Assistenza Tecnica e Riparazioni',
    'gas' => 'Gas GPL e Carburanti',
    'dpi' => 'DPI e Sicurezza sul Lavoro',
    'altro' => 'Altro'
];

$servizio_testo = $servizi_map[$servizio] ?? 'Non specificato';

$data_invio = date('d/m/Y H:i:s');
$ip_mittente = $_SERVER['REMOTE_ADDR'] ?? 'sconosciuto';

$oggetto = 'Nuovo messaggio dal sito web - ' . substr($nome, 0, 50);

$corpo = "NUOVO MESSAGGIO DAL SITO WEB\n";
$corpo .= "==============================\n\n";
$corpo .= "Data: $data_invio\n";
$corpo .= "Da: $nome <{$email}>\n";
if (!empty($telefono)) {
    $corpo .= "Telefono: $telefono\n";
}
$corpo .= "Servizio: $servizio_testo\n";
$corpo .= "\n--- MESSAGGIO ---\n";
$corpo .= wordwrap($messaggio, 70, "\n", true);
$corpo .= "\n\n---\n";
$corpo .= "Inviato da: $ip_mittente\n";
$corpo .= "Pagina: " . ($_SERVER['HTTP_REFERER'] ?? 'sconosciuta') . "\n";

$headers = [
    'From: ' . $email_destinatario,
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8',
    'X-Originating-IP: ' . $ip_mittente
];

$mail_inviata = @mail($email_destinatario, $oggetto, $corpo, implode("\r\n", $headers));

if ($mail_inviata) {
    unset($_SESSION['csrf_token']);
    unset($_SESSION['csrf_token_time']);
    scrivi_log('Email inviata con successo da: ' . substr($email, 0, 30));
    header('Location: /thank-you.html');
    exit;
} else {
    scrivi_log('Errore invio mail()');
    header('Location: /errore.html?code=500');
    exit;
}
