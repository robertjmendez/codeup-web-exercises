(function () {
    "use strict";
    // 04/27/2023 (Thursday) ------------------------------------
    function returnSeven() {
        return 7;
    }

    console.log(returnSeven());

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

    // 05/02/2023 (Tuesday) --------------------------------------

})();

