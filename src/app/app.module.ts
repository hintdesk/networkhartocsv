import { AboutComponent } from './components/about/about.component';
import { AppComponent } from './app.component';
import { AppContext } from './infrastructure/app.context';
import { AppRoutingModule } from './app-routing.module';
import { AppSession } from './infrastructure/sessions/app.session';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ColumnComponent } from './components/column/column.component';
import { CommonModule } from '@angular/common';
import { FileSaverModule } from 'ngx-filesaver';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { InputComponent } from './components/input/input.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { TableComponent } from './components/table/table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DelimiterComponent } from './components/delimiter/delimiter.component';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    FooterComponent,
    HeaderComponent,
    InputComponent,
    TableComponent,
    ColumnComponent,
    DelimiterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,

    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatGridListModule,
    MatCheckboxModule,
    MatDialogModule,
    MatRadioModule,


    FileSaverModule

  ],
  entryComponents: [
    ColumnComponent,
    DelimiterComponent
  ],
  providers: [
    AppContext,
    AppSession
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
