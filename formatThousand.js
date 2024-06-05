/**
 * formatThousand - accept a number and return the number formatted with commas as thousands separators
 * @number: number passed into the function to be formatted
 * return: formatted number with commas as thousands separators
 */

function formatThousand(number) {
    // Convert number to string
    let numStr = number.toString();
    
    // Regex to match groups of three digits
    let regex = /\B(?=(\d{3})+(?!\d))/g;
    
    // Add commas for thousands separators
    let formattedNumber = numStr.replace(regex, ",");
    
    return formattedNumber;
}