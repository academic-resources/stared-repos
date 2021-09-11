//// Created by leananepari on 05/08/19. ////

// /**
//  * @param {number} N
//  * @param {number[][]} trust
//  * @return {number}
//  */
const findJudge = (N, trust) => {
  let hashMap = {};
  let judge = [];
  
  for (let i = 1; i <= N; i++) {
      hashMap[i] = [];
      judge.push(i);
  }
      
  for (let i = 0; i < trust.length; i++) {
      if (hashMap[trust[i][0]]) {
          hashMap[trust[i][0]].push(trust[i][1]);
          if (judge.includes(trust[i][0])) {
            judge.splice(judge.indexOf(trust[i][0]), 1);
          }
      }
  }
  
  if (judge.length === 0) {
      return -1;
  } else {
      for (let key in hashMap) {
          if (key !== judge[0].toString() && !hashMap[key].includes(judge[0])) {
              return -1;
          }
      }
  }
  return judge[0];
};