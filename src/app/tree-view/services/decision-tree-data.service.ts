import { EventEmitter, Injectable, Output } from '@angular/core';
import { TreeNodeOptions } from '../tree-node/tree-node.interface';

@Injectable()
export class DecisionTreeDataService {
  @Output() onAddNode = new EventEmitter();
  @Output() onRemoveNode = new EventEmitter();
  @Output() onSetDefaultNode = new EventEmitter();

  private _dataSource: Array<TreeNodeOptions> = [];

  set dataSource(value: Array<TreeNodeOptions>) {
    this._dataSource = value;
  }

  get dataSource() {
    return this._dataSource;
  }

  private _defaultNodeId: string | undefined = undefined;
  get defaultNodeId() {
    return this._defaultNodeId;
  }

  private _defaultNode: TreeNodeOptions | null = null;
  get defaultNode() {
    return this._defaultNode;
  }
  
  set defaultNode(value: TreeNodeOptions | null) {
    this._defaultNode = value;
    this._defaultNodeId = value?.key;
  }

  constructor() {}

  addNode(parentNode: TreeNodeOptions, childNode?: TreeNodeOptions): boolean {
    return false;
  }

  removeNodeByKey(key: string): boolean {
    return false;
  }

  setDefaultNode(node: TreeNodeOptions): void {
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
