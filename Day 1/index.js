const fs = require("fs")

fs.readFile('input.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.split("\n").map((d)=>+d)
    console.log(product1(data))
    console.log(product2(data))
});


// Part 1
const product1 = (nums) => {
    complements = []
	for(let i = 0; i < nums.length; i++) {
		compl = 2020 - nums[i];
		if (nums.includes(compl)) {
			return nums[i] * compl
		} else {
			complements.push(nums[i])
		}
	}
}

// Part 2
const product2 = (nums) => {
	for(let i =0; i < nums.length; i++) {
		for(let j =0; j < nums.length; j++) {
			for(let k =0; k < nums.length; k++) {
				if (nums[i] + nums[j] + nums[k] == 2020) return nums[i]*nums[j]*nums[k]
			}
		}
	}
}