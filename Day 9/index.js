const fs = require("fs")

let part1Output = 0

fs.readFile('input.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.split("\n")

    // Part 1
    part1 = invalid(data,25)
    part1Output = part1["number"]
    console.log(part1)

    // Part 2
    const [arr,] = findSub(data,part1Output)
    console.log(Math.min(...arr) + Math.max(...arr))
});

// Part 1
const invalid = (nums, numsbefore = 25) => {
    nums = nums.map(n => +n)

    for ( let i= numsbefore; i <= nums.length; i++ ) {
        let hasSum = false;
        for ( let j = i - 1; j>= i - numsbefore; j-- ) {
            for ( let k = i - 2; k >= i - numsbefore; k-- ) {
                if ( nums[j] + nums[k] == nums[i]) {
                    hasSum = true;
                    break;
                }
            }
            if ( hasSum ) break;
        }
        if (!hasSum) return {
            line: i + 1,
            number: nums[i]
        }
    }
    return "SAD"
}

// Part 2
const findSub = (arr, sum) => {
    arr = arr.map(a=>+a)
    const required = [];
    for(let start = 0, end = 0, s = 0; end <= arr.length || s > sum ; ){
       if(s < sum){
          s += arr[end];
          end++;
       }else if(s > sum){
          s -= arr[start];
          start++;
       }else{
          required.push(arr.slice(start, end));
          s -= arr[start];
          s += arr[end];
          start++;
          end++;
       };
    };
    return required;
 };

// [ 633, 507622668 ]
