<?php

namespace Sds\Test;

use PHPUnit_Framework_TestCase;
use WebDriver\WebDriver;

class AbstractWebDriverTest extends PHPUnit_Framework_TestCase {

    protected static $baseUrl;

    protected $session;

    public static function setBaseUrl($baseUrl)
    {
        self::$baseUrl = $baseUrl;
    }

    public function setUp(){

        $wd_host = 'http://localhost:4444/wd/hub';
        $web_driver = new WebDriver($wd_host);

        $this->session = $web_driver->session('firefox');
    }

    public function tearDown(){
        $this->session->close();
    }

    protected function open($relativeUrl){
        $this->session->open(self::$baseUrl . $relativeUrl);
    }
}

