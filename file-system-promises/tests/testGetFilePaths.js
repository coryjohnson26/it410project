/**
 * Created by coryjohnson on 1/25/16.
 */
const hw1 = require('../index.js');
const expect = require('chai').expect;

describe('getFilePaths', function(){
    it('rejects non-string path', function () {
        return hw1.getFilePaths(23).catch(function (value) {
            expect(value).to.equal('Path is not a string');
        });
    });
    it('rejects non-numeric depth', function () {
        return hw1.getFilePaths('tests', 'hello').catch(function (value) {
            expect(value).to.equal('Depth is NaN');
        });
    });
    it('rejects path that is not a directory', function () {
        return hw1.getFilePaths('bogusFolder', 1).catch(function (value) {
            expect(value).to.equal('Path is not a directory');
        });
    });
    it('rejects path without file', function () {
        return hw1.getFilePaths('tests/emptyTestDirectory', 1).catch(function (value) {
            expect(value).to.equal('No files in path');
        });
    });
    it('resolves array of file paths', function () {
        return hw1.getFilePaths('tests').catch(function (value) {
            expect(value).to.deep.equal([ 'tests/testExists.js',
                'tests/testGetDirectoryTypes.js',
                'tests/testGetFilePaths.js',
                'tests/testGetPathType.js',
                'tests/testReadFiles.js' ]);
        });
    });
});