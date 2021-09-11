package io.soumasish;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class FindLeavesOfBinaryTree {
    public class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;
        TreeNode(int x) {
            val = x;
        }
    }

    public List<List<Integer>> findLeaves(TreeNode root) {
        List<List<Integer>> answer = new ArrayList<>();
        if(root == null){
            return answer;
        }
        List<Integer> results;
        while(true){
            if(root.left == null & root.right == null){
                answer.add(new ArrayList<Integer>(Collections.singletonList(root.val)));
                break;
            }
            results = new ArrayList<>();
            helper(root, results);
            answer.add(results);
        }

        return answer;
    }
    private void helper(TreeNode root, List<Integer> results){
        if (root == null) return;
        if(root.left != null) {
            if (root.left.left == null && root.left.right == null) {
                results.add(root.left.val);
                root.left = null;
            }
        }
        if(root.right != null){
            if(root.right.left == null && root.right.right == null){
                results.add(root.right.val);
                root.right = null;
            }

        }
        helper(root.left, results);
        helper(root.right, results);
    }
}
