import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-tree-view';
  data = [
    { id: 1, name: 'Node 1' },
    { id: 2, name: 'Node 1.1', parentId: 1 },
    { id: 3, name: 'Node 1.2', parentId: 1 },
    { id: 4, name: 'Node 2' },
    { id: 5, name: 'Node 2.1', parentId: 4 },
    { id: 6, name: 'Node 2.1', parentId: 2 },
  ];

  public addParentNode() {
    const lastId = this.data[this.data.length - 1]?.id || 0;
    this.data.push({
      id: lastId + 1,
      name: `Node${lastId + 1}`
    })
    console.log(this.data)
  }
}
