const toGoatLatin = S =>{
    const result = [];
    let curr;
    S.split(" ").map((word, index) => {
        if(!isVowel(word.charAt(0))) {
            curr = word.substr(1) + word[0];

        }else{
            curr = word;
        }

        curr += 'maa';
        curr += 'a'.repeat(index);
        console.log(curr);
        result.push(curr)

    });
    return result.join(" ");

};

const isVowel = (c =>{
    if(c === 'a' || c === 'A' || c === 'e' || c === 'E' || c === 'i' || c === 'I' || c === 'o' || c === 'O' || c === 'u' || c === 'U'){
        return true;
    }

});

const S = "I speak Goat Latin";
console.log(toGoatLatin(S));

