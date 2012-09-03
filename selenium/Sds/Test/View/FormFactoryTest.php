<?php

namespace Sds\Test\View;

use Sds\Test\AbstractWebDriverTest;

class FormFactoryTest extends AbstractWebDriverTest {

    public function setUp(){
        parent::setUp();
        $this->open('Sds/Test/View/Functional/TestFormFactory.html');
    }

    public function testRecoverPassword(){
        sleep(1);
        $this->assertEquals('username', $this->session->element('id', 'testUsername')->attribute('value'));
    }
}
