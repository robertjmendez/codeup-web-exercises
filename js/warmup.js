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

})();

