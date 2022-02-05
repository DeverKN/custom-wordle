const randomIntBetween = (min, max) => {
    //Source: Mozilla dev docs
    //URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const randomInt = (max) => {
    return randomIntBetween(0, max)
}

const randomArrayElement = (array) => {
    return array[randomInt(array.length)]
}

export {randomInt, randomIntBetween, randomArrayElement}