const fs = require("fs");

let input = fs.readFileSync('./input-1.txt')
                .toString()
                .split('\n')
                .map(s => s.replace(/\r$/,''))
                .filter(s => s.length > 0);

let fuel = [];
let sum = 0;

function computeFuel(data) {
    return Math.floor(data/3)-2;
}

input.forEach(ele => {
    let temp = computeFuel(ele);
    fuel.push(temp)
    while(computeFuel(temp) >0){
        temp = computeFuel(temp);
        fuel.push(temp);
    }
});

fuel.forEach(e=>{sum +=e})

console.log(`Result to part two ${sum}`);


