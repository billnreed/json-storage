import { expect } from 'chai';

import { JsonStorage } from 'src/json-storage';
import { InvalidValueTypeError } from 'src/invalid-value-type-error';
import { MissingKeyError } from 'src/missing-key-error';

describe('JsonStorage', function() {
  afterEach(function() {
    window.localStorage.clear();
  });

  describe('setting and getting valid values', function() {
    let jsonStorage: JsonStorage;

    beforeEach(function() {
      jsonStorage = new JsonStorage()
    });

    it('can set and retrieve a string', function() {
      jsonStorage.set('hello', 'world');

      expect(jsonStorage.get('hello')).to.equal('world');
    });

    it('can set and retrieve a number', function() {
      jsonStorage.set('one', 1);

      expect(jsonStorage.get('one')).to.equal(1);
    });

    it('can set and retrieve an array', function() {
      jsonStorage.set('array', [1, 2, 3]);

      expect(jsonStorage.get('array')).to.include.ordered.members([1, 2, 3]);
    });

    it('can set and retrieve an object', function() {
      jsonStorage.set('object', { one: 'one' });

      expect(jsonStorage.get('object')).to.deep.equal({ one: 'one' });
    });

    it('can set and retrieve a boolean', function() {
      jsonStorage.set('boolean', true);

      expect(jsonStorage.get('boolean')).to.be.true;
    });

    it('overwrites an existing value when setting it again', function() {
      jsonStorage.set('number', 1);
      jsonStorage.set('number', 2);

      expect(jsonStorage.get('number')).to.equal(2);
    });
  });

  describe('setting invalid values', function() {
    it('cannot set a function value', function() {
      const jsonStorage = new JsonStorage();
      const expectedError = new InvalidValueTypeError(() => {})

      expect(() => jsonStorage.set("function", () => {})).to.throw(expectedError.message);
    });
  });

  describe('getting missing keys', function() {
    it('throws a missing key error', function() {
      const jsonStorage = new JsonStorage();
      const expectedError = new MissingKeyError('missingKey');

      expect(() => jsonStorage.get('missingKey')).to.throw(expectedError.message);
    });
  });

  describe('removing keys', function() {
    it('removes an existing key and its value', function() {
      const jsonStorage = new JsonStorage();
      const expectedError = new MissingKeyError('number');

      jsonStorage.set('number', 1);
      jsonStorage.remove('number');

      expect(() => jsonStorage.get('number')).to.throw(expectedError.message);
    });

    it('throws a missing key error when the key does not exist', function() {
      const jsonStorage = new JsonStorage();
      const expectedError = new MissingKeyError('missingKey');

      expect(() => jsonStorage.remove('missingKey')).to.throw(expectedError.message);
    });
  });

  describe('clearing the store', function() {
    it('removes all the keys and values from the store', function() {
      const jsonStorage = new JsonStorage();
      const expectedError = new MissingKeyError('number');

      jsonStorage.set("number", 1);

      jsonStorage.clear();

      expect(() => jsonStorage.get("number")).to.throw(expectedError.message);
    });
  });

  describe('having multiple stores', function() {
    describe('with the same storage key', function() {
      it('load existing data on initialization', function() {
        const firstJsonStorage = new JsonStorage();
        firstJsonStorage.set('number', 1);

        const secondJsonStorage = new JsonStorage();
        expect(secondJsonStorage.get('number')).to.equal(1);
      });

      it('share data', function() {
        const firstJsonStorage = new JsonStorage();
        const secondJsonStorage = new JsonStorage();

        firstJsonStorage.set('number', 1);
        secondJsonStorage.set('number', secondJsonStorage.get('number') + 1);
        
        expect(firstJsonStorage.get('number')).to.equal(2);
      });
    });

    describe('with different storage keys', function() {

    });
  });
});