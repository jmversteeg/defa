'use strict';

const sinon          = require('sinon');
const chai           = require('chai');
const sinonChai      = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

chai.should();

const defa = require('./');

describe('defa', () => {

    it('should function as a drop-in replacement for _.defaults when none of the values are functions', () => {

        defa({
            foo: 'bar',
            baz: undefined
        }, {
            foo: 'baz',
            baz: 'beepboop'
        }).should.deep.equal({
            foo: 'bar',
            baz: 'beepboop'
        });
    });

    it('should invoke functions if they are given instead of objects', () => {

        defa({
            foo: 'bar'
        }, obj => {
            return {
                baz: obj.foo + 'baz'
            };
        }).should.deep.equal({
            foo: 'bar',
            baz: 'barbaz'
        });
    });

    it('should invoke functions if they are given instead of values', () => {

        defa({
            foo: 'bar'
        }, {
            baz: () => 'baz'
        }).should.deep.equal({
            foo: 'bar',
            baz: 'baz'
        });
    });

    it('should not invoke functions if they are given instead of values for where the value is already defined', () => {

        const spy = sinon.spy();

        defa({
            foo: 'bar'
        }, {
            foo: spy
        });

        spy.should.not.have.been.called;
    });

    it('should handle non-object arguments gracefully', () => {

        defa(false, {
            foo: 'bar',
            baz: undefined
        }, null, {
            foo: 'baz',
            baz: 'beepboop'
        }).should.deep.equal({
            foo: 'bar',
            baz: 'beepboop'
        });
    });

    it('should mutate the original object', () => {

        var original = {
            foo: 'bar',
            baz: undefined
        };

        var result = defa(original, {
            foo: 'baz',
            baz: 'beepboop'
        });

        result.should.deep.equal({
            foo: 'bar',
            baz: 'beepboop'
        });

        original.should.equal(result);
    });
});