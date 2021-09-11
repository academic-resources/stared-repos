function depthFirstSearch(root, targetVal) {
    let stack = [ root ]

    while(stack.length) {
        let node = stack.pop()

        if (node.val === targetVal) return node

        if (node.right) stack.push(node.right)
        if (node.left) stack.push(node.left)
    }
    return null

    // NOT WORKING
    // if (!root) return null
    // if (root.val === targetVal) return root
    // depthFirstSearch(root.left, targetVal)
    // depthFirstSearch(root.right, targetVal)
}



module.exports = {
    depthFirstSearch
};