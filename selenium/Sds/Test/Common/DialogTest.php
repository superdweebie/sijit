<?php

namespace Sds\Test\Common;

use Sds\Test\AbstractWebDriverTest;

class DialogTest extends AbstractWebDriverTest {

    public function setUp(){
        parent::setUp();
        $this->open('Sds/Test/Common/Functional/TestDialog.html');
    }

    public function testDialog(){
        sleep(1);

        $this->session->element('id', 'showDialog')->click();
        sleep(1);

        $this->session->element('id', 'invalidState')->click();
        $this->assertEquals('bad', $this->session->element('id', 'State')->text());

        $this->session->element('id', 'validState')->click();
        $this->assertEquals('', $this->session->element('id', 'State')->text());

        // Click the cancel button
        $this->session->element('class name', 'modal-footer')->element('class name', 'btn')->click();
        sleep(1);

        $this->assertEquals(
            '{"state":"","button":"cancel","value":{"helloInput":"hello"}}',
            str_replace(["\n", "\t", " "], "", $this->session->element('id', 'ReturnValue')->text())
        );

        $this->session->element('id', 'showDialog')->click();
        sleep(1);

        // Click the ok button
        $this->session->element('class name', 'modal-footer')->element('class name', 'btn-primary')->click();
        sleep(1);
        $this->assertEquals(
            '{"state":"","button":"ok","value":{"helloInput":"hello"}}',
            str_replace(["\n", "\t", " "], "", $this->session->element('id', 'ReturnValue')->text())
        );
    }
}
