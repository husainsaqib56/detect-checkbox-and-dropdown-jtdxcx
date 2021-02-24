import { Component, OnDestroy } from "@angular/core";
import { FormArray, FormControl, FormGroup, FormGroupDirective } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  isCheck: boolean;
  type: String;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: "Hydrogen",
    weight: 1.0079,
    symbol: "H",
    isCheck: true,
    type: "Regular"
  },
  {
    position: 2,
    name: "Helium",
    weight: 4.0026,
    symbol: "He",
    isCheck: false,
    type: "Regular"
  },
  {
    position: 3,
    name: "Lithium",
    weight: 6.941,
    symbol: "Li",
    isCheck: false,
    type: "Not Regular"
  },
  {
    position: 4,
    name: "Beryllium",
    weight: 9.0122,
    symbol: "Be",
    isCheck: false,
    type: "Regular"
  },
  {
    position: 5,
    name: "Boron",
    weight: 10.811,
    symbol: "B",
    isCheck: false,
    type: "Regular"
  },
  {
    position: 6,
    name: "Carbon",
    weight: 12.0107,
    symbol: "C",
    isCheck: false,
    type: "Not Regular"
  },
  {
    position: 7,
    name: "Nitrogen",
    weight: 14.0067,
    symbol: "N",
    isCheck: false,
    type: "Regular"
  },
  {
    position: 8,
    name: "Oxygen",
    weight: 15.9994,
    symbol: "O",
    isCheck: false,
    type: "Not Regular"
  },
  {
    position: 9,
    name: "Fluorine",
    weight: 18.9984,
    symbol: "F",
    isCheck: false,
    type: "Not Regular"
  },
  {
    position: 10,
    name: "Neon",
    weight: 20.1797,
    symbol: "Ne",
    isCheck: true,
    type: "Not Regular"
  }
];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: "table-basic-example",
  styleUrls: ["table-basic-example.css"],
  templateUrl: "table-basic-example.html"
})
export class TableBasicExample {
  public useForm: FormGroup;
  types = ['Regular', 'Not Regular'];
  public displayedColumns: string[] = [
    "position",
    "name",
    "weight",
    "symbol",
    "isCheck",
    "type"
  ];
  public dataSource = ELEMENT_DATA;

  constructor() {
    this.initForm();
  }
public reset(formDirective:FormGroupDirective){
formDirective.reset();
this.useForm.pristine();
}
  public initForm() {
    /* FormGroup for all editable cells in a row */
    const rowFormGroups = ELEMENT_DATA.map(element => {
      const rowFormGroup = new FormGroup({
        position: new FormControl(element.position),
        symbol: new FormControl(element.symbol),
        isCheck: new FormControl(element.isCheck),
        type: new FormControl(element.type)
      });

      /* Listen for changes to the row */
      rowFormGroup.valueChanges.subscribe(rowValues => {
        console.log(this.useForm.get('elements').dirty);

      });
      return rowFormGroup;
    });

    /* Parent FormGroup */
    this.useForm = new FormGroup({
      /* FormArray to contain all the row FormGroups */
      elements: new FormArray(rowFormGroups)
    });
  }
}
