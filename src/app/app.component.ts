import { Component, ViewChild } from '@angular/core';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { TreeNode } from './tree-view/tree-node.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  @ViewChild(TreeViewComponent) treeViewRef: TreeViewComponent | undefined;

  title = 'angular-tree-view';

  data: Array<TreeNode> = [
    {
      id: 111,
      name: 'Node 1.1.1',
      parentId: 11,
      children: [
        {
          id: 1111,
          name: 'Node 1.1.1.1',
          parentId: 111,
          children: [],
        },
        {
          id: 1112,
          name: 'Node 1.1.1.2',
          parentId: 111,
          children: [],
        },
      ],
    },
    {
      id: 1,
      name: 'Node 1',
      children: [
        {
          id: 11,
          name: 'Node 1.1',
          parentId: 1,
          children: [],
        },
        {
          id: 12,
          name: 'Node 1.2',
          parentId: 1,
          children: [],
        },
      ],
    },
    {
      id: 112,
      name: 'Node 1.1.2',
      parentId: 11,
      children: [],
    },
    {
      id: 11,
      name: 'Node 1.1',
      parentId: 1,
      children: [],
    },
    {
      id: 1111,
      name: 'Node 1.1.1.1',
      parentId: 111,
      children: [],
    },
    {
      id: 1112,
      name: 'Node 1.1.1.2',
      parentId: 111,
      children: [],
    }
  ];

  public addParentNode() {
    const newId = (this.data[this.data.length - 1]?.id || 0) + 1;
    this.treeViewRef?.addNode({
      id: newId,
      name: `new Node ${newId}`
    })
    console.log(this.data);
  }
}
