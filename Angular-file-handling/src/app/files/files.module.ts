import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesRoutingModule } from './files-routing.module';
import { FileInputComponent } from './file-input/file-input.component';
import { BlobComponent } from './blob/blob.component';
import { ResponseObjectComponent } from './response-object/response-object.component';
import { CacheComponent } from './cache/cache.component';

@NgModule({
  imports: [
    CommonModule,
    FilesRoutingModule
  ],
  declarations: [FileInputComponent, BlobComponent, ResponseObjectComponent, CacheComponent]
})
export class FilesModule { }
