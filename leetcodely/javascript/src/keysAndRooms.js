//// Created by leananepari on 05/08/19. ////


// /**
//  * @param {number[][]} rooms
//  * @return {boolean}
//  */
const canVisitAllRooms = (rooms) => {
  let roomsMap = {};
  
  for (let i = 0; i < rooms.length; i++) {
      roomsMap[i] = false;
  }
  
  const traverse = (node, i) => {
      roomsMap[i] = true;
      for (let i = 0; i < node.length; i++) {
          if (roomsMap[node[i]] === false) {
            traverse(rooms[node[i]], node[i]);
          }
      }
  }
  
  traverse(rooms[0], 0);
  
  for (let key in roomsMap) {
      if (roomsMap[key] === false) {
          return false;
      }
  }
  
  return true;
};