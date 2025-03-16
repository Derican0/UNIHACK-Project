// test-upload.js
import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the values for your test
const USER_ID = ''; // Add your real user ID here
const CHALLENGE_ID = ''; // Add your real challenge ID here
const IMAGE_PATH = path.join(__dirname, 'test-image.jpg'); // Path to your test image

async function testUpload() {
  console.log('Testing challenge photo upload...');
  
  // Check if a user ID was provided
  if (!USER_ID) {
    console.error('Error: Please add a valid USER_ID in the script');
    return;
  }
  
  // Check if a challenge ID was provided
  if (!CHALLENGE_ID) {
    console.error('Error: Please add a valid CHALLENGE_ID in the script');
    return;
  }
  
  // Check if the test image exists
  if (!fs.existsSync(IMAGE_PATH)) {
    console.error(`Error: Test image not found at ${IMAGE_PATH}`);
    return;
  }
  
  try {
    // Create form data
    const formData = new FormData();
    formData.append('challengeId', CHALLENGE_ID);
    formData.append('photo', fs.createReadStream(IMAGE_PATH));
    
    console.log(`Uploading test image for User ID: ${USER_ID}, Challenge ID: ${CHALLENGE_ID}`);
    
    // Make the request
    const response = await fetch(`http://localhost:5000/api/users/${USER_ID}/complete-challenge`, {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(result, null, 2));
    
    if (result.success && result.photoUrl) {
      console.log('\nSUCCESS! 🎉');
      console.log('Photo URL:', result.photoUrl);
      console.log('You can visit this URL in your browser to verify the upload worked correctly.');
    } else {
      console.log('\nUpload may have failed. Check the response data above.');
    }
  } catch (error) {
    console.error('Error during test:', error.message);
  }
}

// Run the test
testUpload();