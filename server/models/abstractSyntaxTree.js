class Node {
  constructor(data, left = null, right = null, parent = null) {
    this.data = data;
    this.left = left;
    this.right = right;
    this.parent = parent;
  }
}

class AbstractSyntaxTree {

  constructor(data) {
    const newNode = new Node(data);
    this.root = newNode;
  }

  insert(node, data) {
    const newNode = new Node(data, null, null, node);
    if (node.left === null) {
      node.left = newNode;
    } else {
      node.right = newNode;
    }
    return (node == null ? this.root : newNode);
  }

  print(node, resultCode) {
    if (node == null) return;

    this.print(node.left, resultCode);
    if(this.root.data != node.data) {
      resultCode.data += node.data;
    }
    this.print(node.right, resultCode);
  }
}

module.exports = {Node, AbstractSyntaxTree};
