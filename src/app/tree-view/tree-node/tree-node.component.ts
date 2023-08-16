import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
})
export class TreeNodeComponent implements OnInit {
  @Input() node: any = null;

  defaultNodeId: string | number | null = null;

  constructor() {}

  ngOnInit(): void {}

  defaultNodeChange(nodeId: typeof this.defaultNodeId) {
    console.log(nodeId);
  }
}
