import { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { auth } from '../firebase';
import Modal from '../components/SportDetailsModal';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ toast }) => {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedSport, SetSelectedSport] = useState(null);
  const navigate = useNavigate();

  const createSport = () => {
    if (!auth.currentUser) {
      toast.error('Du skal logge ind for at oprette en sport');
    } else {
      navigate('/registersport');
    }
  };
  const seeMore = (sport) => {
    setShowModal(!showModal);
    SetSelectedSport(sport);
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
            className="border-2 border-[rgb(201,25,46)] rounded-lg py-2 px-2 w-full focus:outline-none active:outline-none"
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.currentTarget.value)}
            value={search}
          />
          <button
            className="w-full button-color rounded-lg font-bold py-2 border-[rgb(201,25,46)] button-hover"
            onClick={createSport}
          >
            Opret Sport
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  items-center lg:items-start ">
          {!loading &&
            sports.map((sport, index) => (
              <div
                key={index}
                className="relative rounded-lg  flex flex-col md:gap-2 bg-white text-black w-full text-xl cursor-pointer mx-auto shadow-xl"
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
                  <h2 className="px-3 py-3 text-sm lg:text-lg font-bold w-full text-center">
                    {sport.name}
                  </h2>

                  <button
                    className="button-color border-[rgb(201,25,46)] text-base rounded-b-lg w-full py-3 font-bold button-hover"
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
