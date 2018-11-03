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

const sortString = string => string.split('').sort().join()

const checkPermutation = (string, string2) => sortString(string) === sortString(string2)

// second answer follows defininition of permutation - two words with same character counts
// adapted and interpreted in js from solutions

const checkPermutation2 = (string, string2) => {
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

const permutationOfPalindrome = string => {
  let characters = {}

  const stringArray = string.toLowerCase().replace(/\s/g, '').split('')

  stringArray.forEach(char => {
    !characters[char] ? characters[char] = 1 : characters[char]++
  })

  const oddCount = Object.values(characters).filter(occurrences => isOdd(occurrences)).length

  return oddCount === 1
}

console.log(permutationOfPalindrome('tactc oapapa'))

module.exports = {
  isUnique,
  checkPermutation,
  checkPermutation2,
  URLify
}
