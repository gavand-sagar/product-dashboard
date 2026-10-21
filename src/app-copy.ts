import { Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'app-root-copy',
  imports: [],
  template: `
    <!-- <h1 style.color={{title()}}>here {{title()}} </h1>
    <h1 [style.color]="title()">here{{title()}}</h1> -->
    @if (expanded()) {
      <h1>This will be only visible, if expanded true</h1>
    }

    @for (item of items(); track $index) {
      <button>{{item}}</button>
    }
    <div [className]="color()">{{text()}}</div>
  `,
  styles: `
    .chip{
      display: inline-block;
      padding:5px;
      border-radius: 5px;
      color:black;
    }
    .red{
      background-color: red;
    }
    .blue{
      background-color: blue;
    }
  `,
})
export class AppCopy {
  public items = signal<string[]>(["Home","About","Gallery","Main"])
  public expanded = signal<boolean>(true)
  public text = input<string>('');
  public color = input<string>('');
  save(){
    
  }

}
