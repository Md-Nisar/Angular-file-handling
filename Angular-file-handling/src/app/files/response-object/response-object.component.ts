import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-response-object',
  templateUrl: './response-object.component.html',
  styleUrls: ['./response-object.component.css']
})
export class ResponseObjectComponent implements OnInit {

  public APP = {
    fileName: null,
    file: null,
    responseObject: null,
    cacheName: 'FileCache-V1',
    cache: null
  }

  constructor() { }
  ngOnInit() { }

  chooseFile(event) {
    const input = event.target;
    const file: File = input.files[0] || null;
    console.log({ file });
    this.APP.fileName = file.name;
    this.APP.file = file;
    console.log('%cFile picked successfully!', 'color: green');
  }

  createResponseObject() {
    if (this.APP.file) {
      let response = new Response(this.APP.file, {
        status: 200,
        statusText: 'OK',
        headers: {
          'content-type': this.APP.file.type,
          'content-length': this.APP.file.size,
          'X-file-name': this.APP.file.name
        }
      }
      )
      console.log({ response })
      this.APP.responseObject = response;
      console.log('%cResponse object created successfully!', 'color: green');
    }
  }

  saveInCache() {
    if (this.APP.responseObject) {
      caches.open(this.APP.cacheName).then((cache) => {
        this.APP.cache = cache;
        //Creating URL (or String, Request) to use as a key 
        //Using timestamp as folder name
        let url = new URL(`/${Date.now()}/${this.APP.responseObject.headers.get('X-file-name')}`, location.origin)
        console.log(url)
        cache.put(url.toString(), this.APP.responseObject as Response);
        console.log("%cSaved in cache successfully!", 'color: green');

      })
    }
  }


  async displayCurrentFile() {
    if (this.APP.file) {
      if (this.APP.file.type == 'application/json') {
        const buffer = await this.APP.file.arrayBuffer();
        const td = new TextDecoder('utf-8');
        /**
         * same as of 
         *  fetch(url).then(res => res.text()).then(res => console.log(res))
         */
        let text = td.decode(buffer);

        /** //Alternate method
        let fr = new FileReader();
        fr.readAsText(this.APP.file);
        fr.onload = () => {
          text = fr.result as string;
          //NOTE: textContent must be assigned here
        }
        */

        document.querySelector('pre.file-content').textContent = text;
        console.log("%cCurrent File displayed successfully !", 'color: green');
      } else if (this.APP.file.type.startsWith('image/')) {
        // This will find where the file is stored in the memory and creates a URL
        let url = URL.createObjectURL(this.APP.file); //1. URL of memory
        console.log("URL::", url)
        /**
        let fr = new FileReader();
        fr.readAsDataURL(this.APP.file)
        fr.onload = () => {
         url = fr.result as string; //2. Data URL (base64)
         console.log("FR::", fr.result as string);
         NOTE: img src accepts both URL to memory and Data URL
        }
         */
        document.querySelector("div.image-container").innerHTML = `<img src=${url} alt=${this.APP.fileName}>`
      } else {
        console.log("%c Sorry! This MIME type is not supported for now", 'color: yellow')
      }
    }

  }

  async displayFileFromCache() {
    // Fetch & store cache object if it's not present(On page reload)
    if(!this.APP.cache) {
      this.APP.cache = await caches.open(this.APP.cacheName);
    }
   const keys: Request[] = await this.APP.cache.keys();
   // Get last response object
   const url = keys[keys.length - 1].url;
   let response: Response = await this.APP.cache.match(url);
   let contentType = response.headers.get('content-type');
   if(contentType == 'application/json') {
    let text = await response.text();
    document.querySelector('pre.file-content').textContent = text;
    console.log("%cCached File displayed successfully!", 'color: green');
   } else if (contentType.startsWith('image/')) {
    let blob = await response.blob();
    let url = URL.createObjectURL(blob);
    console.log("URL::", url)
    document.querySelector("div.image-container").innerHTML = `<img src=${url} alt=${this.APP.fileName}>`
    console.log("%cCached File displayed successfully !", 'color: green');
   } else {
    console.log("%c Sorry! This MIME type is not supported for now", 'color: yellow')
   }

  }



}
