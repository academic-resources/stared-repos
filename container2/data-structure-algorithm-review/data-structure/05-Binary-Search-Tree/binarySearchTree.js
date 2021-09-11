/**
 * Created by xliu on 6/30/2017.
 */
function Node(key, value){
    this.key = key;
    this.value = value;
    this.left = this.right = null;
}

function BST(){
    this.root = null;
    this.count = 0;
}

BST.prototype = {
    size: function(){
        return this.count;
    },
    isEmpty: function(){
        return this.count == 0;
    },
    insert: function(key, val){
        this.root = __insert(this.root, this.count, key, val);
    },
    contain: function(key){
        return __contain(this.root, key);
    },
    search: function (key) {
        return __search(this.root, key);
    },
    preOrder: function(key){
        return __preOrder(this.root);
    },
    inOrder: function(key){
        return __inOrder(this.root);
    },
    postOrder: function(key){
        return __postOrder(this.root);
    },
    levelOrder: function(){
        var queue = new Array();

        queue.add(this.root);

        while(!queue.empty()){
            var node = queue.pop();

            console.log(" " + node.key);

            if(node.left != null){
                queue.push(node.left);
            }
            if(node.right != null){
                queue.push(node.right);
            }

        }
    },
    minimum: function(){
        if(this.count != 0){
           var node = __minimum(this.root);
           return node.key;
        }
    },
    maximum: function(){
        if(this.count != 0){
            var node = __maximum(this.root);
            return node.key;
        }
    },
    removeMin: function () {
        if(this.root){
            this.root = __removeMin(this.root, this.count);
        }
    },
    removeMax: function () {
        if(this.root){
            this.root = __removeMax(this.root, this.count);
        }
    },
    remove: function (key) {
        this.root = __remove(this.root, key, this.count);
    }


}

function __insert(node, count, key, val){
    if(node == null){
        count++;
        return new Node(key, val);
    }
    if(key == node.key){
        node.value = val;
    }else if (key < node.key){
        node.left = __insert(node.left, count, key, val);
    }else{
        node.right = __insert(node.right, count, key, val);
    }

    return node;
}

function __insertNoRecursive(node, count, key, val){
    if(node == null){
        count++;
        return new Node(key, val);
    }

    while(node != null){
        if(key == node.key){
            node.value = val;
        }else if(node.key > key){
            node = node.left;
        }else{
            node = node.right;
        }
    }

    node = new Node(key, val);
    count++;
    return node;
}

function __contain(node, key){
    if(node == null){
        return false;
    }
    if(key == node.key){
        return true
    }else if(key < node.key){
        return __contain(node.left, key);
    }else{
        return __contain(node.right, key);
    }
}
//在以node为根的二叉搜索树中查找key所对应的value
function __search(node, key){
    if(node == null)
        return null;
    if(key == node.key){
        return node.value;
    }else if (key > node.key){
        return __search(node.right, key);
    }else{
        return __search(node.left, key);
    }
}

//previous order search
function __preOrder(node){
    if(node){
        console.log(" " + node.key);
        __preOrder(node.left);
        __preOrder(node.right);
    }
}
//intermediate order search
function __inOrder(node){
    if(node != null){
        __inOrder(node.left);
        console.log(" " + node.key);
        __inOrder(node.right);
    }
}

//post order search
function __postOrder(node){
    if(node != null){
        __postOrder(node.left);
        __postOrder(node.right);
        console.log(" " + node.key);
    }
}

function __minimum(node){
    if(node.key == null){
        return node;
    }
    return __minimum(node.left);
}

function __maximum(node){
    if(node.key == null){
        return node;
    }
    return __minimum(node.right);
}

function __removeMin(node, count){
    if(node.left == null){
        var nodeRight = node.right;
        count--;
        return nodeRight;
    }

    node.left = __removeMin(node.left, count);
    return node;
}

function __removeMax(node, count){
    if(node.right == null){
        var nodeleft = node.left;
        count--;
        return nodeleft;
    }

    node.right = __removeMin(node.right, count);
    return node;
}

function  __remove(node, key, count) {
    if(node == null){
        return null;
    }

    if(node.key < key){
        node.right = __remove(node.right, key, count);
    }else if(node.key > key){
        node.left = __remove(node.left, key, count);
        return node;
    }else{
        // key == node.key

        if(node.left == null){
            var rightNode = node.right;
            count--;
            return rightNode;
        }

        if(node.right == null){
            var leftNode = node.left;
            count--;
            return leftNode;
        }

        var successor = __minimum(node.right);
        successor.right = __removeMin(node.right);
        successor.left = node.left;
        count--;
        return successor;
    }
}


