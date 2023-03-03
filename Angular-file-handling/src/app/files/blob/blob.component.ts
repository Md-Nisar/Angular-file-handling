import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blob',
  templateUrl: './blob.component.html',
  styleUrls: ['./blob.component.css']
})
export class BlobComponent implements OnInit {

  public dataURL;

  constructor() { }

  ngOnInit() { }

  createBlobFromBuffer() {
    //Create a buffer/memory location with fixed size 5
    let ab = new ArrayBuffer(5); // 5 bytes -> 1 byte = 8 bits / 0-255

    //Write raw data into buffer using DataView
    let dv = new DataView(ab);
    dv.setInt8(0, 110) // n
    dv.setInt8(1, 105) // i
    dv.setInt8(2, 115) // s
    dv.setInt8(3, 97) // a
    dv.setInt8(4, 114) // r


    //Read raw data from buffer
    let view = new Int8Array(ab)
    console.log(view.toString())

    //Create a Blob out of array buffer
    let b = new Blob([ab])

    //Create a File
    let f = new File([b], 'greet.txt', { type: 'text/plain' })
    console.log(f);

    //Using file reader to read the content of the file
    let fr = new FileReader();
    //Read as text, create data URL & more...
    fr.readAsDataURL(f);
    fr.onload = (e) => {
      console.log(fr.result);
      this.downloadFile(fr.result, f)
    }
  }


  createBlobFromObj() {
    let obj = {
      ename: 'Md Nisar Ahmed',
      empId: 1362,
      sal: 1000
    }

    let b = new Blob([JSON.stringify(obj)])
    let f = new File([b], obj.empId.toString(), { type: 'application/json' });
    let fr = new FileReader();
    fr.readAsDataURL(f);
    fr.onload = (e) => {
      console.log(fr.result)
      this.downloadFile(fr.result, f)
    }
  }

  downloadFile(dataURL, file: File) {
    //Create an anchor tag and set attributes
    let a = document.createElement('a')
    a.href = dataURL;
    a.download = file.name;
    a.textContent = 'download';
    document.querySelector('.main').appendChild(a);
  }



}
