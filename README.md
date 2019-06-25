[![CircleCI](https://circleci.com/gh/lucidmachine/bitclock-backend-ts.svg?style=svg)](https://circleci.com/gh/lucidmachine/bitclock-backend-ts)

# bitclock-backend

A [BitClock](https://github.com/lucidmachine/bitclock/) backend written in TypeScript.

# Usage
```typescript
import { bitTime, BitTime, bitDigit, BitDigit, bit, Bit } from 'bitclock';


// Get the current time as a BitTime
const currentBitTime: BitTime = bitTime();

// Get a given time as a BitTime
const someOtherBitTime: BitTime = bitTime(new Date(2019, 2, 5, 1, 2, 3));

// Get a single BitDigit
const myBitDigit: BitDigit = bitDigit(9);

// Get a bit
const eightsPlaceForNine: Bit = bit(8, 9); // 1
const foursPlaceForNine: Bit  = bit(4, 9); // 0
const twosPlaceForNine: Bit   = bit(2, 9); // 0
const onesPlaceForNine: Bit   = bit(1, 9); // 1
```

# Architecture
## Data Structures
### BitDigit
A BitDigit is an array of 4 bits which represents a single digit. Positions in the array signify place values 8, 4, 2, and 1. The value stored in that position may be either a 0 or a 1. If the value is a 1, then the corresponding place value should be added to the sum. If the value is a 0, then the corresponding place value is ignored.
```
// 8  4  2  1
  [1, 0, 0, 1]  // 8 + 0 + 0 + 1 = 9
  [0, 1, 1, 0]  // 0 + 4 + 2 + 0 = 6

```

### BitTime
A BitTime is an array of BitDigits. Each item is a digit in the current time read left to right.
```
// 12:34:56
[
// 8  4  2  1
  [0, 0, 0, 1],  // H1: 0 + 0 + 0 + 1 = 1
  [0, 0, 1, 0],  // H2: 0 + 0 + 2 + 0 = 2
  [0, 0, 1, 1],  // M1: 0 + 0 + 2 + 1 = 3
  [0, 1, 0, 0],  // M2: 0 + 1 + 0 + 0 = 4
  [0, 1, 0, 1],  // S1: 0 + 1 + 0 + 1 = 5
  [0, 1, 1, 0]   // S2: 0 + 1 + 1 + 0 = 6
]
```


## Backend
Backends retrieve the current time and transform it into a BitTime.

## Frontend
Frontends transform a BitTime into something an end user can interpret. Reference implementations exist to draw pixels in a web page or favicon, but ambitious hackers could write to a visual CLI, LEDs, audio, or even a braille terminal.
