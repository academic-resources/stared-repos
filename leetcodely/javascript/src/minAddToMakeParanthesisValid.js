const minAddToMakeValid = S => {
    const stack = [];
    let count = 0;
    [...S].map((c) => {
        if(c === '('){
            stack.push(c);
        }
        else if(c === ')' && stack[stack.length -1] === '('){
            stack.pop();
        }
        else{
            count ++;
        }
    });
    return count + stack.length;

};
const S = "())";
console.log(minAddToMakeValid(S));