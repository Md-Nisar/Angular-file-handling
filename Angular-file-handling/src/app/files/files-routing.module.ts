import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlobComponent } from './blob/blob.component';
import { CacheComponent } from './cache/cache.component';
import { FileInputComponent } from './file-input/file-input.component';
import { ResponseObjectComponent } from './response-object/response-object.component';

const routes: Routes = [
  {
    path: '',
    component: FileInputComponent
  },
  {
    path: 'blob',
    component: BlobComponent
  },
  {
    path: 'responseObject',
    component: ResponseObjectComponent
  },
  {
    path: 'cache',
    component: CacheComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilesRoutingModule { }
