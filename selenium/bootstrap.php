<?php

$loaderPath = 'vendor/autoload.php';

// Root if testing independently
$applicationRoot = __DIR__ . '/../';

if ( ! file_exists($applicationRoot . $loaderPath )) {
    // Root if testing as part of a larger app
    $applicationRoot = __DIR__ . '/../../../../';
}

chdir($applicationRoot);

$loader = require_once($loaderPath);
$loader->add('Sds\\Test', __DIR__);

$baseUrl = getenv('TEST_BASE_URL');
if ( ! $baseUrl){
    $baseUrl = 'http://localhost/ZendSkeletonApplication/js/dojo_src/';
}

\Sds\Test\AbstractWebDriverTest::setBaseUrl($baseUrl);