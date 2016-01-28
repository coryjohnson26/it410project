/**
 * Created by coryjohnson on 1/25/16.
 */
const hw1 = require('../index.js');
const expect = require('chai').expect;

describe('readFiles', function(){
    it('rejects non-string path', function () {
        return hw1.readFile(23).catch(function (value) {
            expect(value).to.equal('Path provided not a string');
        });
    });
    it('rejects failure to read file', function () {
        return hw1.readFiles(['tests/readFileContents', 'tests/nonExtantFile']).catch(function (value) {
            expect(value).to.equal('Path points to non-file');
        });
    });
    it('rejects failure to read file', function () {
        return hw1.readFiles(['tests/readFileContents', 'tests/secondFile']).then(function (value) {
            expect(value).to.deep.equal({ 'tests/readFileContents': 'this is a test',
                                            'tests/secondFile': 'test contents' });
        });
    });
});