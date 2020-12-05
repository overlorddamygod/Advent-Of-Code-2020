const fs = require("fs")

fs.readFile('input.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    // data = data.split("\n").reduce(([acc,index],d)=>{
    //     if (d != "") acc[index] = acc[index] ? acc[index] + " " +d : d;
    //     else {
    //         index++;
    //     }
    //     return [acc,index]
    // },[[],0])
    data = data.split(/\n\n/gm)

    console.log(data)
    console.log(validPassports2(data))
});

// Part 1
const validPassports1 = (passports) => {
    const matches = ["byr","iyr","eyr","hgt","hcl","ecl","pid"]

    return passports.filter(passport => {
        for ( m of matches ) {
            const match = passport.match(m);
            if (!match) return false;
        }
        return true
    }).length
}

// Part 2
const validPassports2 = (passports) => {
    const matches = ["byr:([0-9]{4})","iyr:([0-9]{4})","eyr:([0-9]{4})","hgt:([0-9]+)(cm|in)","hcl:#[0-9a-f]{6}","ecl:(amb|blu|brn|gry|grn|hzl|oth)","pid:([0-9]{9})"]

    return passports.filter(passport => {
        let index = 0;
        for ( m of matches ) {
            // console.log(index)
            const match = passport.match(m);
            // console.log(match)
            if (!match) return false;
            switch (index) {
                case 0:
                    if ( +match[1]<1920 || +match[1] > 2020) return false
                    break;
                case 1:
                    if ( +match[1]<2010 || +match[1] > 2020) return false
                    break;
                case 2:
                    if ( +match[1]<2020 || +match[1] > 2030)  return false
                    break;
                case 3:
                    if (match[2] == "cm") if ( +match[1]<150 || +match[1] > 193) return false
                    if (match[2] == "in") if ( +match[1]<59 || +match[1] > 76) return false
                    break;
                case 6:
                    // console.log(match[1])
                    break;
                default:
                    break;
            }
            index++;
        }
        return true
    }).length
}