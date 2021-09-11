rangeSumBST = (root, L, R) => {
    let total = 0;

    const traverse = root =>{
        if(!root){
            return;
        }
        traverse(root.left);
        if(root.val >= L && root.val <= R){
            total += root.val;
        }
        traverse(root.right);
    };
    traverse(root);
    return total;

};