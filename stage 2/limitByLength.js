/**
 * limitByLength - limits a string by 100
 * @string: the string to be limited
 * @returns: string
 */

function limitByLength(string) {
    if (string.length <= 100)
        return string
    return `${string.slice(0, 100)}...`
}

// example use of the function

console.log(
  limitByLength(
    "ut sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit sed vulputate mi sit amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat."
  )
);