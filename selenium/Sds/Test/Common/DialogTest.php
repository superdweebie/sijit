<?php

namespace Sds\Test\Common;

use Sds\Test\AbstractWebDriverTest;

class DialogTest extends AbstractWebDriverTest {

    public function setUp(){
        parent::setUp();
        $this->open('Sds/Test/Common/Functional/TestDialog.html');
    }

    public function testRecoverPassword(){
        sleep(3);

        $this->session->element('id', 'showDialog')->click();
        sleep(0.3);

        $this->session->element('id', 'invalidState')->click();
        $this->assertEquals('bad', $this->session->element('id', 'State')->text());

        $this->session->element('id', 'validState')->click();
        $this->assertEquals('', $this->session->element('id', 'State')->text());

        // Click the ok button
        $this->session->element('id', 'testDialog')->element('class name', 'dialogButtons')->element('tag name', 'span')->click();
        sleep(1);
        $this->assertEquals('{"state":"","button":"ok","value":{"helloInput":"hello"}}', $this->session->element('id', 'ReturnValue')->text());

        $this->session->element('id', 'showDialog')->click();
        sleep(0.3);

        // Click the cancel button
        $this->session->element('id', 'testDialog')->element('class name', 'dijitDialogCloseIcon')->click();
        sleep(1);
        $this->assertEquals('{"state":"","button":"cancel","value":{"helloInput":"hello"}}', $this->session->element('id', 'ReturnValue')->text());
    }
}
