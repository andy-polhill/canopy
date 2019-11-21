import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { action } from '@storybook/addon-actions';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';

import { CanopyModule } from '../../canopy.module';
import { notes } from './input.notes';

const stories = storiesOf('Components|Form', module).addDecorator(withKnobs);

@Component({
  selector: 'lg-reactive-form',
  template: `
    <form [formGroup]="form">
      <lg-input-field [block]="block">
        {{ label }}
        <lg-hint *ngIf="hint">{{ hint }}</lg-hint>
        <input lgInput formControlName="name" [size]="size" />
      </lg-input-field>
    </form>
  `
})
class ReactiveFormComponent implements OnInit {
  @Input() disabled = false;
  @Input() block: boolean;
  @Input() hint: string;
  @Input() label: string;
  @Input() size: number;

  @Output() inputChange: EventEmitter<void> = new EventEmitter();

  form: FormGroup;

  constructor(public fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({ name: { value: '', disabled: this.disabled } });
    this.form.valueChanges.subscribe(val => this.inputChange.emit(val));
  }
}

stories.add(
  'Input',
  () => ({
    moduleMetadata: {
      declarations: [ReactiveFormComponent],
      imports: [ReactiveFormsModule, CanopyModule]
    },
    template: `<lg-reactive-form
      (inputChange)="inputChange($event)"
      [block]="block"
      [hint]="hint"
      [label]="label"
      [size]="size"
    ></lg-reactive-form>`,
    props: {
      inputChange: action('inputChange'),
      label: text('label', 'Name'),
      hint: text('hint', 'Please enter your name'),
      size: number('input size', 12),
      block: boolean('block', false)
    }
  }),
  {
    notes: {
      markdown: notes
    }
  }
);
