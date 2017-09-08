var PASSWORD = process.env.PASSWORD;
describe('Login and Submission', function() {
    beforeEach(function() {
        if (browser.isExisting('#logout')) {
            browser.click('#logout');
        }
    });

    it('should be able to login @watch', function () {
        browser.url('http://run.c2stem.org/login.html');
        browser.setValue('#username', 'dangerblocks');
        browser.setValue('#password', PASSWORD);
        browser.click('#login');
    });

    it('should be able to open training page @watch', function () {
        browser.url('http://run.c2stem.org/login.html');
        browser.setValue('#username', 'dangerblocks');
        browser.setValue('#password', PASSWORD);
        browser.click('#login');
        browser.waitForVisible('#training');

        // Technically, I should make sure this user is reset so this
        // submission message doesn't already exist
        var submitText = browser.getText('#training-label');
        expect(submitText.includes('Last'));
    });
});
