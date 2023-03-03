import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cache',
  templateUrl: './cache.component.html',
  styleUrls: ['./cache.component.css']
})
export class CacheComponent implements OnInit {

  public readonly CACHE_NAME: string = 'file-cache-v1.0';
  public imgURL: any;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    // (async () => {
    //   console.log(await this.startCaching())
    // })();
  }

  startCaching() {
    // OPEN AN EXISTING CACHE OR CREATE A NEW ONE
    return caches.open(this.CACHE_NAME).then((cache: Cache) => {
      console.log('Cache %s opened!', this.CACHE_NAME);

      // ADD CACHE BY PASSING STRING, URL OR REQUEST OBJECT AS KEY
      // 1. string as key
      const URLString = '/assets/imgs/cache-imgs/flower1.avif';
      // add() = fetch() + put()
      cache.add(URLString).then(() => {
        console.log("Added one file to cache!")
      })

      // 2. URL as key
      const url = new URL('/assets/imgs/cache-imgs/flower2.jpg', location.origin);
      cache.add(url.toString()).then(() => {
        console.log("Added one file to cache!")
      })

      // 3. Request Object as key
      let request = new Request('/assets/imgs/cache-imgs/flower3.jpg')
      cache.add(request).then(() => {
        console.log("Added one file to cache!")
      })

      return cache;
    }).then((cache: Cache) => {
      // CHECK IF A CACHE OBJECT EXIST OR NOT
      caches.has(this.CACHE_NAME).then((hasCache) => {
        console.log('Is %s exist? %s', this.CACHE_NAME, hasCache)
      })
      return cache;
    }).then((cache: Cache) => {
      // GET ALL THE KEYS
      cache.keys().then((keys: Request[]) => {
        keys.forEach((key, index) => {
          console.log(`${index} - ${key.url}`);
        })
      })
      return cache;
    }).then((cache: Cache) => {
      // MATCH REQUEST/KEY AND GET RESPONSE
      const URLString = '/assets/imgs/cache-imgs/flower2.jpg';
      return cache.match(URLString).then((cacheResponse: Response) => {
        if (cacheResponse &&
          cacheResponse.status < 400 &&
          cacheResponse.headers.has('content-type') &&
          cacheResponse.headers.get('content-type').match(/^image\//gim)
        ) {
          console.log("%cFound in cache!", 'color: blue');
          return cacheResponse;
        }
        else {
          //IF NO MATCH THEN FETCH IT FROM SERVER :)
          console.log("%cFecthing from server!", 'color: red')
          return fetch(URLString).then((fetchResponse: Response) => {
            if (!fetchResponse.ok) throw fetchResponse.statusText;
            // PUT RESPONSE OBJECT IN CACHE (NO FETCH)
            cache.put(URLString, fetchResponse.clone());
            return fetchResponse;
          })
        }
      })
    }).then((response: Response) => {
      console.log("Response: ", response);
      return response.blob();
    }).then((blob: Blob) => {
      // SANITIZING UNSAFE URLs
      this.imgURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    })

  }

}
