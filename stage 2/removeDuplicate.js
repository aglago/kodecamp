/**
 * removeDuplicates - remove duplicate elements in an ordered array
 * @array: the array to remove duplicates
 * @returns: the array without duplicates
 */

function removeDuplicates(array) {
    let uniqueArray = []
    let current

    for (var i = 0; i < array.length; i++) {
        current = array[i]
        
        if (uniqueArray.length > 0) {
            if (current !== uniqueArray[uniqueArray.length - 1])
                uniqueArray.push(current)
        } else {
            uniqueArray.push(current)
        }

        console.log('end of array')
    }

    console.log('before returning');
    return uniqueArray
}