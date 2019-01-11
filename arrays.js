/* Is Unique: Implement an algorithm to determine if a string has all unique characters. */

const isUnique = (string) => {
  for (const character of string.replace(/\s/g, '')) {
    const occurrences = string.split(character).length - 1
    if (occurrences > 1) return false
  }
  return true
}

/* Check Permutation: Given two strings, write a method to decide if
one is a permutation of the other. */

// answer assumes whitespace is significant

const sortString = string => string.split('').sort().join().replace(/,/g, '')

const isPermutation = (string, string2) => sortString(string) === sortString(string2)

// second answer follows defininition of permutation - two words with same character counts
// adapted and interpreted in js from solutions

const isPermutation2 = (string, string2) => {
  if (string.length !== string2.length) return false

  let letters = {}

  string.split('').forEach(character => {
    if (!letters[character]) {
      letters[character] = 1
    } else {
      letters[character]++
    }
  })

  for (let i = 0; i < string2.length; i++) {
    const character = string2.charAt(i)
    if (!letters[character]) return false
    letters[character]--
    if (letters[character] < 0) return false
  }

  return true
}
/* URLify: Write a method to replace all spaces between words in a string with '%20'.
*/

const URLify = string => string.trim().replace(/\s/g, '%20')

/*
Palindrome Permutation: Given a string, write a function to check if it is a permutation of a palindrome.
A palindrome is a word or phrase that is the same forwards and backwards.
A permutation is a rearrangement of letters.
The palindrome does not need to be limited to just dictionary words.
*/

// string must have even number of all but one character which can have an odd count- pivot;

const isOdd = n => Math.abs(n % 2) === 1

const charFrequencies = (string, countWhitespace, caseSensitive) => {
  if (!countWhitespace) string = string.replace(/\s/g, '')
  if (!caseSensitive) string = string.toLowerCase()

  let charArray = string.split('')

  const frequencies = charArray.reduce((amounts, char) => {
    !amounts[char] ? amounts[char] = 1 : amounts[char]++
    return amounts
  }, {})

  return frequencies
}

const isPermutationOfPalindrome = string => {
  let frequencies = charFrequencies(string)

  const oddCount = Object.values(frequencies).filter(frequency => isOdd(frequency)).length

  return oddCount <= 1
}

/*
One Away: There are three types of edits that can be performed on strings:
insert a character, remove a character, or replace a character.
Given two strings, write a function to check if they are one edit (or zero edits) away.
EXAMPLE
pale, ple true pales, pale -> true pale, bale -> true pale, bae -> false
*/

const longestString = (...strings) => {
  return strings.sort((a, b) => b.length - a.length)[0]
}

const shortestString = (...strings) => {
  return strings.sort((a, b) => b.length - a.length)[strings.length - 1]
}

const oneEditAway = (string, string2) => {
  const lengthDifference = Math.abs(string.length - string2.length)
  if (lengthDifference > 1) return false

  let longest = sortString(longestString(string, string2))
  let shortest = sortString(shortestString(string, string2))

  if (lengthDifference) longest = longest.slice(0, -1)
  return longest === shortest
}

/*
String Compression: Implement a method to perform basic string compression using the counts of repeated characters. For example, the string aabcccccaaa would become a2blc5a3. If the "compressed" string would not become smaller than the original string, your method should return
the original string. You can assume the string has only uppercase and lowercase letters (a - z).
*/

const compressString = string => {
  let charArray = string.split('')
  let compressedString = ''
  let count = 0

  charArray.forEach((char, i) => {
    count++
    if (i + 1 >= charArray.length || char !== charArray[i + 1]) {
      compressedString += char + count
      count = 0
    }
  })
  return compressString.length < string ? compressedString : string
}

// works ok but string concatenation operations in n squared O time
// reccomeded method

const compressStringOptimized = string => {
  const charArray = string.split('')
  const finalLength = countCompression(charArray)
  const compressedCharArray = []
  console.log(finalLength)

  if (finalLength >= string.length) return string

  let count = 0
  charArray.forEach((char, i) => {
    count++
    if (i + 1 >= charArray.length || char !== charArray[i + 1]) {
      compressedCharArray.push(char)
      compressedCharArray.push(count)
      count = 0
    }
  })
  return compressedCharArray.join('')
}

const countCompression = charArray => {
  let compressedLength = 0
  let count = 0

  charArray.forEach((char, i) => {
    count++
    if (i + 1 >= charArray.length || char !== charArray[i + 1]) {
      compressedLength += 1 + count.toString().length
      count = 0
    }
  })
  return compressedLength
}

console.log(compressStringOptimized('dddddddddddgggggdooooogo'))

module.exports = {
  isUnique,
  isPermutation,
  isPermutation2,
  URLify,
  isPermutationOfPalindrome,
  oneEditAway,
  compressString,
  compressStringOptimized
}
