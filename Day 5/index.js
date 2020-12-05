const fs = require("fs")

fs.readFile('input.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.split("\n")

    // Part 1 
    const seatIds = data.map(seatId)
    console.log(Math.max(...seatIds))

    // Part 2
    let sortedSeatIds = seatIds.sort((a,b)=>a-b)

    for (var i = sortedSeatIds[0]; i <= sortedSeatIds[sortedSeatIds.length-1]; i++) {
        if (sortedSeatIds.indexOf(i) == -1) {
          console.log(i)
          break;
        }
      }      
});

// Part 1
const seatId = (seat) => {
    let minRow = 0
    let maxRow = 127
    let minCol = 0
    let maxCol = 7
    for ( s of seat ) {
        // console.log(`${s}`)
        if ( s == "F" ) {
            maxRow = Math.floor((minRow + maxRow )/ 2)
            // console.log(`${minRow} ${maxRow}`)
        } else if ( s == "B" ) {
            minRow = Math.ceil((minRow + maxRow )/ 2)
            // console.log(`${minRow} ${maxRow}`)
        } else if ( s == "L" ) {
            maxCol = Math.floor((minCol + maxCol )/ 2)
            // console.log(`${minCol} ${maxCol}`)
        }  else if ( s == "R" ) {
            minCol = Math.ceil((minCol + maxCol )/ 2)
            // console.log(`${minCol} ${maxCol}`)
        } 
    }
    return minRow * 8 + minCol
}