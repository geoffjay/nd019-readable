/**
 * @description Capitalize the first letter in a string.
 * @param {string} str - The string to capitalize
 */
export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}
