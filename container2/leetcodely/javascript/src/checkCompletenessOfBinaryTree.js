const isCompleteTree = root => {
    const queue = [root];
    let isLast = false;

    while (queue.length > 0) {
        const node = queue.shift();

        if (node.left) {
            if (isLast) return false;
            queue.push(node.left);
        } else {
            isLast = true;
        }

        if (node.right) {
            if (isLast) return false;
            queue.push(node.right);
        } else {
            isLast = true;
        }
    }

    return true;
};