import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Pipe({
  name: 'hierarchy',
  pure: false,
})
export class HierarchyPipe implements PipeTransform {
  transform(value: Array<any>) {
    // return this.transformToHierarchy(value);
    return value;
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
  _dataSource: Array<any> = [];
  @Input() set dataSource(value: Array<any>) {
    this._dataSource = value;
  }

  constructor() {}

  ngOnInit(): void {}

  addNode(parentNode: any, childNode?: any) {
    if (!childNode) {
      this._dataSource.push(parentNode);
    }

    if (parentNode.id === childNode.parentId) {
      parentNode.children.push(childNode);
      return;
    }

    for (const child of parentNode.children) {
      this.addNode(child, childNode);
    }
  }

  removeNodeById(nodeId: any, source: Array<any>) {
    for (let index = 0; index < source.length; index++) {
      const node = source[index];

      if (node.id === nodeId) {
        source.splice(index, 1);
        return true;
      }

      if (node.children && node.children.length > 0) {
        if (this.removeNodeById(nodeId, node.children)) {
          return true;
        }
      }
    }
    return false;
  }

  drop(event: CdkDragDrop<Array<any>>) {
    moveItemInArray(this._dataSource, event.previousIndex, event.currentIndex);
  }
}
