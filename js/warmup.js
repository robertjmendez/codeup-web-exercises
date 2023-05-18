(function () {
    "use strict";
    // 04/27/2023 (Thursday) ------------------------------------

    function returnSeven() {
        return 7;
    }

    console.log(returnSeven());
    console.log("--------------------------");

    // 05/01/2023 (Monday) --------------------------------------

    function findFactors(num) {
        if (typeof num !== "number") {
            return false;
        }

        let factors = [];
        for (let i = 1; i <= num; i++) {
            if (num % i === 0) {
                factors.push(i);
            }
        }
        return factors;
    }

    console.log(findFactors(6)); // returns [1,2,3,6];
    console.log(findFactors(16)); // returns [1,2,4,8,16];
    console.log(findFactors(0)); // returns [];
    console.log(findFactors(true)); // returns false;
    console.log(findFactors("13")); // returns false;
    console.log(findFactors([54, 72, 144])); // returns false;
    console.log(findFactors({value: 64})); // returns false;
    console.log(findFactors()); // returns false;

    console.log("--------------------------");

    // 05/02/2023 (Tuesday) --------------------------------------

    function countEs(string) {
        if (typeof string !== "string") {
            return false;
        }

        let count = 0;
        for (let i = 0; i < string.length; i++) {
            if (string[i].toLowerCase() === "e") {
                count++;
            }
        }
        return count;
    }

    console.log(countEs("Ease")); // returns 2;
    console.log(countEs("teleconference")); // returns 5;
    console.log(countEs("TOM")); // returns 0;
    console.log(countEs(true)); // returns false;
    console.log(countEs(['e', 'E'])); // returns false;
    console.log(countEs()); // returns false;

    console.log("--------------------------");

    // 05/03/2023 (Wednesday) --------------------------------------

    function containsE(string) {
        if (typeof string !== "string") {
            return false;
        }
        // one way to do it with less code
        return string.toLowerCase().includes('e');

        // Another way to do it without changing much code from the previous exercise
        // let count = 0;
        // for (let i = 0; i < string.length; i++) {
        //     if (string[i].toLowerCase() === "e") {
        //         count++
        //     }
        // }
        // return count >= 1;
    }

    console.log(containsE("Ease")); // returns true;
    console.log(containsE("teleconference")); // returns true;
    console.log(containsE("TOM")); // returns False;
    console.log(containsE(true)); // returns false;
    console.log(containsE(['e', 'E'])); // returns false;
    console.log(containsE()); // returns false;

    console.log("--------------------------");

    // 05/04/2023 (Thursday) --------------------------------------

    function fizzBuzz() {
        for (let i = 1; i <= 100; i++) {
            if (i % 3 === 0 && i % 5 === 0) {
                console.log("fizzBuzz");
                continue;
            }
           else if (i % 3 === 0) {
                console.log("fizz");
                continue;
            }
            else if (i % 5 === 0) {
                console.log("buzz");
                continue;
            }

            console.log(i);
        }
    }

    fizzBuzz();

    console.log("--------------------------");

    // 05/05/2023 (Friday) --------------------------------------

    // Create a do-while loop that starts at 2, and displays the number squared on each line while the number is less than 1,000,000. Output should equal:
    //     2
    // 4
    // 16
    // 256
    // 65536

    let num = 2;
    do {
        console.log(num);
        num *= num;
    } while (num < 1000000)

    console.log("--------------------------");

    // 05/10/2023 (Wednesday) --------------------------------------

    function addEmUp(arr) {
        if (Array.isArray(arr)) {
            let sum = 0
            for (let i = 0; i < arr.length; i++) {
                sum+= arr[i];
            }
            return sum;
        }
    }

    console.log(addEmUp([2,6,19])); // returns 27
    console.log(addEmUp([-99, 180, -5])); // returns 76
    console.log(addEmUp([44,10,7])); // returns 61
    console.log(addEmUp([-100])); // returns -100
    console.log(addEmUp([1,2,3,4,5,6,7,8,9,10])); // returns 55
    console.log(addEmUp([-13, -92, -3500])) // returns -3605

    console.log("--------------------------");

    // 05/11/2023 (Thursday) --------------------------------------

    function isEven(string) {
        if (string.length % 2 === 0) {
            return true;
        }
        else {
            return false;
        }
    }

    function explainString(string) {
        let number = countEs(string);
        let even = isEven(string);

        return {
            string: string,
            numberOfEs: number,
            isEvenLength: even
        }
    }

    console.log(explainString("cheese")); // returns {string: "cheese", numberOfEs: 3, isEvenLength: true}
    console.log(explainString("dog")); // returns {string: "dog", numberOfEs: 0, isEvenLength: false}


    console.log("--------------------------");


    // 05/12/2023 (Friday) --------------------------------------

    const hamsters = [
        {
            name: "Hamtaro",
            heightInMM: 86,
            fur: ['orange', 'white'],
            gender: "male",
            dateOfBirth: "August 6"
        } , {
            name: "Bijou",
            heightInMM: 75,
            fur: ['white'],
            gender: "female",
            dateOfBirth: "July 10"
        } , {
            name: "Oxnard",
            heightInMM: 100,
            fur: ['grey', 'white'],
            gender: "male",
            dateOfBirth: "May 3"
        } , {
            name: "Boss",
            heightInMM: 120,
            fur: ['brown', 'white'],
            gender: "male",
            dateOfBirth: "September 21"
        } , {
            name: "Snoozer",
            heightInMM: 85,
            fur: ['brown', 'white', "pink"],
            gender: "male",
            dateOfBirth: "January 14"
        }
    ];
    function extractNames(arr) {
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
            newArr.push(arr[i].name)
        }
        return newArr;
    }

    console.log(extractNames(hamsters)); // returns ["Hamtaro", "Bijou", "Oxnard", "Boss", "Snoozer"];

    console.log("--------------------------");


    // 05/15/2023 (Monday) --------------------------------------
    function getTallest(arr) {
        let tallest = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].heightInMM > tallest.heightInMM) {
                tallest = arr[i];
            }
        }
        return tallest;
    }

    console.log(getTallest(hamsters)); // returns {name: "Boss", heightInMM: 120, fur: ['brown', 'white'], gender: "male", dateOfBirth: "September 21"}

    console.log("--------------------------");


    // 05/16/2023 (Tuesday) --------------------------------------

    function singleFurColor(arr) {
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].fur.length === 1) {
                newArr.push(arr[i])
            }
        }
        return newArr;
    }

    console.log(singleFurColor(hamsters)); // returns [{name: "Bijou", heightInMM: 75, fur: ['white'], gender: "female", dateOfBirth: "July 10"}];

    console.log("--------------------------");

    // 05/17/2023 (Wednesday) --------------------------------------

    function mostColorful(arr) {
        let mostColorful = arr[0]
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].fur.length > mostColorful.fur.length) {
                mostColorful = arr[i];
            }
        }
        return mostColorful;
    }

    console.log(mostColorful(hamsters)); // returns {name: "Snoozer", heightInMM: 85, fur: ['brown', 'white', "pink"], gender: "male", dateOfBirth: "January 14"};

    console.log("--------------------------");

    // 05/18/2023 (Thursday) --------------------------------------

    function describeNumber(num) {
        let evnOrOdd = (num % 2 === 0) ? 'even' : 'odd';
        let numDigits = num.toString().length;
        let factor = [];
        for (let i = 1; i <= num; i++) {
            if (num % i === 0) {
                factor.push(i);
            }
        }
        return {
            number: num,
            evenOrOdd: evnOrOdd,
            factors: factor,
            numberOfDigits: numDigits
        }
    }

    console.log(describeNumber(19)); // returns {number: 19, evenOrOdd: "odd", factors: [1,19], numberOfDigits: 2};
    console.log(describeNumber(2)); // returns {number: 2, evenOrOdd: "even", factors: [1,2], numberOfDigits: 1};

    console.log("--------------------------");

    // 05/19/2023 (Friday) --------------------------------------

})();

