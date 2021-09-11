const insertionSort = (list) => {
    console.log(list.size())
    for (let i = 1; i < list.size() - 1; i++) {
        console.log(i);
        let valueToInsert;
        if (list.get(i)) {
            valueToInsert = list.get(i).value;
        }
        let holeToInsert = i - 1;
        while (holeToInsert >= 0) {
            if (list.get(holeToInsert).value > valueToInsert) {
                list.remove(i);
                list.insertAt(holeToInsert, valueToInsert);
            }
            holeToInsert--;
        }
    }
    return list;
}

module.exports = {
    insertionSort
}
