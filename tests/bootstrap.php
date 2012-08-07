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
$loader->add('Sijit\\Test', __DIR__);

\Sijit\Test\AbstractWebDriverTest::setBaseUrl('http://localhost/ZendSkeletionApplication/js/dojo_src/');