const fs = require("fs")

fs.readFile('input.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.split("\n")
    console.log(map1(data))
    console.log(map2(data,1,1) * map2(data,3,1) * map2(data,5,1) * map2(data,7,1) * map2(data,1,2))
});


// Part 1
const map1 = (map) => {
	let treeCount = 0;
	let index = 3;
	for ( let i = 1; i < map.length; i++ ) {
		const line = map[i];
		if (line[index % line.length] == "#") treeCount++;
		index += 3;
	}
	return treeCount;
}

// Part 2
const map2 = (map, right, down=1) => {
	let treeCount = 0;
	let index = right;
	for ( let i = down; i < map.length; i+= down ) {
		const line = map[i];
		if (line[index % line.length] == "#") treeCount++;
		index += right;
	}
	return treeCount;
}