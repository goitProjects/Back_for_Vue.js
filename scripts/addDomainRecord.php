<?php

$auth_token = $argv[3];
$post = [
        'domain_id' => $argv[4],
        'type' => 'A',
        'data' => $argv[2],
        'priority' => 0,
        'record' => $argv[1],
];


// Додавання dns записів домену
// Отправляем запрос на сервер
$ch = curl_init("https://adm.tools/action/dns/record_add/");
curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER     => ['Authorization: Bearer '.$auth_token],
        CURLOPT_POSTFIELDS     => http_build_query($post),
        CURLOPT_VERBOSE        => true
]);
$json = curl_exec($ch);
$response = @json_decode($json, true);

var_dump($response);
