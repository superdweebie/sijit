Unit Testing
============

A range of different unit tests are shipped with sijit.

#doh Tests

The `Test` folder contains javascript based tests. Most tests use dojo's doh unit test runner. They can be executed
by loading `Test/runTests.html` in your browser. These doh based unit tests require
`dojo/utils` to be available.

#Functional Tests

Inside the `Test` folder are several `Functional` folders. These contain funtional tests, primarily of
UI components. These tests are not exercised by doh, but can be loaded manually in your browser.

#selenium Tests

The `selenium` folder contains selenium based tests. These tests automate the Functional Tests mentioned above.
To run the selenium tests, you require php, the instaclick php-webdriver package (github.com/instaclick/php-webdriver),
firefox, and an instance of selenium stand alone server running.