<?php

namespace Sds\Test\AuthenticationModule;

use Sds\Test\AbstractWebDriverTest;

class LoginViewTest extends AbstractWebDriverTest {

    public function setUp(){
        parent::setUp();
        $this->open('Sds/Test/AuthenticationModule/Functional/TestLoginView.html');
    }

    public function testLoginViewRememberMeDisabled(){

        sleep(1);

        // Turn off remember me first
        $this->session->element('id', 'showRememberMeCheckBox')->click();

        // Test recover password link
        $this->session->element('id', 'formActivateButton')->click();
        sleep(1);
        $this->session->element('id', 'forgotCredentialButton')->click();
        $this->assertEquals('forgotCredential called', $this->session->element('id', 'MockIdentityControllerMessage')->text());

        sleep(1);

        // Test register link
        $this->session->element('id', 'formActivateButton')->click();
        sleep(1);
        $this->session->element('id', 'registerButton')->click();
        $this->assertEquals('register called', $this->session->element('id', 'MockIdentityControllerMessage')->text());

        sleep(1);

        // Test return value
        $this->session->element('id', 'formActivateButton')->click();
        sleep(1);
        $this->session->element('id', 'identityNameField')->value(['value' => str_split('Toby')]);
        $this->session->element('id', 'credentialField')->value(['value' => str_split('password1')]);
        $this->session->element('class name', 'modal')->element('class name', 'btn-primary')->click();
        sleep(1);
        $this->assertEquals(
            '{"state":"","value":{"identityName":"Toby","credential":"password1"}}',
            str_replace(["\n", "\t", " "], "", $this->session->element('id', 'ViewValue')->text())
        );
    }

    public function testLoginViewRememberMeEnabled(){

        sleep(1);

        // Test return value - remember me unchecked
        $this->session->element('id', 'formActivateButton')->click();
        sleep(1);
        $this->session->element('id', 'identityNameField')->value(['value' => str_split('Toby')]);
        $this->session->element('id', 'credentialField')->value(['value' => str_split('password1')]);
        $this->session->element('class name', 'modal')->element('class name', 'btn-primary')->click();
        sleep(1);
        $this->assertEquals(
            '{"state":"","value":{"identityName":"Toby","credential":"password1","rememberMe":[]}}',
            str_replace(["\n", "\t", " "], "", $this->session->element('id', 'ViewValue')->text())
        );

        sleep(1);

        // Test return value - remember me checked
        $this->session->element('id', 'formActivateButton')->click();
        sleep(1);
        $this->session->element('id', 'rememberMeField')->click();
        $this->session->element('class name', 'modal')->element('class name', 'btn-primary')->click();
        sleep(1);
        $this->assertEquals(
            '{"state":"","value":{"identityName":"Toby","credential":"password1","rememberMe":["on"]}}',
            str_replace(["\n", "\t", " "], "", $this->session->element('id', 'ViewValue')->text())
        );
    }
}
