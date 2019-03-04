// tslint:disable:no-expression-statement
import 'jest';
import { advanceTo, clear } from 'jest-date-mock';

import { bit, bitDigit, bitTime } from './bitclock-backend';

describe('BitClock backend', () => {
  describe('bit()', () => {
    describe('when the given place value is active in the given digit', () => {
      it('should return 1', () => {
        expect(bit(4, 5)).toBe(1);
      });
    });

    describe('when the given place value is not active in the given digit', () => {
      it('should return 0', () => {
        expect(bit(4, 3)).toBe(0);
      });
    });
  });

  describe('bitDigit()', () => {
    describe('when given a positive integer 1 <= n <= 9', () => {
      it('should return an array of 4 Bits representing that number', () => {
        expect(bitDigit(7)).toEqual([0, 1, 1, 1]);
      });
    });
  });

  describe('bitTime()', () => {
    describe('when given a Date', () => {
      it("should return 6 BitDigits representing that Date's time in HHmmss format", () => {
        const aDate = new Date(2019, 2, 4, 12, 34, 56);

        expect(bitTime(aDate)).toEqual([
          [0, 0, 0, 1],
          [0, 0, 1, 0],
          [0, 0, 1, 1],
          [0, 1, 0, 0],
          [0, 1, 0, 1],
          [0, 1, 1, 0]
        ]);
      });
    });

    describe('when given no parameters', () => {
      it('should return 6 BitDigits representing the current time in HHmmss format', () => {
        advanceTo(new Date(2019, 2, 4, 9, 8, 7));

        expect(bitTime()).toEqual([
          [0, 0, 0, 0],
          [1, 0, 0, 1],
          [0, 0, 0, 0],
          [1, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 1, 1, 1]
        ]);

        clear();
      });
    });
  });
});
