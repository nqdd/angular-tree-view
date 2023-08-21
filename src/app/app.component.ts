import { Component, ViewChild } from '@angular/core';
import { TrudiDecisionTreeComponent } from './tree-view/trudi-decision-tree.component';
import { DecisionTreeMockService } from './tree-view/services/decision-tree-mock.service';
import { Observable } from 'rxjs';
import { TreeNodeOptions } from './tree-view/tree-node/tree-node.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DecisionTreeMockService],
})
export class AppComponent {
  constructor(private mockService: DecisionTreeMockService) {}
  @ViewChild(TrudiDecisionTreeComponent) treeViewRef:
    | TrudiDecisionTreeComponent
    | undefined;

  title = 'angular-tree-view';

  data: Observable<TreeNodeOptions[]> = this.mockService.getData();

  public addParentNode() {}

  logger(value: unknown) {
    console.log(value);
  }
}
