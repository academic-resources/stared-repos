// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But in stead we're going to implement it from scratch:

function getElementsByClassName(searchClass) {
    var elements = document.getElementsByTagName('*');
        var elementsArray = new Array();
        for (i=0; i < elements.length; i++) {
            if (elements[i].getAttribute('class')) {
                elementsClass = elements[i].getAttribute('class').split(' ');
                for (j=0; j < elementsClass.length; j++) {
                    if (elementsClass[j].toLowerCase() == searchClass.toLowerCase()) {
                        elementsArray.push(elements[i]);
                    }
                }
            } 

        }
        return elementsArray;
}