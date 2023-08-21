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
import { DecisionTreeDataService } from './services/decision-tree-data.service';
import { DecisionTreeDragDropSerivce } from './services/decision-tree-drag-drop.service';
import { TreeNodeOptions } from './tree-node/tree-node.interface';

@Pipe({
  name: 'treeViewData',
  pure: true,
})
export class TreeViewDataPipe implements PipeTransform {
  transform(value: Array<TreeNodeOptions>) {
    return this.defineNodeLevel(value);
  }

  private defineNodeLevel(nodes: Array<TreeNodeOptions>) {
    const define = (array: Array<TreeNodeOptions>) => {
      //implement node level
      return nodes;
    };

    define(nodes);
    return nodes;
  }
}

@Component({
  selector: 'trudi-decision-tree',
  templateUrl: './trudi-decision-tree.component.html',
  styleUrls: ['./trudi-decision-tree.component.scss'],
  providers: [DecisionTreeDataService, DecisionTreeDragDropSerivce],
})
export class TrudiDecisionTreeComponent implements OnInit {
  private _dataSource: Array<TreeNodeOptions> = [];

  get dataSource() {
    return this._dataSource;
  }

  @Input() set dataSource(value: Array<TreeNodeOptions>) {
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
    @Self() private treeViewService: DecisionTreeDataService,
    @Self() private treeviewDragDropService: DecisionTreeDragDropSerivce
  ) {}

  ngOnInit(): void {
    if (!this.defaultNodeId && this._dataSource?.length) {
      this.treeViewService.defaultNode = this._dataSource[0];
    }
  }

  addNode(node: TreeNodeOptions) {
    this.treeViewService.addNode(node);
    this.onAddNode.emit(node);
  }

  addChildNode(parentNode: TreeNodeOptions, childNode: TreeNodeOptions) {
    this.treeViewService.addNode(parentNode, childNode);
    this.onAddNode.emit({
      parentNode,
      childNode,
    });
  }

  removeNode(node: TreeNodeOptions) {
    this.treeViewService.removeNodeByKey(node.key);
    this.onSetDefaultNode.emit(node);
  }

  setDefaultNode(node: TreeNodeOptions) {
    this.treeViewService.setDefaultNode(node);
    this.onSetDefaultNode.emit(node);
  }

  drop(event: CdkDragDrop<Array<any>>) {
    this.treeviewDragDropService.hanldeDrop(this._dataSource, event);
  }
}
