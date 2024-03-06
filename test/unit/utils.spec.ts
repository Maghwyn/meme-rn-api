import { expect } from 'chai';
import { ObjectId } from 'mongodb';

import { isEmpty, pluralize, convertToObjectId, truncate } from '@/common/helpers/string.helper';

describe('Utility Functions (Unit test)', () => {
	describe('isEmpty', () => {
		it('should return true for empty values', () => {
			expect(isEmpty(null)).to.be.true;
			expect(isEmpty('')).to.be.true;
			expect(isEmpty(undefined)).to.be.true;
			expect(isEmpty({})).to.be.true;
		});

		it('should return false for non-empty values', () => {
			expect(isEmpty('non-empty')).to.be.false;
			expect(isEmpty(42)).to.be.false;
			expect(isEmpty({ key: 'value' })).to.be.false;
		});
	});

	describe('pluralize', () => {
		it('should pluralize word based on count', () => {
			expect(pluralize(0, 'apple')).to.be.equal('apple');
			expect(pluralize(1, 'apple')).to.be.equal('apple');
			expect(pluralize(2, 'apple')).to.be.equal('apples');
		});
	});

	describe('convertToObjectId', () => {
		it('should convert string to ObjectId', () => {
			const objectIdString = '5f58ec2e3909f34c28f8e625';
			const result = convertToObjectId(objectIdString);
			expect(result).to.instanceOf(ObjectId);
		});

		it('should throw an error for invalid string', () => {
			const invalidObjectIdString = 'invalidId';
			expect(() => convertToObjectId(invalidObjectIdString)).to.throw('Bad request');
		});
	});

	describe('truncate', () => {
		it('should truncate string to max length', () => {
			const inputString = 'This is a long string that needs to be truncated';
			const maxLength = 10;
			const result = truncate(inputString, maxLength);
			expect(result).to.be.equal('This is a ...');
		});

		it('should not truncate if string length is less than max length', () => {
			const inputString = 'Short string';
			const maxLength = 20;
			const result = truncate(inputString, maxLength);
			expect(result).to.be.equal(inputString);
		});
	});
});
