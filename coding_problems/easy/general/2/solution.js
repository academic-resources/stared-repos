import { rootCertificates } from "tls"

class BinaryTree {
  constructor (value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

function branchSums(root) {
  const sums = []

  depth_first_search(root, sums, 0)
  
  function depth_first_search(node, sums, current_sum) {
    const updatedSum = current_sum + node.value
      
    if (node.left) {
      depth_first_search(node.left, sums, updatedSum)
    }

    if (node.right) {
      depth_first_search(node.right, sums, updatedSum)
    }

    if (!(node.left || node.right)) {
      sums.push(updatedSum)
    }
  }

  return sums
}