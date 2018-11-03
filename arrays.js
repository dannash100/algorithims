/* Is Unique: Implement an algorithm to determine if a string has all unique characters.
What if you cannot use additional data structures? */

const isUnique = (string) => {
  for (const character of string.replace(/\s/g, '')) {
    const occurrences = string.split(character).length - 1
    if (occurrences > 1) return false
  }
  return true
}

/* Check Permutation: Given two strings,write a method to decide if
 one is a permutation of the other. */

const sortString = string => string.split('').sort().join()

const checkPermutation = (string, string2) => sortString(string) === sortString(string2)

module.exports = {
  isUnique,
  checkPermutation
}
