const express = require('express');
const app = express();
app.use(express.json());

// Change these values to your own
const FULL_NAME = 'john_doe'; // lowercase, underscores
const DOB = '17091999'; // ddmmyyyy
const EMAIL = 'john@xyz.com';
const ROLL_NUMBER = 'ABCD123';

function isNumber(str) {
  return /^\d+$/.test(str);
}

function isAlphabet(str) {
  return /^[a-zA-Z]+$/.test(str);
}

function isSpecialChar(str) {
  return !isNumber(str) && !isAlphabet(str);
}

function isEven(numStr) {
  return parseInt(numStr) % 2 === 0;
}

function isOdd(numStr) {
  return parseInt(numStr) % 2 === 1;
}

function alternatingCaps(str) {
  let result = '';
  let upper = true;
  for (let c of str) {
    if (/[a-zA-Z]/.test(c)) {
      result += upper ? c.toUpperCase() : c.toLowerCase();
      upper = !upper;
    }
  }
  return result;
}

app.post('/bfhl', (req, res) => {
  try {
    const data = req.body.data;
    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: 'Invalid input' });
    }
    let even_numbers = [], odd_numbers = [], alphabets = [], special_characters = [], sum = 0, alpha_concat = '';
    for (let item of data) {
      if (isNumber(item)) {
        if (isEven(item)) even_numbers.push(item);
        else odd_numbers.push(item);
        sum += parseInt(item);
      } else if (isAlphabet(item)) {
        alphabets.push(item.toUpperCase());
        alpha_concat += item;
      } else if (isSpecialChar(item)) {
        special_characters.push(item);
      }
    }
    // For concat_string: reverse all alpha chars, alternating caps
    let allAlphaChars = alpha_concat.split('').reverse().join('');
    let concat_string = alternatingCaps(allAlphaChars);
    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    });
  } catch (e) {
    res.status(500).json({ is_success: false, message: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
