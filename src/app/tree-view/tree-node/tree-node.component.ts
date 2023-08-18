import { CdkDragMove } from '@angular/cdk/drag-drop';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SkipSelf
} from '@angular/core';
import { TreeViewDataService } from '../services/tree-view-data.service';
import { TreviewDragDropSerivce } from '../services/tree-view-drag-drop.service';
import { TreeViewComponent } from '../tree-view.component';
import { TreeNode } from './tree-node.interface';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
})
export class TreeNodeComponent implements OnInit {
  @Input() node!: TreeNode;

  @Output() onAddChildNode = new EventEmitter();
  @Output() onRemoveNode = new EventEmitter();
  @Output() onSetDefaultNode = new EventEmitter();

  constructor(
    @SkipSelf() public treeViewSerice: TreeViewDataService,
    @SkipSelf() private treeViewRef: TreeViewComponent,
    @SkipSelf() private treeviewDragDropService: TreviewDragDropSerivce
  ) {}

  ngOnInit(): void {}

  removeNode(node: TreeNode) {
    this.treeViewRef.removeNode(node);
  }

  addChildNode(node: TreeNode) {
    console.log(node);
  }

  setNodeDefault(node: TreeNode) {
    this.treeViewRef.setDefaultNode(node);
  }

  onDragMoved(event: CdkDragMove<HTMLDivElement>) {
    this.treeviewDragDropService.handleDragMoved(event);
  }
}
