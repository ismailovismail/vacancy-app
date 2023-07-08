import { FilesCollection } from 'meteor/ostrio:files';

export const Users_Files = new FilesCollection({
    collectionName: 'users_files',
    storagePath: '/Users/User/Desktop/test',
    allowClientCode: false, // Disallow remove files from Client
    onBeforeUpload(file) {
        // Allow upload files under 10MB, and only in png/jpg/jpeg formats
        if (file.size <= 10485760 && /png|jpg|jpeg|pdf/i.test(file.extension)) {
            return true;
        }
        return 'Please upload file, with size equal or less than 10MB';
    }
});
