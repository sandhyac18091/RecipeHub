import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter, FaPinterest, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [otherRecipes, setOtherRecipes] = useState([]);
  const ingredientsRef = useRef(null);

  useEffect(() => {
    async function fetchRecipe() {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipe(data.meals?.[0]);
    }

    async function fetchOtherRecipes() {
      const requests = Array(5).fill().map(() =>
        fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(res => res.json())
      );

      const results = await Promise.all(requests);
      const meals = results.map(res => res.meals?.[0]).filter(Boolean);
      setOtherRecipes(meals);
    }

    fetchRecipe();
    fetchOtherRecipes();
  }, [id]);

  function getIngredients(recipe) {
    const ingredientsList = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== '') {
        ingredientsList.push(`${ingredient} - ${measure}`);
      }
    }
    return ingredientsList;
  }

  const scrollUp = () => {
    if (ingredientsRef.current) {
      ingredientsRef.current.scrollBy({ top: -80, behavior: 'smooth' });
    }
  };

  const scrollDown = () => {
    if (ingredientsRef.current) {
      ingredientsRef.current.scrollBy({ top: 80, behavior: 'smooth' });
    }
  };

  if (!recipe) {
    return <p className="text-center mt-10 text-lg font-semibold text-gray-600">Loading recipe...</p>;
  }

  return (
    <main
      className="max-w-7xl mx-auto min-h-screen p-6 font-serif"
      style={{ fontFamily: "'Merriweather', serif" }}
    >
      
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold text-orange-700 drop-shadow-md">{recipe.strMeal}</h1>
        <p className="text-gray-600 text-lg mt-2">
          <span className="font-semibold">{recipe.strCategory}</span> | <span className="italic">{recipe.strArea}</span>
        </p>
        <p className="text-sm text-gray-500 italic mt-1">Estimated cooking time: ~45 mins</p>
      </section>

      
      <section className="flex gap-10 rounded-xl shadow-lg overflow-hidden mb-14" style={{ minHeight: '400px' }}>
        
        <div className="w-1/2 relative">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>

        
        <div className="w-1/2 bg-orange-50 p-10 flex flex-col justify-center ">
          <h3 className="text-3xl font-semibold text-orange-600 mb-4 border-b border-orange-300 pb-3">
            Ingredients
          </h3>

          
          <ul
            ref={ingredientsRef}
            className="list-disc ml-6 space-y-3 text-gray-700 text-lg max-h-[350px] overflow-y-scroll scrollbar-none pr-4"
            style={{
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none' 
            }}
          >
            {getIngredients(recipe).map((item, index) => (
              <li
                key={index}
                className="hover:text-orange-700 transition-colors duration-200"
              >
                {item}
              </li>
            ))}
          </ul>

          
          <button
            onClick={scrollDown}
            aria-label="Scroll ingredients down"
            className="self-center mt-2 text-orange-700 hover:text-orange-900 transition-colors"
          >
            <FaArrowDown size={20} />
          </button>
        </div>
      </section>

      <section className="mt-14 bg-white p-8 rounded-xl shadow-lg max-w-full md:max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold text-orange-600 mb-4 border-b border-orange-300 pb-2">
          Instructions
        </h3>
        <p className="text-gray-800 leading-relaxed whitespace-pre-line text-lg">{recipe.strInstructions}</p>
      </section>

      <section className="mt-16 text-center">
        <h3 className="text-2xl font-semibold text-orange-600 mb-6">Share this recipe</h3>
        <div className="flex justify-center gap-8 text-orange-700 text-3xl">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-600 hover:scale-125 transition-transform"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 hover:scale-125 transition-transform"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=Check out this recipe!`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-500 hover:scale-125 transition-transform"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href={`https://pinterest.com/pin/create/button/?url=${window.location.href}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-600 hover:scale-125 transition-transform"
            aria-label="Pinterest"
          >
            <FaPinterest />
          </a>
        </div>
      </section>

      
      <section className="mt-20">
        <h3 className="text-2xl font-semibold text-orange-600 mb-6 font-serif">You might also like</h3>
        <div className="flex gap-6 overflow-x-auto pb-6">
          {otherRecipes.map((item) => (
            <div
              key={item.idMeal}
              className="min-w-[220px] flex-shrink-0 bg-white rounded-xl shadow-md cursor-pointer hover:scale-105 transition-transform"
              onClick={() => navigate(`/recipe/${item.idMeal}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') navigate(`/recipe/${item.idMeal}`);
              }}
              
            >
              <img
                src={item.strMealThumb}
                alt={item.strMeal}
                className="w-full h-40 object-cover rounded-t-xl"
                loading="lazy"
              />
              <div className="p-3">
                <h4 className="text-md font-semibold text-orange-700 truncate font-serif scrollbar-none">{item.strMeal}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default RecipeDetails;
