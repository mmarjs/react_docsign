//TODO: this is getting phased out. and replaced with _services_data

import { storage } from '../_services/firebase';

import { createTimeStamp } from '../_services/momentHelper';
import { notification } from 'antd';
import api from './api/_handler';

async function v2uploadDocument(props) {
    const {
        file_data,
        file_name,
        file_path
    } = props

    const full_path = file_path + "/" + file_name
    const datetime = createTimeStamp().replaceAll(":", "-")
    console.log("ffff: ",+"/"+datetime)
    //const file_name = emp_id + " " + file_category + " " + datetime + "." + file_data.name.split(".").pop()
    const uploadTask = storage.ref(full_path+"_"+datetime).put(file_data)
    await uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            // console.log("progress: ", progress)
        },
        (error) => {
            notification.error({
                message: 'Failed!',
                description: 'Upload file failure!',
                duration: 5
            });
        },
        async () => {
            await storage
                .ref(file_path)
                .child(file_name+"_"+datetime)
                .getDownloadURL()
                .then(async (url) => {
                 
                        notification.success({
                            message: 'Success!',
                            description: 'Upload file success!',
                            duration: 5
                        });
                    
                    return url
                })
        }
    )
}

async function uploadDocument(createEmployeeDocumentUrlobject, file_path, file_data, emp_id, file_category, callback, callback_data) {
    const datetime = createTimeStamp().replaceAll(":", "-")
    const file_name = emp_id + " " + file_category + " " + datetime + "." + file_data.name.split(".").pop()
    const uploadTask = storage.ref(file_path + "/" + file_name).put(file_data)
    await uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            // console.log("progress: ", progress)
        },
        (error) => {
            notification.error({
                message: 'Failed!',
                description: 'Upload file failure!',
                duration: 5
            });
        },
        async () => {
            await storage
                .ref("users/personal_documents")
                .child(file_name)
                .getDownloadURL()
                .then(async (url) => {
                    if (createEmployeeDocumentUrlobject) {
                        await createEmployeeDocumentUrl(createEmployeeDocumentUrlobject, url)
                        await callback(callback_data, url)

                    }
                    else if (callback) {

                        await callback(callback_data, url)
                    }
                    else {
                        notification.success({
                            message: 'Success!',
                            description: 'Upload file success!',
                            duration: 5
                        });
                    }
                    return url
                })
        }
    )
}


async function createEmployeeDocumentUrl(createEmployeeDocumentUrlobject, url) {



    const submitData = await {
        id_2v_master_documents: createEmployeeDocumentUrlobject.id_2v_master_documents,
        document_url: url,
        id_user: createEmployeeDocumentUrlobject.id_user,
        approved: createEmployeeDocumentUrlobject.approved,
    };
    var temp = JSON.parse(localStorage.getItem("redux"))


    return await api.handler

        .api_post({ auth: temp.bearer, ...submitData }, 'createEmployeeDocumentUrl')
        .then(res => {
            if (res.success) {
                notification.success({
                    message: 'Success!',
                    description: 'Upload file success!',
                    duration: 5
                });
                return true
            } else {
                console.error('handled error', res);
                notification.error({
                    message: 'Failed!',
                    description: 'Upload file failure!',
                    duration: 5
                });
                return false
            }

        })
        .catch(err => {
            console.error('Unhandled Error', err);
            notification.error({
                message: 'Failed!',
                description: 'Upload file failure!',
                duration: 5
            });

        });

}




export default v2uploadDocument;