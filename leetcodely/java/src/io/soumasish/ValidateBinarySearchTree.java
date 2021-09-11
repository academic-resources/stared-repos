package io.soumasish;

public class ValidateBinarySearchTree {

    private class TreeNode{
        int val;
        TreeNode left;
        TreeNode right;
        TreeNode(int x){ val = x;}
    }
    public boolean isValidBST(TreeNode root) {

        return helper(root, Integer.MIN_VALUE, Integer.MAX_VALUE);
    }
    private boolean helper(TreeNode p, Integer minKey, Integer maxKey){
        if(p == null) return true;
        if(p.val <= minKey || p.val  >= maxKey) return false;
        return helper(p.left, minKey , p.val) && helper(p.right, p.val, maxKey);

    }
}
