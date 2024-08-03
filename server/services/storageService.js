import { ID, InputFile } from "node-appwrite";
import storage from "../config/appwrite.config.js";
class StorageService {
    constructor(bucketId) {
        this.bucketId = bucketId;
    }
    async  uploadFile (filePath,fileName){
        try {
            if(!filePath){
                throw new Error('File path is required');
            }
            const result = await storage.createFile(
                this.bucketId,
                ID.unique(),
                InputFile.fromPath(filePath, fileName)
            );
            return result;
        } catch (error) {
            return error;
        }
    }
    async updateFile(fileId,filePath){
        try {
            const result = await storage.updateFile(this.bucketId,
                fileId, 
                InputFile.fromPath(filePath)
            );
            return result;
        } catch (error) {
          return error;  
        }
    }
    async deleteFile(fileId){
        try {
            const result = await storage.deleteFile(
                this.bucketId,
                fileId 
            );
            return result; 
        } catch (error) {
            return error;
        }
    }
    async getFilePreview(fileId) {
        try {
            const result = await storage.getFileView(
                this.bucketId, // bucketId
                fileId);
            return result;
        } catch (error) {
            return error;
        }
    }
}

export default StorageService;