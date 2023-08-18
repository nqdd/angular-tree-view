import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TreeViewComponent, TreeViewDataPipe } from './tree-view.component';
import { TreeNodeComponent } from './tree-node/tree-node.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    TreeViewComponent,
    TreeNodeComponent,
    TreeViewDataPipe
  ],
  imports: [
    CommonModule,
    NzRadioModule,
    FormsModule,
    DragDropModule
  ],
  exports: [
    TreeViewComponent
  ]
})
export class TreeViewModule { }
