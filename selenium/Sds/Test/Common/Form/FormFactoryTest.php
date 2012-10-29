<?php

namespace Sds\Test\Common\Form;

use Sds\Test\AbstractWebDriverTest;

class FormFactoryTest extends AbstractWebDriverTest {

    public function setUp(){
        parent::setUp();
        $this->open('Sds/Test/Common/Form/Functional/TestFormFactory.html');
    }

    public function testFormFactory(){
        sleep(1);
        $this->assertEquals('Toby', $this->session->element('id', 'testUsername')->attribute('value'));
        $this->assertEquals('password1', $this->session->element('id', 'testPassword')->attribute('value'));

        $this->assertEquals('', $this->session->element('id', 'state1')->text());
        $this->assertEquals('Error', $this->session->element('id', 'state2')->text());
        $this->assertEquals('Error', $this->session->element('id', 'state3')->text());
    }
}
