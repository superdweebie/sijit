<?php

namespace Sds\Test\Common;

use Sds\Test\AbstractWebDriverTest;

class DialogTest extends AbstractWebDriverTest {

    public function setUp(){
        parent::setUp();
        $this->open('Sds/Test/Common/Functional/TestDialog.html');
    }

    public function testRecoverPassword(){
        sleep(1);

        $this->session->element('id', 'showDialog')->click();

        $this->session->element('id', 'invalidState')->click();
        $this->assertEquals('bad', $this->session->element('id', 'State')->text());

        $this->session->element('id', 'validState')->click();
        $this->assertEquals('', $this->session->element('id', 'State')->text());

        // Click the cancel button
        $this->session->element('id', 'testDialog')->element('class name', 'dijitDialogCloseIcon')->click();
        $this->assertEquals(
            '{"state":"","button":"cancel","value":{"helloInput":"hello"}}',
            $this->session->element('id', 'ReturnValue')->text()
        );

        $this->session->element('id', 'showDialog')->click();

        // Click the ok button
        $this->session->element('class name', 'dialogButtons')->element('xpath', './/*[@data-dojo-attach-event]')->click();
        $this->assertEquals(
            '{"state":"","button":"ok","value":{"helloInput":"hello"}}',
            $this->session->element('id', 'ReturnValue')->text()
        );
    }
}
