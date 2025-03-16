// services/visionService.js
import vision from '@google-cloud/vision';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the current directory using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize vision client
const client = new vision.ImageAnnotatorClient({
  keyFilename: path.join(__dirname, '../config/google-cloud-key.json'),
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
});

/**
 * Verify challenge completion by analyzing image with Vision API
 * @param {string} imageUrl - URL of the image to analyze
 * @param {Array<string>} verificationTags - List of tags to verify against
 * @param {number} minimumMatchThreshold - Minimum number of tags that should match (default: 1)
 * @returns {Promise<Object>} - Verification result
 */
export const verifyChallenge = async (imageUrl, verificationTags, minimumMatchThreshold = 1) => {
  try {
    console.log('Verifying image with Google Cloud Vision API:', imageUrl);
    console.log('Verification tags:', verificationTags);
    
    // Perform label detection on the image
    const [result] = await client.labelDetection(imageUrl);
    const labels = result.labelAnnotations;
    
    // Extract all detected labels
    const detectedLabels = labels.map(label => ({
      description: label.description.toLowerCase(),
      confidence: label.score
    }));
    
    console.log('Detected labels:', detectedLabels.map(l => `${l.description} (${(l.confidence * 100).toFixed(1)}%)`));
    
    // Check for matches between verification tags and detected labels
    const matchedTags = [];
    
    verificationTags.forEach(tag => {
      const normalizedTag = tag.toLowerCase().trim();
      // Check if any detected label contains this tag
      const matchingLabels = detectedLabels.filter(label => 
        label.description.includes(normalizedTag) || normalizedTag.includes(label.description)
      );
      
      if (matchingLabels.length > 0) {
        // Find the highest confidence match
        const bestMatch = matchingLabels.reduce((best, current) => 
          current.confidence > best.confidence ? current : best, matchingLabels[0]);
        
        matchedTags.push({
          tag: normalizedTag,
          confidence: bestMatch.confidence,
          matchedWith: bestMatch.description
        });
      }
    });
    
    console.log('Matched tags:', matchedTags.map(m => `${m.tag} -> ${m.matchedWith} (${(m.confidence * 100).toFixed(1)}%)`));
    
    // Determine if verification passes based on number of matched tags
    const isVerified = matchedTags.length >= minimumMatchThreshold;
    
    return {
      verified: isVerified,
      matchedTags: matchedTags.map(m => m.tag),
      matchedDetails: matchedTags,
      allDetectedLabels: detectedLabels.map(l => l.description),
      minimumMatchThreshold,
      matchesFound: matchedTags.length
    };
  } catch (error) {
    console.error('Vision API error:', error);
    // If Vision API fails, default to manual verification
    return {
      verified: true, // Default to true for now
      matchedTags: [],
      matchedDetails: [],
      allDetectedLabels: [],
      error: error.message,
      minimumMatchThreshold,
      matchesFound: 0
    };
  }
};

export default {
  verifyChallenge
};