import { createClient } from 'next-sanity'
const fs = require('fs');
const path = require('path');

import {
  dataset,
  projectId,
  useCdn,
  apiVersion,
} from '@/sanity/lib/api'

// Initialize Sanity client with your project-specific details
const client = createClient({
  projectId,
  dataset,
  useCdn,
  apiVersion,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const documentId = '87327cef-1bf1-4f1c-b71e-a642ea5422f4'; // The ID of the document to update
const jsonFilePath = './text.json'; // Path to your JSON file

// Function to update the document
async function updateDocument() {
  try {
    const data = fs.readFileSync(path.resolve(jsonFilePath), { encoding: 'utf8' });
    const body = JSON.parse(data);

    const result = await client
      .patch(documentId)
      .set({body: body})
      .commit();

    console.log('Document updated successfully:', result);
  } catch (err) {
    console.error('Error updating document:', err);
  }
}

updateDocument();

// sanity exec patchDocument.js --with-user-token
