import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TreeNode } from '../tree-node.interface';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
})
export class TreeNodeComponent implements OnInit {
  @Input() node!: TreeNode;

  @Output() addNode = new EventEmitter<TreeNode>();
  @Output() removeNode = new EventEmitter<number>();

  defaultNodeId: string | number | null = null;

  constructor() {}

  ngOnInit(): void {}

  onRemoveNode(nodeId: number) {
    this.removeNode.emit(nodeId);
  }

  onAddNode(node: TreeNode) {
    this.addNode.emit(node);
  }

  setNodeDefault(e: Event) {
    const target = e.target as HTMLInputElement;
    console.log('default nodeId', target?.value);
  }
}
