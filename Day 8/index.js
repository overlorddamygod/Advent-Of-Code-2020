const fs = require("fs")

fs.readFile('input.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.split("\n")

    // Part 1
    console.log(val(data, false, false))
    
    // Part 2
    console.log(brute(data))
});

const parse = (instructions) => {
    return instructions.map((inst) => {
        const [ op, arg ] = inst.split(" ")
        return {
            op,
            arg,
            count: 0
        }
    })
}

// Part 2
const val = (instructions, parsed = true, map = true) => {
    if ( map ) {
        instructions = instructions.map(i => {
            i["count"] = 0
            return i
        })
    }
    if ( !parsed ) instructions =  parse(instructions)

    let acc = 0;
    let address = 0;
    while ( address < instructions.length ) {
        const instruction = instructions[address];
        // console.log(instruction["op"],+instruction["arg"],instruction["count"])
        if ( instruction["count"] == 1 ) return [acc, false]
        switch ( instruction["op"] ) {
            case "nop":
                address++;
                break;
            case "acc":
                acc += +instruction["arg"]
                address++;
                break;
            case "jmp":
                address += +instruction["arg"]
                break;
        }
        if (address == instructions.length) {
            return [acc, true]
        }
        instruction["count"] += 1
    }
}

const brute = (data) => {
    parsed = parse(data)

    for ( let i = 0; i < parsed.length; i++ ) {
        if (parsed[i]["op"] == "nop") {
            parsed[i]["op"] = "jmp"
            let _val = val(parsed)
            parsed[i]["op"] = "nop"
            if (_val[1]) return [_val,i]
        }
        else if (parsed[i]["op"] == "jmp") {
            parsed[i]["op"] = "nop"
            let _val = val(parsed)
            parsed[i]["op"] = "jmp"
            if (_val[1]) return [_val,i]
        }
        else continue;
    }
    return false
}