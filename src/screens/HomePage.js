import { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedSport, SetSelectedSport] = useState(null);
  const navigate = useNavigate();

  const seeMore = (sport) => {
    setShowModal(!showModal);
    SetSelectedSport(sport);
    console.log('see mere');
  };
  useEffect(() => {
    const unsubscribe = firestore
      .collection('sports')
      .onSnapshot((snapshot) => {
        setLoading(true);
        if (snapshot.size) {
          let myDataArray = [];
          snapshot.forEach((doc) =>
            myDataArray.push({ id: doc.id, ...doc.data() })
          );

          setSports(myDataArray);
          setLoading(false);
        }
      });

    return () => {
      unsubscribe();
    };
  }, [firestore]);

  const [search, setSearch] = useState('');

  return (
    <>
      {showModal && (
        <Modal
          sport={selectedSport}
          show={showModal}
          setShowParentModal={setShowModal}
        />
      )}
      <div className="flex flex-col mx-1">
        <div className="flex flex-col lg:flex-row justify-between py-10 gap-3 w-full">
          <input
            className="border-2 border-gray-500 rounded-lg py-2 px-2 w-full focus:outline-none active:outline-none"
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.currentTarget.value)}
            value={search}
          />
          <button
            className="w-full bg-red-500 rounded-lg font-bold h-12 hover:bg-red-400"
            onClick={() => navigate('/registersport')}
          >
            Register Sport
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  items-center lg:items-start gap-5 ">
          {!loading &&
            sports.map((sport, index) => (
              <div
                key={index}
                className="justify-between relative rounded-lg border border-black flex flex-col gap-2 bg-white text-black w-full text-xl cursor-pointer mx-auto"
              >
                <img
                  className="rounded-t-lg w-full h-48"
                  src={
                    sport.image
                      ? sport.image
                      : 'https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?cs=srgb&dl=pexels-pixabay-356079.jpg&fm=jpg'
                  }
                  alt="temp"
                />

                <div className="">
                  <h2 className="px-3 py-3 text-lg font-bold">{sport.name}</h2>
                  <ul className="px-3 pb-3">
                    <li>{sport.description}</li>
                  </ul>

                  <button
                    className="bg-red-500 rounded-b-lg w-full py-3 font-medium hover:bg-red-400"
                    onClick={() => {
                      seeMore(sport);
                    }}
                  >
                    Se mere
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default HomePage;
