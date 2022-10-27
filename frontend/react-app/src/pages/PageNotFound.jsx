import React, { useState } from 'react';

export const PageNotFound = () => {

  return (
    <div className="flex h-screen overflow-hidden">
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="max-w-2xl m-auto mt-16">
              <div className="text-center px-4">
                <div className="mb-6">Hmm...this page doesn’t exist. Try searching for something else!</div>
              </div>
            </div>
          </div>
        </main>
    </div>
  );
}