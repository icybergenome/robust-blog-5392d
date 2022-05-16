
import { getGraphQLClient } from "../apollo";
import { storage } from "../../../firebase";
import { ref,uploadBytes,getDownloadURL,listAll,deleteObject } from "firebase/storage";
import { client } from "../apollo/apollo";
import { gql } from "@apollo/client";
import Compressor from 'compressorjs';
// import { reader } from '../helpers/getImageMetaData'
import dynamic from 'next/dynamic'

import {
    Media,
    MediaList,
    MediaListOptions,
    MediaStore,
    MediaUploadOptions
  } from 'tinacms'

import { UPLOAD_FILE } from "../graphql/mutation/post";
import { async } from "@firebase/util";
// import { reader } from "../helpers/getImageMetaData";



export default class TinaMediaStore {
  accept = 'text/*,  application/*, image/*';
  
  async persist(files) {
    console.log("FILES",files)
    let expectedWidth = ''
    let expectedHeight = ''

  function resizeImageFn(w,h,file) {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        // size: 2, // the max size in MB, defaults to 2MB
        quality: 0.6, // the quality of the image, max is 1,
        maxWidth: 1920, // the max width of the output image, defaults to 1920px
        maxHeight: 1920,
        width:w, // the max height of the output image, defaults to 1920px
        height:h, // the max height of the output image, defaults to 1920px
        resize: true, // defaults to true, set false if you do not want to resize the image width and height
        success(result) {
          
          // Send the compressed image file to server with XMLHttpRequest.
          console.log("Success Result",result)
          resolve(result)
        },
        error(err) {
          console.log(err.message);
        },
      })
    })
    
  }

  function imageSize (image) {
    return new Promise((resolve, reject) => {
      try {
        const fileReader = new FileReader()
  
        fileReader.onload = () => {
          const img = new Image()
  
          img.onload = () => {
            resolve({ width: img.width, height: img.height })
          }
  
          img.src = fileReader.result
        }
  
        fileReader.readAsDataURL(image)
      } catch (e) {
        reject(e)
      }
    })
  }
  
    // console.log("myPromise",myPromise)
    try {
      // 6221 file size for 1920x1080
        const newF = files.map(async (file) => {
            
        if (file === null) return;

        const img = await imageSize(file.file)
        
        expectedWidth = img.width
        expectedHeight = img.height
        console.log("Expected Output Before",expectedWidth,'x',expectedHeight)

        let rem = ''

        if(expectedWidth > 1920 || expectedHeight > 1920){
          if(expectedWidth > expectedHeight){
            rem = (1920/expectedWidth).toFixed(2);
            expectedHeight = Math.round(expectedHeight*rem);
            expectedWidth = 1920;
          }else if(expectedHeight > 1920){
            rem = (1920/expectedHeight).toFixed(2)
            expectedWidth = Math.round(expectedWidth*rem);
            expectedHeight = 1920;
          }
        }
        
        const imageToUpload = await resizeImageFn(expectedWidth,expectedHeight,file.file)
        console.log("Expected Output After",expectedWidth,'x',expectedHeight)
        console.log("MY WE",imageToUpload)
        


        const imageRef = ref(storage, `robust-blog/${imageToUpload.name}`);

        const uploadImage = await uploadBytes(imageRef,imageToUpload)
        const refImg = uploadImage.ref
        const url = await getDownloadURL(ref(storage,`robust-blog/${refImg.name}`))
        return {
          type: 'file',
          filename:refImg.name,
          directory:url,
          id: url,
          previewSrc: url
        }
      })
      const media = await Promise.all(newF).then((values) => {
        return values
      });
      
      console.log("MY UPLOAD MEDIA",media)
      return media
      
        
    } catch (e) {
      console.error("persist",e);
    }
  }

  previewSrc(src, fieldPath, formValues) {
    return src
  }

  
  async list({ directory = directory ?? "/", limit, offset = 0 }) {
    console.log("OPENNN")
    const pushItems = []
    const listRef = ref(storage, 'robust-blog');

    const list = await listAll(listRef)
    const allItems = list.items.map( async (itemRef) => {
      const url = await getDownloadURL(ref(storage,`robust-blog/${itemRef.name}`))
      const urlString = new URL(url);
      const access_token = new URLSearchParams(urlString.search).get('token');
      // console.log(itemRef.name)
      return {
        filename:itemRef.name,
        directory:url,
        id: url,
        url
      }
    });
   
    
   const files = await Promise.all(allItems).then((values) => {
      return values
    });

  
    const items = files.map(({ id, url, filename, directory }) => {
      return {
        type: "file",
        directory,
        id,
        filename,
        previewSrc: url,
      };

    });

    return { items, limit, offset, totalCount: 9 };
  }

  async delete({ directory, filename }) {
    
    try {
      const desertRef = ref(storage, `robust-blog/${filename}`);
      const delImg = await deleteObject(desertRef)
    } catch (e) {
      console.error(e);
    }
  }
}
