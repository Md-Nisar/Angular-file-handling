### ANGULAR FILE HANDLING

## 1. File Gathering
--> https://youtu.be/7fybEXre70o
--> https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file


## 2. Blob/File/Array buffer/Data viewer/Typed Array
--> https://youtu.be/ScZZoHj7mqY
--> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
--> https://developer.mozilla.org/en-US/docs/Web/API/Blob

new Blob([ data ], {type:"text/plain", endings: "transparent"||"native"})
new File([ data ], filename, {type:"text/plain", lastModified: Date.now()})
(data -> Blob, ArrayBuffer, TypedArray, DataView, String (utf-8 string), a mixture, variable, obj, array)
File is a sub-class of Blob. Can often be used interchangeably. 
Once you have a Blob/File then you can use it:
- upload via fetch as a file or stream
- save it in the cache
- add a link in a webpage to the file
- display it as an image (if image)
- read the text contents (json, txt, html...) and:
  - display on page
  - parse the html, xml, json, etc
  - save in localStorage or cookie
ArrayBuffer - raw data as a fixed-length string of bytes. It is NOT an Array.
DataView - an interpretation of some raw bytes expressed as 8-bit, 16-bit, 32-bit,
  or 64-bit integers. Used to add or edit data in an ArrayBuffer. Like a wrapper 
  for ArrayBuffers if you need to edit them. It is a View of the Data from the ArrayBuffer
TypedArray - It is an Array-like view of raw bytes stored as 
  8-bit, 16-bit, 32-bit or 64-bit  integers, clamped integers, 
  signed and unsigned integers, or floats. 

Tip: If you have URL then fetch it will return blob

## 3. Create object response of a file and store it in cache using cache API

--> https://youtu.be/zq2xD-xuIG4
--> https://developer.mozilla.org/en-US/docs/Web/API/Response/Response
--> https://developer.mozilla.org/en-US/docs/Web/API/Cache

## 4. let's cache

--> https://youtu.be/Gu0t2EW2kfU

    CACHES:
    caches.delete(name).then(isGone=>{});
    caches.has(name).then(hasFile=>{});
    caches.keys().then(namesArray=>{});
    caches.match(Request).then(cacheResponse=>{});
    caches.open(name).then(cache=>{});
    
    CACHE - from caches.open():
    cache.add(Request).then(()=>{});
    cache.addAll(Requests[]).then(()=>{});
    //add and addAll === fetch() + cache.put()
    cache.delete(Request, options).then(isGone=>{});
    cache.keys([Request, options]).then((keysArray)=>{});
    cache.match(Request, options).then((cacheResponse)=>{});
    cache.matchAll([Request, options]).then((cacheResponses[])=>{});
    cache.put(Request, Response).then(()=>{});







## NOTE:: 
 1. TextDecoder is a part of typescript: "~2.8.0"