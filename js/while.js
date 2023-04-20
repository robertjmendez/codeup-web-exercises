"use strict";

// 1. Create a while loop that uses console.log() to create the output shown below.
// 2
// 4
// 8
// 16
// 32
// 64
// 128
// 256
// 512
// 1024
// 2048
// 4096
// 8192
// 16384
// 32768
// 65536

let i = 1;
while (i <= 32768) {
    console.log(i * 2);
    i *= 2;
}

// 2. An ice cream seller can't go home until she sells all of her cones. First write enough code that generates a random number
// between 50 and 100 representing the amount of cones to sell before you start your loop. Inside of the loop your code should
// generate another random number between 1 and 5, simulating the amount of cones being bought by her clients.
// Use a do-while loop to log to the console the amount of cones sold to each person. The below code shows how to get the random numbers for this exercise.

// The output should be similar to the following:
// 5 cones sold...  // if there are enough cones
// Cannot sell you 6 cones I only have 3...  // If there are not enough cones
// Yay! I sold them all! // If there are no more cones

let allCones = Math.floor(Math.random() * 50) + 50;
let customersOrder;

do {
    customersOrder = Math.floor(Math.random() * 5) + 1;
    if (customersOrder <= allCones) {
        console.log(customersOrder + " cones sold");
        allCones -= customersOrder;
    }
    else {
        console.log("I cannot sell you " + customersOrder + " I only have " + allCones);
    }
} while(allCones > 0);
console.log("Yay! I sold them all!");

