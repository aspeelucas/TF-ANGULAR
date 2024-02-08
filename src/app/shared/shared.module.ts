import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { FullNamePipe } from './full-name.pipe';
import { FontSizeDirective } from './font-size.directive';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';





@NgModule({
    declarations: [
    FullNamePipe,
    FontSizeDirective
  ],
    imports: [CommonModule],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        FullNamePipe,
        FontSizeDirective,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
    ]
})

export class SharedModule {}