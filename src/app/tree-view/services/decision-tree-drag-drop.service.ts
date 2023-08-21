import { CdkDragDrop, CdkDragMove, moveItemInArray } from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { TreeNodeOptions } from '../tree-node/tree-node.interface';

enum DropPosition {
  BEFORE = 'before',
  AFTER = 'after',
  INSIDE = 'inside',
}

@Injectable()
export class DecisionTreeDragDropSerivce {
  private dropPosition: DropPosition = DropPosition.INSIDE;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  handleDragMoved(event: CdkDragMove<HTMLDivElement>) {
    this.debounce(() => {
      const targetElement = this.document.elementFromPoint(
        event.pointerPosition.x,
        event.pointerPosition.y
      );

      if (!targetElement) {
        this.clearDragInfo();
        return;
      }

      const nodeClassName = 'tree-node-item';
      const container = targetElement.classList.contains(nodeClassName)
        ? targetElement
        : targetElement.closest(nodeClassName);

      if (!container) {
        this.clearDragInfo();
        return;
      }

      const targetRect = container.getBoundingClientRect();
      const oneThird = targetRect.height / 3;

      if (event.pointerPosition.y - targetRect.top < oneThird) {
        this.dropPosition = DropPosition.BEFORE;
      } else if (event.pointerPosition.y - targetRect.top > 2 * oneThird) {
        this.dropPosition = DropPosition.AFTER;
      } else {
        this.dropPosition = DropPosition.INSIDE;
      }

      this.clearDragInfo();
      container.classList.add(`drop-${this.dropPosition}`);
    }, 100)();
  }

  hanldeDrop(
    dataSource: Array<TreeNodeOptions>,
    event: CdkDragDrop<typeof dataSource>
  ) {
    this.clearDragInfo();
    console.log('drop position', this.dropPosition);
    switch (this.dropPosition) {
      case DropPosition.AFTER:
        // implement
        break;
      case DropPosition.BEFORE:
        // implement
        break;
      default:
        moveItemInArray(dataSource, event.previousIndex, event.currentIndex);
        break;
    }
  }

  private clearDragInfo() {
    for (const className of ['drop-before', 'drop-inside', 'drop-after']) {
      this.document
        .querySelectorAll(`.${className}`)
        .forEach((element) => element.classList.remove(className));
    }
  }

  private debounce(func: () => void, delay: number) {
    let timerId: NodeJS.Timer;

    return (...args: any) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
}
