import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';



const materialComponent =
  [
    MatToolbarModule, MatIconModule, MatSidenavModule, FlexLayoutModule, MatMenuModule, MatButtonModule,
    MatDividerModule, MatCheckboxModule, MatExpansionModule, MatTabsModule,
    MatSelectModule, MatCardModule, MatInputModule, MatGridListModule, MatListModule, NgxMatFileInputModule,
    MatButtonToggleModule, MatTableModule, MatSortModule, MatPaginatorModule, MatChipsModule, MatAutocompleteModule
  ];
@NgModule({
  imports: [materialComponent],
  exports: [materialComponent]
})
export class MaterialModule { }
