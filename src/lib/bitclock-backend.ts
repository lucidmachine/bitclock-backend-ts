export type Bit = 0 | 1;
export type BitDigit = [Bit, Bit, Bit, Bit];
export type BitTime = ReadonlyArray<BitDigit>;
export type UpdateFn = (bitTime: BitTime) => void;

const tensDigit = (num: number): number => Math.floor(num / 10);

const onesDigit = (num: number): number => num % 10;

const timeAsDigits = (time: Date): ReadonlyArray<number> => [
  tensDigit(time.getHours()),
  onesDigit(time.getHours()),
  tensDigit(time.getMinutes()),
  onesDigit(time.getMinutes()),
  tensDigit(time.getSeconds()),
  onesDigit(time.getSeconds())
];

const isBitActive = (placeValue: number, digit: number): boolean =>
  // tslint:disable:no-bitwise
  (placeValue & digit) > 0;

export const bit = (placeValue: number, digit: number): Bit =>
  isBitActive(placeValue, digit) ? 1 : 0;

export const bitDigit = (digit: number): BitDigit => [
  bit(8, digit),
  bit(4, digit),
  bit(2, digit),
  bit(1, digit)
];

export const bitTime = (date: Date = new Date()): BitTime =>
  timeAsDigits(date).map((digit: number) => bitDigit(digit));
