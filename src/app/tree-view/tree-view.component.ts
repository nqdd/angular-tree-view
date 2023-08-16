import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hierarchy',
  pure: false
})
export class HierarchyPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    console.log(args);
    return this.transformToHierarchy(value);
  }

  
  private transformToHierarchy(items: Array<any>) {
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

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
})
export class TreeViewComponent implements OnInit {
  treeData = [
    {
      id: 1,
      name: 'Node 1',
      children: [
        { id: 2, name: 'Node 1.1', children: [{ id: 22, name: 'node 1.2' }] },
        { id: 3, name: 'Node 1.2' },
      ],
    },
    {
      id: 4,
      name: 'Node 2',
    },
  ];

  @Input() dataStructure: 'plain' | 'tree' = 'plain';

  _dataSource: Array<any> = [];
  @Input() set dataSource(value: Array<any>) {

      this._dataSource = value;

  }

  constructor() {}

  ngOnInit(): void {}

  public addNewNode(node: any) {
    this._dataSource.push(node);
  }

  private transformToHierarchy(items: Array<any>) {
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
