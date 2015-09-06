
require('./object-assign.js');

var webdriver = require('selenium-webdriver');
var chai = require('chai');

var config = require('./config.json');

// Use ENV vars on Travis and sauce.json locally to get credentials
// https://docs.saucelabs.com/ci-integrations/travis-ci/
if (!process.env.SAUCE_USERNAME) {
    process.env.SAUCE_USERNAME = require('./sauce').username;
    process.env.SAUCE_ACCESS_KEY = require('./sauce').accessKey;
}

var data = {
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'build': process.env.TRAVIS_BUILD_NUMBER,
    'username': process.env.SAUCE_USERNAME,
    'accessKey': process.env.SAUCE_ACCESS_KEY
};

chai.should();

config.browsers.forEach(function(browser){

    describe("sum", function() {

        this.timeout(config.timeout);

        beforeEach(function() {
            this.driver = new webdriver.Builder().usingServer(config.seleniumServer).withCapabilities(Object.assign(data, browser)).build();
            return this.driver.get("http://localhost:8000/index.html");
        });

        afterEach(function() {
            return this.driver.quit();
        });

        it("should compute the sum", function(done) {
            var input1 = this.driver.findElement(webdriver.By.css('#val1'));
            var input2 = this.driver.findElement(webdriver.By.css('#val2'));
            var btn = this.driver.findElement(webdriver.By.css('#btn'));
            var result = this.driver.findElement(webdriver.By.css('#result'));

            input1.sendKeys("17");
            input2.sendKeys("25");
            btn.click();

            result.getText().then(function(res) {
                res.should.be.equal("42");
                done();
            });
        });

    });

});
