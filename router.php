<?php
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

if ($uri !== '/' && file_exists(__DIR__ . $uri)) {
    return false;
}

if (preg_match('/\.(?:png|jpg|jpeg|gif|ico|css|js|svg|woff|woff2|ttf|map)$/', $uri)) {
    return false;
}

if ($uri === '/' || $uri === '') {
    require_once __DIR__ . '/index.html';
    return true;
}

if (file_exists(__DIR__ . $uri)) {
    return false;
}

http_response_code(404);
require_once __DIR__ . '/404_page.html';
