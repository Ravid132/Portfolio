// var gNums = [1, 2, 3, 4, 5, 6, 7]

// shuffle(gNums)
// console.log('gNums:', gNums)

// var num = drawNum();
// console.log('Num is:', num);
// console.log('gNums:', gNums)
// num = drawNum();
// console.log('Num is:', num);
// console.log('gNums:', gNums)

// function drawNum() {
//     return gNums.pop()
// }

// function shuffle(items) {
//     var randIdx, keep, i;
//     for (i = items.length - 1; i > 0; i--) {
//         randIdx = getRandomInt(0, items.length);

//         keep = items[i];
//         items[i] = items[randIdx];
//         items[randIdx] = keep;
//     }
//     return items;
// }

///////////////////////////////////////////////////////////////////////////////

// var gNums2 = [1, 2, 3, 4, 5, 6, 7]
// console.log('gNums2', gNums2)

// var num = drawNum2()
// console.log('Num is:', num)
// console.log('gNums2', gNums2)

function drawNum2(nums) {
    var idx = getRandomInt(0, nums.length)
    var num = nums[idx]
    nums.splice(idx, 1)
    return num
}


/////////////////////////////////////////////////////////////////////////////////

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is inclusive and the minimum is inclusive 
}