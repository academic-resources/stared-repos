const bubbleSort = (list) => {
    let swapped = true;
    while (swapped) {
        swapped = false;
        for (let index = 0; index < list.size() - 1; index++) {
            if (list.get(index).value > list.get(index + 1).value) {
                list.swap(index, index + 1);
                swapped = true;
            }
        }
    }
    return list;
}

module.exports = {
    bubbleSort
}
