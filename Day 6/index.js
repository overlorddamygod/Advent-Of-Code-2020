const fs = require("fs")

fs.readFile('input.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.split("\n\n")
    console.log(data.map(noOfYes1).reduce((sum,n)=>sum+n,0))
    console.log(data.map(noOfYes2).reduce((sum,n)=>sum+n,0))
});

// Part 1
const noOfYes1 = (ques) => {
    ques = ques.replace(/\n/g,"")
    return new Set(ques).size
}

// Part 2
const noOfYes2 = (ques) => {
    ques = ques.split("\n")

    return ques.reduce((intersect,q) => {
        return intersection(intersect,q)
    },new Set(ques[0])).size
}

const intersection = (set1, set2) => {
    set1 = new Set(set1)
    set2 = new Set(set2)
    return new Set([...set1].filter(x => set2.has(x)))
}