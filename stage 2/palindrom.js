/**
 * palindrome - function that checks whether a word is palindrome or not
 * @word: the word to check whether palindrome or not
 * @returns: nothing
 */

function palindrome(word) {
    let normalOrder = []
    let reversedOrder = []

    // arranging word into an array
    for (let i = 0; i < word.length; i++)
        normalOrder[i] = word[i]
        
    // reversing word into another array
    let frontCount = 0;
    for (let i = word.length - 1; i >= 0; i--) {
        reversedOrder[frontCount] = normalOrder[i]
        frontCount++
    }

    // if elements in both array are the same in order, then palindrome
    for (let i = 0; i < word.length; i++) {
        if (normalOrder[i] !== reversedOrder[i]) {
            console.log(`${word} is not palindrome`)
            return
        }
    }
    console.log(`${word} is palindrome`);
}

// example use of the function
palindrome('level')
palindrome('energy')