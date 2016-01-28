/**
 * Created by coryjohnson on 1/25/16.
 */
const hw1 = require('../index.js');
const expect = require('chai').expect;

describe('getPathType', function(){
    it('resolves file', function () {
        return hw1.getPathType('tests/testExists.js').then(function (value) {
            expect(value).to.equal('file');
        });
    });
    it('resolves directory', function () {
        return hw1.getPathType('tests').then(function (value) {
            expect(value).to.equal('directory');
        });
    });
    it('resolves nothing', function () {
        return hw1.getPathType('doesntExist').then(function (value) {
            expect(value).to.equal('nothing');
        });
    });
    it('rejects non-string', function () {
        return hw1.getPathType(23).catch(function (value) {
            expect(value).to.equal('Path provided not a string');
        });
    });
});