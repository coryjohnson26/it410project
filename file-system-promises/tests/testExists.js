/**
 * Created by coryjohnson on 1/25/16.
 */
const hw1 = require('../index.js');
const expect = require('chai').expect;

describe('exists', function(){
    it('rejects non-string', function () {
        return hw1.exists(23).catch(function (value) {
            expect(value).to.equal('Path provided not a string');
        });
    });
    it('resolves false for non-extant file', function () {
        return hw1.exists('/tests/imaginary.txt').then(function (value) {
            expect(value).to.equal(false);
        });
    });
    it('resolves true for extant file', function () {
        return hw1.exists('tests/testReadFiles.js').then(function (value) {
            expect(value).to.equal(true);
        });
    });
});