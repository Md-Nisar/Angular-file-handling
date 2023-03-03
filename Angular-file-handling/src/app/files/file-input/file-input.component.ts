import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css']
})
export class FileInputComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  chooseFiles(event): void {
    const input = event.target;
    const files = input.files;
    if (files.length) {
      this.showFileInfo(files)
    }

  }

  showFileInfo(files) {
    //Iterating each file and printing it's information
    for (const file of files) {
      console.group(`${file.name}`);
      console.log(file.name);
      console.log(`${Math.ceil(file.size / 1024)}KB`);
      console.log(file.type)
      console.log(new Date(file.lastModified));
      console.groupEnd();
    }
  }

  toggleInputFile() {
    let inputControl = document.getElementById('file-input');
    //Hide/Show Input:file control
    inputControl.classList.toggle('hidden')
  }

  pickFiles(event) {
    let inputControl = document.getElementById('file-input');
    //Triggers click event on input:file
    inputControl.click()
  }



}
