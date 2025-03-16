const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || 'ambient-future-453822-g8';
const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME || 'look-natural';

console.log('Using Google Cloud Project ID:', projectId);
console.log('Using Google Cloud Bucket Name:', bucketName);
// services/storageService.js
import { Storage } from '@google-cloud/storage';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the current directory using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Log environment variables for debugging
console.log('Using Google Cloud Project ID:', process.env.GOOGLE_CLOUD_PROJECT_ID);
console.log('Using Google Cloud Bucket Name:', process.env.GOOGLE_CLOUD_BUCKET_NAME);

// Initialize storage with service account key file
const storage = new Storage({
  keyFilename: path.join(__dirname, '../config/ambient-future-453822-g8-7568d8e2d20b.json'), // Path to your key file
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || "ambient-future-453822-g8",
});

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME || "look-natural");

/**
 * Upload file to Google Cloud Storage
 * @param {Object} file - The file object from multer
 * @returns {Promise<string>} - The public URL of the uploaded file
 */
export const uploadFile = async (file) => {
  try {
    // Create a new blob in the bucket and upload the file data
    const fileName = `photos/${Date.now()}-${file.originalname}`;
    const blob = bucket.file(fileName);
    
    // Make a stream for uploading
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: file.mimetype,
        // Set predefined ACL for the file during upload instead of calling makePublic() later
        // This works with uniform bucket-level access enabled
        predefinedAcl: 'publicRead'
      },
    });

    // Return a Promise that resolves when upload completes
    return new Promise((resolve, reject) => {
      blobStream.on('error', (error) => {
        console.error('Error uploading to Google Cloud Storage:', error);
        reject(new Error('Unable to upload image, something went wrong'));
      });

      blobStream.on('finish', () => {
        // Create the public URL - no need to call makePublic() 
        // When using publicRead predefinedAcl or when bucket has uniform access control
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
        console.log('File uploaded successfully:', publicUrl);
        resolve(publicUrl);
      });

      blobStream.end(file.buffer);
    });
  } catch (error) {
    console.error('Storage service error:', error);
    throw new Error('Failed to upload file');
  }
};

/**
 * Delete file from Google Cloud Storage
 * @param {string} fileUrl - The public URL of the file to delete
 * @returns {Promise<void>}
 */
export const deleteFile = async (fileUrl) => {
  try {
    // Extract file path from URL
    const fileName = fileUrl.split(`${bucket.name}/`)[1];
    
    if (!fileName) {
      throw new Error('Invalid file URL');
    }
    
    // Delete the file
    await bucket.file(fileName).delete();
    console.log(`File ${fileName} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new Error('Failed to delete file');
  }
};

export default {
  uploadFile,
  deleteFile
};