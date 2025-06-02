import React from "react";

function SplashScreen() {
  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://media.newyorker.com/photos/66f6e7a4cc0d611ae4362ac3/4:3/w_1216,h_912,c_limit/20240905_new-yorker_all-recipes_animation_final%20(1).gif')",
      }}
    >
     
      <div className="absolute inset-0 bg-black/50" />

      
      <div className="relative z-10 backdrop-blur-md bg-white/20 border border-white/30 rounded-3xl p-10 max-w-xl mx-4 text-center shadow-2xl animate-fadeIn min-h-[18rem] flex flex-col justify-center">
        <h1 className="text-5xl font-extrabold text-red-600 font-serif drop-shadow mb-4 animate-pulse">
          🍽️ Recipe Hub
        </h1>
        <p className="text-white text-lg italic leading-relaxed drop-shadow">
          "Where passion meets the plate — discover, cook, and share your favorite recipes with the world."
        </p>
      </div>

      
      
    </div>
  );
}

export default SplashScreen;
