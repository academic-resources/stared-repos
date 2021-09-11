isAlienSorted = (words, order) => {
    order = " " + order;
    for(let i=1; i < words.length; i++){
        let prev = words[i-1] + " ";
        let curr = words[i] + " ";
        let minLen = Math.min(prev.length, curr.length);
        for(let j=0; j<minLen; j++){
           const cp = prev.charAt(j);
           const cc = curr.charAt(j);
           if(cp !== cc){
               if(order.indexOf(cp) > order.indexOf(cc)){
                   return false;
               }
               break;
           }
        }
    }
    return true;

};