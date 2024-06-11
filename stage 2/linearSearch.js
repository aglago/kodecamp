/**
 * linearSearch - searches for a string in an array of strings
 * @array: The array of strings to search
 * @string: the string that we are searching for
 * @return: string indicating whether the search was successful
 */

function linearSearch(array, string) { 
    for (let i = 0; i < array.length; i++) {
        if (string === array[i])
            return "Yes, the string exists in the array";
    }
    return "No, the string does not exist in the array";
}

// example use of function

console.log(linearSearch(['esi', 'adwoa', 'abena', 'ekua', 'yaa', 'afua', 'ama'], 'ama'))