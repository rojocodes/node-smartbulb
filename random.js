function generateRandom() {
    return (Math.random() * 0xFFFFFF << 0).toString(16);
}


function splitcolor(color) {
    var arr = color.match(/.{1,2}/g)
    return {
        red: arr[0],
        green: arr[1],
        blue: arr[2]
    }
}


function findaddition(r, g, b) {
    red = 255 - parseInt(r, 16);
    green = 255 - parseInt(g, 16);
    blue = 255 - parseInt(b, 16);

    sum = getSum(red, green);
    sum = getSum(sum, blue);
    sum = getSum(sum, 55);
    sum = sum - 3;
    return sum;
}

function findpaddingData(sum) {
    val = 255 - sum;
    padding = val.toString(16)
    if (padding.length == 1) {
        return '0' + padding
    } else
        return padding
}

function getSum(a, b) {
    sum = a + b;
    if (sum > 255) {
        return sum - 255;
    }
    return sum;
}

function generateHexString() {
    var hex1 = '0f0d0300'
    var hex2 = 'c8000001000000'
    var hex3 = 'ffff'

    var random = generateRandom();
    var colors = splitcolor(random);
    addition = findaddition(colors.red, colors.green, colors.blue)
    padding = findpaddingData(addition);

    var finalhex = hex1 + random + hex2 + padding + hex3

    return {
        hex: finalhex,
        color: '#' + random
    }

}

module.exports = {
    generateHexString
}