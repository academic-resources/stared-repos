// An array is monotonic if it is either monotone increasing or monotone decreasing.
// An array A is monotone increasing if for all i <= j, A[i] <= A[j].  An array A is monotone decreasing if for all i <= j, A[i] >= A[j].
// Return true if and only if the given array A is monotonic.

isMonotonic = A => {
   let d = 0;

    for(let i=1; i< A.length; i++){

        if(A[i] < A[i-1] && d >= 0) d = 1;
        else if(A[i] > A[i-1] && d <= 0) d = -1;
        else return false
    }
    return true

};
const A = [6,5,4,4];
console.log(isMonotonic(A));