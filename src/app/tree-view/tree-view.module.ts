import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HierarchyPipe, TreeViewComponent } from './tree-view.component';
import { TreeNodeComponent } from './tree-node/tree-node.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';


@NgModule({
  declarations: [
    TreeViewComponent,
    TreeNodeComponent,
    HierarchyPipe
  ],
  imports: [
    CommonModule,
    NzRadioModule,
    FormsModule
  ],
  exports: [
    TreeViewComponent
  ]
})
export class TreeViewModule { }
