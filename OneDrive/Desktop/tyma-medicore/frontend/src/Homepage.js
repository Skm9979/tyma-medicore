import React from 'react';

const Homepage = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-400 flex flex-col justify-center items-center">
    <header className="w-full max-w-4xl mx-auto text-center py-20">
      <h1 className="text-5xl md:text-6xl font-extrabold text-blue-800 mb-6 animate-fade-in-up">World-Class Disease Control AI</h1>
      <p className="text-xl md:text-2xl text-blue-900 mb-8 animate-fade-in-up delay-100">Predict, visualize, and control outbreaks with next-gen AI and Big Data.</p>
      <a href="/login" className="inline-block px-8 py-3 bg-blue-700 text-white font-bold rounded-full shadow-lg hover:bg-blue-800 transition text-lg animate-bounce">Get Started</a>
    </header>
    <section className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 animate-fade-in-up delay-200">
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <span className="text-4xl font-bold text-blue-700 mb-2 animate-pulse">99.9%</span>
        <span className="text-lg text-gray-700 font-semibold">Prediction Accuracy</span>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <span className="text-4xl font-bold text-blue-700 mb-2 animate-pulse">Real-Time</span>
        <span className="text-lg text-gray-700 font-semibold">Global Outbreak Map</span>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <span className="text-4xl font-bold text-blue-700 mb-2 animate-pulse">AI-Driven</span>
        <span className="text-lg text-gray-700 font-semibold">Anomaly Detection</span>
      </div>
    </section>
    <footer className="mt-20 text-gray-500 text-sm">&copy; {new Date().getFullYear()} Disease Control AI. All rights reserved.</footer>
  </div>
);

export default Homepage; 