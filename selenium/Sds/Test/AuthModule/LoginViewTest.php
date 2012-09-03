<?php

namespace Sds\Test\AuthModule;

use Sds\Test\AbstractWebDriverTest;

class LoginViewTest extends AbstractWebDriverTest {

    public function setUp(){
        parent::setUp();
        $this->open('Sds/Test/AuthModule/Functional/TestLoginView.html');
    }

    public function testRecoverPassword(){

        sleep(1);
        $this->session->element('id', 'formActivateButton')->click();
        sleep(1);
        $this->session->element('id', 'recoverPasswordLink')->click();

        $text = $this->session->element('id', 'MockUserControllerMessage')->text();
        $this->assertEquals('recoverPassword called', $text);
    }

    public function testRegister(){

        sleep(1);
        $this->session->element('id', 'formActivateButton')->click();
        sleep(1);
        $this->session->element('id', 'registerLink')->click();

        $text = $this->session->element('id', 'MockUserControllerMessage')->text();
        $this->assertEquals('register called', $text);
    }
}
