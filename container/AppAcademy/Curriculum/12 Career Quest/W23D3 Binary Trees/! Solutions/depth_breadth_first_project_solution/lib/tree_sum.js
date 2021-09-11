function treeSum(root) {
    if (!root) return 0;

    return treeSum(root.left) + root.val + treeSum(root.right);
}


module.exports = {
    treeSum
};