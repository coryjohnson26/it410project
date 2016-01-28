/**
 * Created by coryjohnson on 1/25/16.
 */
const hw1 = require('../index.js');
const expect = require('chai').expect;

describe('getDirectoryTypes', function() {
    it('resolves object', function () {
        return hw1.getDirectoryTypes('tests').then(function(obj){
            expect(obj).to.have.property('tests/testExists.js', 'file');
            expect(obj).to.have.property('tests/testReadFiles.js', 'file');
        });
    });
    it('rejects not a directory', function(){
        return hw1.getDirectoryTypes('tests/testExists.js', -1).catch(function(obj){
            expect(obj).to.equal('Path is not a directory');
        });
    });
    it('rejects not a number', function(){
        return hw1.getDirectoryTypes('tests', 'w').catch(function(obj){
            expect(obj).to.equal('Depth is NaN');
        });
    });
    it('rejects not a string', function(){
        return hw1.getDirectoryTypes(23).catch(function(obj){
            expect(obj).to.equal('Path is not a string');
        });
    });
    it('rejects not a function', function(){
        return hw1.getDirectoryTypes('tests', 2, 'hello').catch(function(obj){
            expect(obj).to.equal('Filter is not a function');
        });
    });
});