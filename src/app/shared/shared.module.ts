import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

// Observable class extensions
// concat, defer, empty, forkJoin, from, fromPromise, if,
// interval, merge, of, range, throw, timer, using, zip
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/throw';
// Observable operators
// audit, buffer, catch, combineAll, combineLatest, concat, count, debounce, delay,
// distinct, do, every, expand, filter, finally, find , first, groupBy,
// ignoreElements, isEmpty, last, let, map, max, merge, mergeMap, min, pluck,
// publish, race, reduce, repeat, scan, skip, startWith, switch, switchMap, take,
// takeUntil, throttle, timeout, toArray, toPromise, withLatestFrom, zip
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/toPromise';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import 'hammerjs';

const commonModules = [CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, RouterModule];

const materialModules = [
  MatToolbarModule,
  MatInputModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatSortModule,
  MatTabsModule,
  MatListModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatStepperModule,
  MatProgressBarModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatExpansionModule,
  MatDialogModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
];

@NgModule({
  imports: [...commonModules, ...materialModules],
  exports: [...commonModules, ...materialModules],
})
export class SharedModule {}
