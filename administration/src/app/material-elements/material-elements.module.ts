import { NgModule } from '@angular/core';

import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatNativeDateModule
} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatDialogModule} from '@angular/material/dialog';
import { LightboxModule } from 'ngx-lightbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    LayoutModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    NgSelectModule,
    MatDialogModule,
    LightboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    OwlNativeDateTimeModule,
    OwlDateTimeModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    LayoutModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    NgSelectModule,
    MatDialogModule,
    LightboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    OwlNativeDateTimeModule,
    OwlDateTimeModule
  ]
})
export class MaterialElementsModule { }
