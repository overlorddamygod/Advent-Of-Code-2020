const fs = require("fs")

fs.readFile('input.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.split("\n")

    // Part 1
    bags = allBags1(data)
    console.log(Object.keys(bags).map( bagColor => {
        return containsBag(bags,bagColor)
    }).filter(a=>!!a).length)

    // Part 2

    bags = allBags2(data)
    console.log(noOfBags(bags,"shiny gold"))
});

const allBags1 = (rules) => {
    const bags = {};
    rules.forEach(rule => {
        const bagColor = rule.match(/([a-z]+ [a-z]+) bags/)[1]
        let containedBags = rule.match(/([1-9]+) ([a-z]+ [a-z]+)/g)
        if ( containedBags ) containedBags = containedBags.map(r => r.split(/\d+/)[1].trim())
        bags[bagColor] = containedBags
    })
    return bags
}

// Part 1
const containsBag = (bagDict, bagColor, containedBagColor = "shiny gold") => {
    if ( !bagDict[bagColor] ) return false;
    if ( bagDict[bagColor].includes(containedBagColor) ) return true;
    
    return bagDict[bagColor].map(bags => containsBag(bagDict, bags)).includes(true);
}

const allBags2 = (rules) => {
    const bags = {};
    rules.forEach(rule => {
        const bagColor = rule.match(/([a-z]+ [a-z]+) bags/)[1]
        let containedBags = rule.match(/([1-9]+) ([a-z]+ [a-z]+)/g)
        if ( containedBags ) {
            containedBags = containedBags.reduce((acc,r) => {
                let [no, n1, n2] = r.split(" ")
                acc[n1+" "+n2] = +no;
                return acc
            },{})
        }
        bags[bagColor] = containedBags
    })
    return bags
}

// Part 2
const noOfBags = (bagDict, bagColor) => {
    if ( !bagDict[bagColor] ) return 0;

    let bags = bagDict[bagColor]
    
    return Object.keys(bags).map(indColor=> {
        return bags[indColor] + bags[indColor] * noOfBags(bagDict, indColor)
    }).reduce((acc,a)=>acc+a,0)
}