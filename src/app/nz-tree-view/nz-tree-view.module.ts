import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDemoTreeViewEditableComponent } from './nz-tree-view.component';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    NzDemoTreeViewEditableComponent
  ],
  imports: [
    CommonModule,
    NzTreeViewModule,
    NzIconModule,
    DragDropModule
  ],
  exports: [
    NzDemoTreeViewEditableComponent
  ],
})
export class AntTreeViewModule {}
