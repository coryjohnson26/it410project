/**
 * Created by coryjohnson on 1/25/16.
 */
const hw1 = require('../index.js');
const expect = require('chai').expect;

describe('readFile', function(){
    it('rejects non-string path', function () {
        return hw1.readFile(23).catch(function (value) {
            expect(value).to.equal('Path provided not a string');
        });
    });
    it('rejects non-file path', function () {
        return hw1.readFile('nonExtantFile.js').catch(function (value) {
            expect(value).to.equal('Path points to non-file');
        });
    });
    it('resolves file contents', function () {
        return hw1.readFile('tests/readFileContents').then(function (value) {
            expect(value).to.equal('this is a test');
        });
    });
});