import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { TreeNodeComponent } from './tree-node/tree-node.component';
import { TreeViewDataPipe, TrudiDecisionTreeComponent } from './trudi-decision-tree.component';

@NgModule({
  declarations: [
    TrudiDecisionTreeComponent,
    TreeNodeComponent,
    TreeViewDataPipe,
  ],
  imports: [
    CommonModule,
    NzRadioModule,
    FormsModule,
    DragDropModule
  ],
  exports: [
    TrudiDecisionTreeComponent
  ]
})
export class TrudiDecisionTreeModule { }
