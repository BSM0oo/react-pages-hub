import React from 'react';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Test Page
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            This is a test page to verify that new .tsx files are automatically discovered 
            and added to the table of contents.
          </p>
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <strong>Success!</strong> If you can see this page in the table of contents, 
            the automatic discovery feature is working correctly.
          </div>
          <p className="text-gray-600">
            This page was created to test the automatic file discovery functionality 
            of the React Pages Hub.
          </p>
        </div>
      </div>
    </div>
  );
}
