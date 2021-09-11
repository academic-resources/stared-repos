//// Created by leananepari on 04/26/19. ////

// Suppose Andy and Doris want to choose a restaurant for dinner, and they both have a list of favorite restaurants represented by strings.

// You need to help them find out their common interest with the least list index sum. If there is a choice tie between answers, output all of them with no order requirement. You could assume there always exists an answer.

// Example 1:
// Input:
// ["Shogun", "Tapioca Express", "Burger King", "KFC"]
// ["Piatti", "The Grill at Torrey Pines", "Hungry Hunter Steakhouse", "Shogun"]
// Output: ["Shogun"]
// Explanation: The only restaurant they both like is "Shogun".


// /**
//  * @param {string[]} list1
//  * @param {string[]} list2
//  * @return {string[]}
//  */
var findRestaurant = function(list1, list2) {
  var min = -1;
  var word = '';
  var output = [];
  var storage = {};
  var tie = [];
  
  for (var i = 0; i < list1.length; i++) {
      storage[list1[i]] = i;
  }
  
  for (var i = 0; i < list2.length; i++) {
      if (storage.hasOwnProperty(list2[i])) {
          if (min === -1) {
              min = storage[list2[i]] + i;
              word = list2[i];
          } else if (storage[list2[i]] + i < min) {
                  min = storage[list2[i]] + i;
                  word = list2[i];
          } else if (storage[list2[i]] + i === min) {
              tie.push([list2[i], min]);
          }
      }
  }
  
  if (tie.length > 0) {
      for (var i = 0; i < tie.length; i++) {
          if (tie[i][1] === min) {
              output.push(tie[i][0]);
          }
      }
      output.push(word);
  } else {
      output.push(word);
  }
  
  return output;
  
};