const fs = require("fs")

fs.readFile('input.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.split("\n")
    console.log(validPasswords1(data))
    console.log(validPasswords2(data))
});


// Part 1
const validPasswords1 = (passwords) => {
	return passwords.filter(password => {
		const pass = password.split(" ")
		const key = pass[1].replace(":","")
		const [ min, max ] = pass[0].split("-")
        
        const count = pass[2].split("").reduce((acc,p) => {
            if (p == key) acc++
            return acc
        },0)
        if (count >= min && count <= max) return true
		return false
	}).length
}

// Part 2
const validPasswords2 = (passwords) => {
	return passwords.filter(password => {
		const pass = password.split(" ")
		const key = pass[1].replace(":","")
		const [ min, max ] = pass[0].split("-")

        const p = pass[2]
		if ( p[min-1] == key && p[max-1] !=key) {
			return true
		} else if ( p[max-1] == key && p[min-1] !=key) {
			return true
		}
		return false
	}).length
}