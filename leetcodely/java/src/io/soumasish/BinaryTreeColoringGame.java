package io.soumasish;

import apple.laf.JRSUIUtils;

public class BinaryTreeColoringGame {
    public class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;
        TreeNode(int x) {
            val = x;
        }
    }
    // Two cases
    //Case 1: Either of x's subtree is greater than n/2, then y chooses x's child and wins
    //Case 2: The total size of x and it's subtree is less than n/2, the y chooses x's parent and wins
    public boolean btreeGameWinningMove(TreeNode root, int n, int x) {
        TreeNode target = findNode(root, x);
        int count = countNode(target);
        int countLeft = countNode(target.left);
        int countRight = countNode(target.right);
        if (n - count >n/2 || countLeft > n/2 || countRight > n/2) return true;
        return false;

    }

    private int countNode(TreeNode root){
        if(root ==null){
            return 0;
        }
        int left = countNode(root.left);
        int right = countNode(root.right);
        return left + right + 1;

    }

    private TreeNode findNode(TreeNode root, int x){
        if(root == null) return null;
        if(root.val == x) return root;
        TreeNode left = findNode(root.left, x);
        TreeNode right = findNode(root.right, x);
        return left != null ? left : right;
    }

}
