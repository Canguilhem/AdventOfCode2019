const fs = require("fs");

const input = fs.readFileSync('./input-3.txt')
                .toString()
                .split('\n')
                .filter(s => s.length > 0);

// const wire1 = input[0].split(',');
// const wire2 = input[1].split(',');

// EXAMPLES
const wire1 = ['R8','U5','L5','D3'];
const wire2 = ['U7','R6','D4','L4'];

// const wire1 = ['R75','D30',,'R83','U83','L12','D49','R71','U7','L72'];
// const wire2 = ['U62','R66','U55','R34','D71','R55','D58','R83'];

// [X, Y]
const origin = [0,0];

let X1 =0, Y1 =0;
let X2 =0, Y2 =0;

let segment_vertical1 = [];
let segment_horizontal1 = [];
let segment_vertical2 = [];
let segment_horizontal2 = [];

function followPath() {
    let steps1 = 0;
    let steps2 = 0;
    wire1.forEach(element => {
        let segment = {
            depart : [],
            arrivee : []
        }
        let orientation = '';
        segment.depart = [X1,Y1];
        let value = parseInt(element.substr(1));
        switch (element[0]) {
            case 'U':
                Y1 += value;
                orientation = 'V'

                break;
            case 'D':
                Y1 -= value;
                orientation = 'V'
                break;
            case 'R':
                X1 += value;
                orientation = 'H'
                break;
            case 'L':
                X1 -= value;
                orientation = 'H'
                break;
        }
        steps1 += value;
        segment.steps = steps1;
        segment.arrivee = [X1,Y1];
        segment.orientaion = orientation;
        orientation == 'H' ? segment_horizontal1.push(segment): segment_vertical1.push(segment); 
    });

    wire2.forEach(element => {
        let segment = {
            depart : [],
            arrivee : []
        }
        let orientation = '';
        segment.depart = [X2,Y2];
        let value = parseInt(element.substr(1));
        switch (element[0]) {
            case 'U':
                Y2 += value;
                orientation = 'V'

                break;
            case 'D':
                Y2 -= value;
                orientation = 'V'
                break;
            case 'R':
                X2 += value;
                orientation = 'H'
                break;
            case 'L':
                X2 -= value;
                orientation = 'H'
                break;
        }
        steps2 += value;
        segment.steps = steps2;
        segment.arrivee = [X2,Y2]
        segment.orientaion = orientation;
        orientation == 'H' ? segment_horizontal2.push(segment): segment_vertical2.push(segment); 
    });
}



/* Algo:
    1- store segments
    2- sort horizontal vs vertical segments
    3- compare horizontal_1 vs vertical_2
        is there a vertical segments that cross one of the horizontals
            Y2A < Y1 < Y2B
        is there a horizontal segments that cross one of the verticals
            X2A < X1 < X2B
*/



function findIntersect(horizontals,verticals){
    let intersect = [];
    for(let i=0; i < horizontals.length; i++){
        let ver;
        let horizon = horizontals[i].depart[1];
        let Xarr = horizontals[i].arrivee[0];
        let Xdep = horizontals[i].depart[0]
            // ordonné du point de départ > et du point d arrivé < ou l inverse 
        if(horizon != 0){
            ver = verticals.filter(element =>  (horizon < element.arrivee[1] && horizon > element.depart[1]) || (horizon > element.arrivee[1] && horizon < element.depart[1]) )
        }
        if(ver){
            ver.forEach(element => {
                let abs = element.depart[0]
                // console.log(`absciss: ${abs}, ordonate: ${horizon}`);
                if((Xdep < abs && Xarr > abs) || (Xdep > abs && Xarr < abs)){
                    intersect.push([abs, horizon]);
                }
            });
        }
    }
    return intersect;
}

function computeDistance(){
    let set1 = findIntersect(segment_horizontal1, segment_vertical2);
    let set2 = findIntersect(segment_horizontal2, segment_vertical1)
    let total = set1.concat(set2);
    let min = 100000;
    let temp = [];
    total.forEach(pt => {
        if(pt[0] + pt[1] < min){
            min = Math.abs(pt[0] + pt[1]);
            temp = pt
        }
    })
    return min;
}


followPath();
console.log(computeDistance());

// PART 2 Added steps
console.log(segment_horizontal1);

