/**
 * formatThousand - accept a number and return the number formatted with commas as thousands separators
 * @number: number passed into the function to be formatted
 * return: formatted number with commas as thousands separators
 */

const formatThousand = (number) => {
  let numString = number.toString();
  let len = numString.length;
  let numArray = [];

  for (let i = 0; i < len; i++) {
    numArray[i] = numString[i];
  }

  const mod = len % 3;
  let index = mod === 0 ? 3 : mod;

  while (index < len) {
    numArray.splice(index, 0, ",");
    index += 4;
    len++;
  }

  let finalString = "";
  for (let i = 0; i < len; i++) {
    finalString = finalString.concat(numArray[i]);
  }

  return parseInt(finalString);
};

formatThousand(10000000000);
