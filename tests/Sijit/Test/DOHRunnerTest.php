<?php

namespace Sijit\Test;

class DOHRunnerTest extends AbstractTest {

    public function testDOHRunner(){
        $session = $this->session;

        $this->open('sijit/Test/runTests.html');

        $timeout = 15;
        $time = 0;

        while ($time < $timeout && ! $session->execute(array(
            'script' => "if (window.doh) {
                    return window.doh._currentGlobalProgressBarWidth === 100;
                } else {
                    return false;
                }",
            'args' => array()
        ))) {
            $time++;
            sleep(1);
        }

        if ($time == $timeout) {
            throw new \Exception('DOHRunner timeout');
        }

        $message = '';

        $elements = $session->elements('css selector', 'tr.failure');
        if ($elements) {
            foreach ($elements as $element) {
                $columns = $element->elements('xpath', './td');
                $testName = $columns[2]->text();
                $time = $columns[3]->text();
                if ($testName) {
                    $message .= sprintf("DOH test failure: %s %s \n", $testName, $time);
                }
            }
        }

        $elements = $session->elements('css selector', 'tr.error');
        if ($elements) {
            foreach ($elements as $element) {
                $columns = $element->elements('xpath', './td');
                $testName = $columns[2]->text();
                $time = $columns[3]->text();
                if ($testName) {
                    $message .= sprintf("DOH test error: %s %s \n", $testName, $time);
                }
            }
        }

        if ($message != '') {
            throw new \Exception($message);
        }
    }

}

