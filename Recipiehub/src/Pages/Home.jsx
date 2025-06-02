import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const [mealList, setMealList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRandomRecipes();
  }, []);

  async function fetchRandomRecipes() {
    setIsFetching(true);
    try {
      const requests = Array(6).fill().map(() =>
        fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(res => res.json())
      );

      const results = await Promise.all(requests);
      const meals = results.map(data => data.meals?.[0]).filter(Boolean);
      setMealList(meals);
    } catch (error) {
      console.error('Error fetching random recipes:', error);
    } finally {
      setIsFetching(false);
    }
  }

  async function searchRecipeHandler(event) {
    event.preventDefault();
    if (!inputValue.trim()) return;

    setIsFetching(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`);
      const data = await response.json();
      setMealList(data.meals || []);
    } catch (error) {
      console.error('Error searching recipes:', error);
    } finally {
      setIsFetching(false);
    }
  }

  return (
    <main className="py-10 px-5 min-h-screen bg-yellow-100">
      
      <header
        className="relative text-center mb-10 py-20 px-5 rounded-lg overflow-hidden w-full mx-auto"
        style={{backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1470&q=80)',backgroundSize: 'cover',backgroundPosition: 'center',}}
      >
       
        <div className="absolute inset-0 bg-black opacity-30 animate-zoomSlow" />
        
        <div className="relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold bg-white bg-clip-text text-transparent font-serif mb-4 leading-tight">
            Welcome to Recipe Hub
          </h2>
          <p className="text-gray-100 mt-3 text-lg max-w-2xl mx-auto">
            Find tasty recipes effortlessly — search by name or enjoy a random surprise!
          </p>
        </div>
      </header>

      
      <div className="relative z-10 max-w-7xl mx-auto">
        <form onSubmit={searchRecipeHandler} className="flex justify-center max-w-xl mx-auto gap-2 mb-10">
          <input type="text"value={inputValue}onChange={(e) => setInputValue(e.target.value)}placeholder="Type to search..."
            className="flex-grow border border-orange-300 p-2 rounded-l-md focus:ring-2 focus:ring-orange-400 text-sm"/>
          <button type="submit"className="bg-orange-600 text-white px-4 py-2 rounded-r-md hover:bg-orange-500 transition">Search</button>
        </form>

        <section className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {isFetching ? (
            <p className="col-span-full text-center text-gray-700">Loading recipes...</p>
          ) : mealList.length ? (
            mealList.map((meal) => (
              <div key={meal.idMeal}onClick={() => navigate(`/recipe/${meal.idMeal}`)}
                className="flex flex-col bg-white shadow-md rounded-xl border border-orange-200 hover:shadow-xl hover:-translate-y-1 hover:brightness-105 transition-all duration-300 cursor-pointer group">
                <div className="overflow-hidden rounded-t-xl">
                  <img src={meal.strMealThumb}alt={meal.strMeal}className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"/>
                </div>
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <h3 className="text-xl font-serif text-orange-700 font-bold mb-2">
                    {meal.strMeal}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                      {meal.strArea}
                    </span>
                    <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">
                      {meal.strCategory}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-700 mt-6">Recipe not found.</p>
          )}
        </section>
      </div>

      
      
    </main>
  );
};

export default Home;
