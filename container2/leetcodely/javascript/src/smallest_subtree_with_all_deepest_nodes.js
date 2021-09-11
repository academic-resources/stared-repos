const subtreeWithAllDeepest = root => {

};

const lca = (root, p, q) =>{
    if(!root){
        return null;
    }
    if(root === p || root === q){
        return root;
    }
    const left = this.lca(root.left, p, q);
    const right = this.lca(root.right, p, q);

    if(left && right){
        return root;
    }
    if(left) return left;
    else return right;
};