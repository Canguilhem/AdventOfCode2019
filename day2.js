const fs = require("fs");

let inputCopy = [];
const input = fs.readFileSync('./input-2.txt')
                .toString()
                .split(',')
                .map(s => s.replace(/\r$/,''))
                .filter(s => s.length > 0);
input.forEach(e => {
    inputCopy.push(parseInt(e));
});

function intCode(subArr){
    let valA = inputCopy[subArr[1]];
    let valB = inputCopy[subArr[2]];

    if(subArr[0] === 1){
        inputCopy[subArr[3]] = valA + valB;
    }else if( subArr[0] === 2){
        inputCopy[subArr[3]] =  valA * valB;
    }
};

function run(){
    console.log(`${inputCopy[1]} - ${inputCopy[2]}`)
    for(let i = 0; i < inputCopy.length; i+=4){
        if(inputCopy[i] === 99){
            break;
        }
        intCode(inputCopy.slice(i, i+4));
    }
};
let noun = 12;
let verb = 2;
 inputCopy[1] = noun;
 inputCopy[2] = verb;

run();
console.log(inputCopy[0]);

inputCopy = [];
input.forEach(e => {
    inputCopy.push(parseInt(e));
});

const desiredRes = 19690720;


// incrementing noun : 490656 874657 1258657 1642657
// incrementing verb just increment by one total
function brute(){
    // for(let noun = 0; noun < 100; noun++ ){
    //     for(let verb = 0; verb < 100; verb++ ){
            inputCopy[1] = 50;
            inputCopy[2] = 64;
            run();
            console.log(inputCopy[0]);
            if(inputCopy[0] === desiredRes){
                console.log(`noun : ${noun}; \n verb: ${verb}`);
                console.log(`result : ${100 * noun + verb}`)
                // break;
            }
    //     }
    // }
}

brute();