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

// second answer interpreted and converted to js from solution notes

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

module.exports = {
  isUnique,
  checkPermutation,
  checkPermutation2
}
