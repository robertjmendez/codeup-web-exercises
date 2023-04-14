"use strict"
console.log("Hello from external JavaScript");

let usersFavColor = prompt("What is your favorite color?");
alert(`Great, ${usersFavColor} is my favorite color too! `);

function getValidNumber(promptMessage) {
    let input;
    
    do {
        input = parseInt(prompt(promptMessage));
    }
    while (isNaN(input));
    
    return input;
}

function getValidYesNo(promptMessage) {
    let input;
    
    do {
        input = prompt(promptMessage).toLowerCase();
    }
    while (input !== "yes" && input !== "no");
    
    return input;
}

//  Problem 1
alert("This is exercise 3 problem 1");

let pricePerDay = 3;
let theLittleMermaid = getValidNumber("How many days would you like to rent The Little Mermaid for?");
let brotherBear = getValidNumber("How many days would you like to rent Brother Bear for?");
let hercules = getValidNumber("How many days would you like to rent Hercules for?");

alert("The total amount for the rentals will be $" + (theLittleMermaid + brotherBear + hercules) * pricePerDay);

//  Problem 2
alert("This is exercise 3 problem 2");

let googlePay = 400;
let amazonPay = 380;
let facebookPay = 350;

let googleHours = getValidNumber("How many hours did you work at Google this week?");
let amazonHours = getValidNumber("How many hours did you work at Amazon this week?");
let facebookHours = getValidNumber("How many hours did you work at Facebook this week?");

alert("Your total compensation for this week is $" + ((googlePay * googleHours) + (amazonPay * amazonHours) + (facebookPay * facebookHours)));

// Problem 3
alert("This is exercise 3 problem 3");

let classFull = getValidYesNo("Is the class full? (yes/no)");
let classConflictSchedule = getValidYesNo("Does the class conflict with your schedule? (yes/no)");

if (classFull == "no" && classConflictSchedule == "no") {
    alert("You can enroll in the class!");
}
else {
    alert("You can't enroll in the class");
}

// Problem 4
alert("This is exercise 3 problem 4");

let premiumMember = getValidYesNo("Are you a premium member? (yes/no)");
let numItem = getValidNumber("How many items did you purchase?");

if (premiumMember == "yes" || numItem > 2) {
    alert("A product offer has been applied to your checkout!");
}
else {
    alert("You do not qualify for a product offer");
}






