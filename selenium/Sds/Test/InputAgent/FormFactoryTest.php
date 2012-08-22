<?php

namespace Sds\Test\AuthModule;

use Sds\Test\AbstractWebDriverTest;

class LoginInputAgentTest extends AbstractWebDriverTest {

    public function setUp(){
        parent::setUp();
        $this->open('Sds/Test/InputAgent/Functional/TestFormFactory.html');
    }

    public function testRecoverPassword(){
        sleep(1);
        $this->assertEquals('username', $this->session->element('id', 'testUsername')->attribute('value'));
    }
}
