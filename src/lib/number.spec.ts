// tslint:disable:no-expression-statement
import { double, power } from './number';

describe('number functions', () => {
  describe('double', () => {
    it('should double the given value', () => {
      expect(double(2)).toBe(4);
    });
  });

  describe('power', () => {
    it('should raise the given base to the given exponent', () => {
      expect(power(2, 4)).toBe(16);
    });
  });
});
