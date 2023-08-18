import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Pipe,
  PipeTransform,
  Self,
} from '@angular/core';
import { TreeViewDataService } from './services/tree-view-data.service';
import { TreviewDragDropSerivce } from './services/tree-view-drag-drop.service';
import { TreeNode } from './tree-node/tree-node.interface';

@Pipe({
  name: 'treeViewData',
  pure: true
})
export class TreeViewDataPipe implements PipeTransform {
  transform(value: Array<TreeNode>) {
    return this.defineNodeLevel(value);
  }

  private defineNodeLevel(nodes: Array<TreeNode>) {
    let level = 1;

    const define = (array: Array<TreeNode>) => {
      for (const node of array) {
        if (!node.parentId) {
          level = 1;
        }
        node.level = level;
        if (node.children?.length) {
          level++;
          define(node.children);
        }
      }
    };

    define(nodes);
    console.log(nodes);
    return nodes;
  }
}

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
  providers: [TreeViewDataService, TreviewDragDropSerivce],
})
export class TreeViewComponent implements OnInit {
  private _dataSource: Array<TreeNode> = [];

  get dataSource() {
    return this._dataSource;
  }

  @Input() set dataSource(value: Array<TreeNode>) {
    this._dataSource = value;
    this.treeViewService.dataSource = value;
  }

  private _defaultNodeId: number | null = null;
  @Input() set defaultNodeId(value: number | null) {
    this._defaultNodeId = value;
  }
  get defaultNodeId() {
    return this._defaultNodeId;
  }

  @Output() onAddNode = new EventEmitter();
  @Output() onAddChildNode = new EventEmitter();
  @Output() onRemoveNode = new EventEmitter();
  @Output() onSetDefaultNode = new EventEmitter();

  constructor(
    @Self() private treeViewService: TreeViewDataService,
    @Self() private treeviewDragDropService: TreviewDragDropSerivce
  ) {}

  ngOnInit(): void {
    if (!this.defaultNodeId && this._dataSource?.length) {
      this.treeViewService.defaultNode = this._dataSource[0];
    }
  }

  addNode(node: TreeNode) {
    this.treeViewService.addNode(node);
    this.onAddNode.emit(node);
  }

  addChildNode(parentNode: TreeNode, childNode: TreeNode) {
    this.treeViewService.addNode(parentNode, childNode);
    this.onAddNode.emit({
      parentNode,
      childNode,
    });
  }

  removeNode(node: TreeNode) {
    this.treeViewService.removeNodeById(node.id);
    this.onSetDefaultNode.emit(node);
  }

  setDefaultNode(node: TreeNode) {
    this.treeViewService.setDefaultNode(node);
    this.onSetDefaultNode.emit(node);
  }

  drop(event: CdkDragDrop<Array<any>>) {
    this.treeviewDragDropService.hanldeDrop(this._dataSource, event);
  }
}
