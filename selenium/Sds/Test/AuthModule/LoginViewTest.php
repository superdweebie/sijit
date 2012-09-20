<?php

namespace Sds\Test\AuthModule;

use Sds\Test\AbstractWebDriverTest;

class LoginViewTest extends AbstractWebDriverTest {

    public function setUp(){
        parent::setUp();
        $this->open('Sds/Test/AuthModule/Functional/TestLoginView.html');
    }

    public function testLoginView(){

        sleep(1);

        // Test recover password link
        $this->session->element('id', 'formActivateButton')->click();
        sleep(1);
        $this->session->element('id', 'recoverPasswordButton')->click();
        $this->assertEquals('recoverPassword called', $this->session->element('id', 'MockUserControllerMessage')->text());

        sleep(1);

        // Test register link
        $this->session->element('id', 'formActivateButton')->click();
        sleep(1);
        $this->session->element('id', 'registerButton')->click();
        $this->assertEquals('register called', $this->session->element('id', 'MockUserControllerMessage')->text());

        sleep(1);

        // Test return value
        $this->session->element('id', 'formActivateButton')->click();
        sleep(1);
        $this->session->element('id', 'usernameInput')->value(['value' => str_split('Toby')]);
        $this->session->element('id', 'passwordInput')->value(['value' => str_split('password1')]);
        $this->session->element('class name', 'modal')->element('class name', 'btn-primary')->click();
        sleep(1);
        $this->assertEquals(
            '{"state":"","value":{"username":"Toby","password":"password1"}}',
            $this->session->element('id', 'ViewValue')->text()
        );
    }
}
