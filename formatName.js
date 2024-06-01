/**
 * formatName - accept a string and return the trimmed and capitalized version of the string.
 * @name: name to be trimmed and capitalized
 * return: capitalized version of name
 */

const formatName = (name) => {
    name = name.trim()
    const splittedName = name.split(' ');

    const capitalized = splittedName.map((name) => {
        return name[0].toUpperCase().concat(name.slice(1));
    })

    let finalName = ''
    for (let i = 0; i < capitalized.length; i++)
        finalName = finalName.concat(' ', capitalized[i]);
    console.log(finalName.trim())
}