import { CdkDragMove } from '@angular/cdk/drag-drop';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SkipSelf
} from '@angular/core';
import { TrudiDecisionTreeComponent } from '../trudi-decision-tree.component';
import { DecisionTreeDataService } from '../services/decision-tree-data.service';
import { DecisionTreeDragDropSerivce } from '../services/decision-tree-drag-drop.service';
import { TreeNodeOptions } from './tree-node.interface';

@Component({
  selector: 'trudi-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
})
export class TreeNodeComponent implements OnInit {
  @Input() node!: TreeNodeOptions;

  @Output() onAddChildNode = new EventEmitter();
  @Output() onRemoveNode = new EventEmitter();
  @Output() onSetDefaultNode = new EventEmitter();

  constructor(
    @SkipSelf() public treeViewSerice: DecisionTreeDataService,
    @SkipSelf() private treeViewRef: TrudiDecisionTreeComponent,
    @SkipSelf() private treeviewDragDropService: DecisionTreeDragDropSerivce
  ) {}

  ngOnInit(): void {}

  removeNode(node: TreeNodeOptions) {
    this.treeViewRef.removeNode(node);
  }

  addChildNode(node: TreeNodeOptions) {
    console.log(node);
  }

  setNodeDefault(node: TreeNodeOptions) {
    this.treeViewRef.setDefaultNode(node);
  }

  onDragMoved(event: CdkDragMove<HTMLDivElement>) {
    this.treeviewDragDropService.handleDragMoved(event);
  }
}
