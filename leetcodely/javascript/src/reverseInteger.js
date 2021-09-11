/*Given a 32-bit signed integer, reverse digits of an integer.*/

const reverse = x => {
    if(x === 0) {
        return 0;
    }

    let a = [...x.toString()];
    let arr;
    if(a[0] === '-'){
        arr = a.slice(1).reverse();
        arr.unshift('-')
        console.log(arr);

    }else if(a[0] === '0'){
        arr = a.slice(1).reverse();
    }else{
        arr = a.reverse()
    }
    const res = parseInt(arr.join(''));
    if(res > 2147483648 || res < -2147483648){
        return 0;
    }else{
        return res;
    }

};
console.log(reverse(-123));