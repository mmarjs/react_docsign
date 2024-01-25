import { getBlob, getStorage, storage, ref, uploadBytesResumable, getDownloadURL } from './firebase_storage';
import { notification } from 'antd';


export default {
    get_url,
    get_blob,
    put
}



function get_blob(path) {
    // const path = process.env.FIREBASE_STORAGE_DIR_COMPANY + pdfUrl.split("%2F")[2] + "/" + "container.json"

    const storage = getStorage();
    const file_ref = ref(storage, path);

    // Get the download URL
    return getBlob(file_ref)
        .then((blob) => {
            // console.log("successful", blob)
            return blob
            // Insert url into an <img> tag to "download"
        })
        .catch((error) => {
            console.log("error", error)
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/object-not-found':
                    // File doesn't exist
                    break;
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    break;
            }
        });


}

function get_url(path) {
    // const path = process.env.FIREBASE_STORAGE_DIR_COMPANY + pdfUrl.split("%2F")[2] + "/" + "container.json"

    const storage = getStorage();
    const starsRef = ref(storage, path);

    // Get the download URL
    getDownloadURL(starsRef)
        .then((url) => {
            console.log("successful", url)
            return {
                url,

            }
            // Insert url into an <img> tag to "download"
        })
        .catch((error) => {
            console.log("error", error)
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/object-not-found':
                    // File doesn't exist
                    break;
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    break;
            }
        });


}

function put(props) {
    const { file, path, name } = props

//    console.log("FINAL PATH: ", path + "/" + name)


    const storageRef = ref(storage, path + "/" + name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //  console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                  //  console.log('Upload is paused');
                    break;
                case 'running':
                 //   console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // Handle unsuccessful uploads
            console.log(error)
            notification.error({
                message: 'Failed!',
                description: 'Upload file failure!',
                duration: 5
            });
        },
        () => {
            notification.success({
                message: 'Success!',
                description: 'Upload file success!',
                duration: 5
            });
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              //  console.log('File available at', downloadURL);
            });
        }
    );
}


/*
export default async function uploadFile(file_data, file_path, file_name) {
    let downloadURL = '';
    let uploadProgress = 0;
    let uploadError = '';
    let uploadSuccess = false;

    const datetime = new Date().toISOString();
    const full_path = file_path + '/' + file_name;
    // console.log("full_path",ref)

    // const uploadRef = ref(storage, full_path)


    // const uploadTask = ref(full_path + "_" + datetime).put(file_data);

    const storageRef = ref(storage, full_path);
    const uploadTask = await uploadBytes(storageRef, file_data);

    console.log("fsdf: ",await uploadTask)

    uploadTask.on(
        'state_changed',
        snapshot => {
            uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        error => {
            uploadError = error.message;
        },
        async () => {
            try {
                downloadURL = await storage.ref(file_path).child(file_name + "_" + datetime).getDownloadURL();
                uploadSuccess = true;
            } catch (error) {
                uploadError = error.message;
            }
        });
    return { downloadURL, uploadProgress, uploadError, uploadSuccess };
}*/