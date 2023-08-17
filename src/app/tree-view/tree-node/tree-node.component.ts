import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { TreeNode } from '../tree-node.interface';
import { TreeViewComponent } from '../tree-view.component';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
})
export class TreeNodeComponent implements OnInit {
  @Input() node!: TreeNode;

  treeView: TreeViewComponent;

  constructor(private _injector: Injector) {
    this.treeView = this._injector.get<TreeViewComponent>(TreeViewComponent);
  }

  ngOnInit(): void {}

  onRemoveNode(nodeId: number) {
    this.treeView.removeNodeById(nodeId, this.treeView.dataSource);
  }

  addChildNode(node: TreeNode) {
    const newNode = {
      id: node.id * 11,
      name: 'new Node',
      parentId: node.id,
    };
    this.treeView.addNode(node, newNode);
  }

  setNodeDefault(nodeId: number) {
    this.treeView.setDefaultNode(nodeId);
  }
}
