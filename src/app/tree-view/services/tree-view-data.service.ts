import { EventEmitter, Injectable, Output } from '@angular/core';
import { TreeNode } from '../tree-node/tree-node.interface';

@Injectable()
export class TreeViewDataService {
  @Output() onAddNode = new EventEmitter();
  @Output() onRemoveNode = new EventEmitter();
  @Output() onSetDefaultNode = new EventEmitter();

  private _dataSource: Array<TreeNode> = [];

  set dataSource(value: Array<TreeNode>) {
    this._dataSource = value;
  }

  get dataSource() {
    return this._dataSource;
  }

  private _defaultNodeId: number | null = null;
  get defaultNodeId() {
    return this._defaultNodeId;
  }

  private _defaultNode: TreeNode | null = null;
  get defaultNode() {
    return this._defaultNode;
  }
  
  set defaultNode(value: TreeNode | null) {
    this._defaultNode = value;
    this._defaultNodeId = value?.id ?? null;
  }

  constructor() {}

  addNode(parentNode: TreeNode, childNode?: TreeNode): boolean {
    const add = (
      source: Array<TreeNode>,
      parentNode: TreeNode,
      childNode?: TreeNode
    ) => {
      if (!childNode) {
        source.push(parentNode);
      }

      if (parentNode.id === childNode?.parentId) {
        if (!parentNode.children) parentNode.children = [];
        parentNode.children.push(childNode);
        return true;
      }

      if (parentNode.children) {
        for (const child of parentNode?.children) {
          this.addNode(child, childNode);
        }
      }
      return false;
    };
    return add(this.dataSource, parentNode, childNode);
  }

  removeNodeById(nodeId: number): boolean {
    const remove = (source: Array<TreeNode>, nodeId: number) => {
      for (let index = 0; index < source.length; index++) {
        const node = source[index];

        if (node.id === nodeId) {
          source.splice(index, 1);
          return true;
        }

        if (node.children && node.children.length > 0) {
          if (remove(node.children, nodeId)) {
            return true;
          }
        }
      }
      return false;
    };
    return remove(this.dataSource, nodeId);
  }

  setDefaultNode(node: TreeNode): void {
    this.defaultNode = node;
  }

  transformToHierarchy(items: Array<any>) {
    const map: Record<string, any> = {};
    const result = [] as typeof items;

    items.forEach((item) => {
      item.children = [];
      map[item.id] = item;
      const parentId = item.parentId || null;

      if (!map[parentId]) {
        result.push(item);
      } else {
        map[parentId].children.push(item);
      }
    });

    return result;
  }
}
