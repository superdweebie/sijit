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

        // Test recover password link
        $this->session->element('id', 'formActivateButton')->click();
        $this->session->element('id', 'recoverPasswordLink')->element('xpath', './/*[@data-dojo-attach-event]')->click();
        $this->assertEquals('recoverPassword called', $this->session->element('id', 'MockUserControllerMessage')->text());

        // Test register link
        $this->session->element('id', 'formActivateButton')->click();
        $this->session->element('id', 'registerLink')->element('xpath', './/*[@data-dojo-attach-event]')->click();
        $this->assertEquals('register called', $this->session->element('id', 'MockUserControllerMessage')->text());

        // Test return value
        $this->session->element('id', 'formActivateButton')->click();
        $this->session->element('id', 'usernameInput')->value(['value' => str_split('Toby')]);
        $this->session->element('id', 'passwordInput')->value(['value' => str_split('password1')]);
        $this->session->element('class name', 'dialogButtons')->element('xpath', 'span//*[@data-dojo-attach-event]')->click();
        $this->assertEquals(
            '{"state":"","value":{"username":"Toby","password":"password1"}}',
            $this->session->element('id', 'ViewValue')->text()
        );
    }
}
