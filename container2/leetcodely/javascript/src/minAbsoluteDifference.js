// Given a binary search tree with non-negative values, find the minimum absolute difference between values of any two nodes.

getMinimumDifference = root =>{
    let prev = Infinity;
    let diff = Infinity;
    let traverse = root => {
        if (!root) {
            return;
        }
        traverse(root.left);
        diff = Math.min(diff, Math.abs(root.val - prev));
        prev = root.val;
        traverse(root.right);
    };
    traverse(root);
    return diff;

};


