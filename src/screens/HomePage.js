import { useState, useEffect } from 'react';

const HomePage = () => {
  //Array of 20 random numbers

  const [search, setSearch] = useState('');
  const numbers = Array.from({ length: 20 }, () =>
    Math.floor(Math.random() * 20)
  );

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col lg:flex-row justify-between py-10 gap-3 w-full">
          <input
            className="border-2 border-gray-500 rounded-lg py-2 w-full focus:outline-none active:outline-none"
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.currentTarget.value)}
            value={search}
          />
          <button className="w-full bg-red-500 rounded-lg font-medium h-12 hover:bg-red-600">
            Register Sport
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 items-center lg:items-start gap-5 ">
          {numbers.map((number) => (
            <div className=" rounded-lg border border-black flex flex-col gap-2 bg-white text-black w-full  pb-5 text-xl cursor-pointer hover:scale-[1.02] mx-auto">
              <div className="w-full bg-red-500 rounded-t-lg h-full">
                <h2 className="px-3 py-3 text-lg font-bold text-center">
                  {number}
                </h2>
              </div>
              <div className="px-3">
                <ul>
                  <li>Best sport ever, we hit stuffs with a bat</li>
                  <li>
                    {' '}
                    <strong>Type:</strong> Hold sport 🔥
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default HomePage;
