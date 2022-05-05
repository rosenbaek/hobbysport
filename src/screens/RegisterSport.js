import { useState } from 'react';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const initialSport = {
  name: '',
  description: '',
  gear: [],
  rules: [],
  image: '',
};

const RegisterSport = ({ toast }) => {
  const [sports, setSports] = useState(initialSport);
  const [rule, setRule] = useState('');
  const [gear, setGear] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSports({ ...sports, [e.target.id]: e.target.value });
  };

  const newSportRef = collection(firestore, 'sports');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sports.rules.length === 0 || sports.rules.length > 25) {
      toast.warn('Fejl - Minimum én regel og maks 25 regler');
    } else if (sports.gear.length > 10) {
      toast.warn('For meget udstyr - Max 10');
    } else {
      try {
        const newSport = await addDoc(newSportRef, sports);
        console.log(newSport);
        if (newSport.id !== null) {
          toast.success('Sporten blev tilføjet');
        } else {
          toast.error('Sporten blev ikke tilføjet');
        }
      } catch (e) {
        console.error(e);
      }
      setSports(initialSport);
      navigate('/');
    }
  };
  const handleList = (e) => {
    if (e.target.id === 'rule') {
      setRule(e.target.value);
    } else if (e.target.id === 'gear') {
      setGear(e.target.value);
    }
  };

  const addToList = (e) => {
    e.preventDefault();
    if (e.target.id === 'addRule') {
      setSports({ ...sports, rules: [...sports.rules, rule] });
      setRule('');
    } else if (e.target.id === 'addGear') {
      setSports({ ...sports, gear: [...sports.gear, gear] });
      setGear('');
    }
  };

  const removeFromList = (e) => {
    e.preventDefault();
    if (e.target.id === 'removeRule') {
      setSports({
        ...sports,
        rules: sports.rules.filter((rule) => rule !== e.target.value),
      });
    } else if (e.target.id === 'removeGear') {
      setSports({
        ...sports,
        gear: sports.gear.filter((gear) => gear !== e.target.value),
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 py-5 lg:py-10 mx-2">
      <div className="rounded-lg shadow-2xl py-3 lg:max-w-4xl w-full h-fit mb-3">
        <h1 className="text-2xl lg:text-4xl text-center w-full py-2">
          Opret Sport
        </h1>
        <div className="flex flex-col lg:flex-row  ">
          <div className="border-b-2 lg:border-b-0 lg:border-r-2 border-[rgb(201,25,46)] w-full flex flex-col">
            <form
              className="flex flex-col mx-5 h-full"
              action=""
              id="registersport"
            >
              <div>
                <label className="text-lg" htmlFor="name">
                  Sport Navn
                </label>
                <input
                  className="border-2 w-full rounded-lg px-2 py-2"
                  type="text"
                  id="name"
                  onChange={handleChange}
                  value={sports.name}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg" htmlFor="description">
                  Beskrivelse
                </label>
                <textarea
                  className="border-2  rounded-lg px-2 py-2"
                  rows="4"
                  form="registersport"
                  id="description"
                  onChange={handleChange}
                  value={sports.description}
                  required
                />
              </div>
              <div>
                <label className="text-lg" htmlFor="gear">
                  Udstyr
                </label>
                <div className="w-full flex gap-2">
                  <input
                    className="border-2 rounded-lg px-2 py-2 w-full"
                    type="text"
                    id="gear"
                    onChange={handleList}
                    value={gear}
                  />
                  <button
                    id="addGear"
                    onClick={addToList}
                    className="button-color rounded-lg px-2 py-2 button-hover"
                  >
                    Tilføj
                  </button>
                </div>
              </div>
              <div>
                <label className="text-lg" htmlFor="rule">
                  Regler
                </label>
                <div className="w-full flex gap-2">
                  <input
                    className="border-2 rounded-lg px-2 py-2 w-full"
                    type="text"
                    id="rule"
                    onChange={handleList}
                    value={rule}
                  />
                  <button
                    id="addRule"
                    onClick={addToList}
                    className="button-color rounded-lg px-2 py-2 button-hover"
                  >
                    Tilføj
                  </button>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-lg" htmlFor="image">
                  Billede link
                </label>
                <input
                  className="border-2 rounded-lg mb-5 px-2 py-2"
                  type="text"
                  id="image"
                  onChange={handleChange}
                  value={sports.image}
                />
              </div>
              <button
                onClick={handleSubmit}
                className="button-color uppercase font-bold text-normal py-3 px-3 mb-3 lg:mb-0 rounded-lg w-full button-hover"
              >
                Opret sport
              </button>
            </form>
          </div>

          <div className="flex flex-col lg:w-full lg:gap-0 justify-between  mx-5 h-fit py-2">
            <div className="min-h-[50%]">
              {sports.gear.length > 0 && (
                <h1 className="font-bold text-lg p-0 m-0">Udstyr</h1>
              )}
              <ol className="flex flex-col gap-0 py-0 my-0 ">
                {sports.gear.map((gear, index) => (
                  <div
                    key={index}
                    className="flex justify-between ml-4 w-full items-end border-b-2 border-dashed border-[rgb(201,25,46)]"
                  >
                    <li className="list-decimal">
                      <p className="max-w-sm break-words">{gear}</p>
                    </li>
                    <button
                      className="button-color border-[rgb(201,25,46)] button-hover rounded-full my-1 px-3"
                      id="removeGear"
                      value={gear}
                      onClick={removeFromList}
                    >
                      Slet
                    </button>
                  </div>
                ))}
              </ol>
            </div>

            <div className="min-h-[50%] mt-2">
              {sports.rules.length > 0 && (
                <h1 className="font-bold text-lg">Regler</h1>
              )}
              <ol className="flex flex-col gap-0 py-0 my-0 h-fit">
                {sports.rules.map((rule, index) => (
                  <div
                    className="flex justify-between ml-4 w-full items-end border-b-2 border-dashed border-[rgb(201,25,46)]"
                    key={index}
                  >
                    <li className="list-decimal">
                      <p className="max-w-sm break-words">{rule}</p>
                    </li>
                    <button
                      className="button-color border-[rgb(201,25,46)] button-hover rounded-full my-1 px-3"
                      id="removeRule"
                      value={rule}
                      onClick={removeFromList}
                    >
                      Slet
                    </button>
                  </div>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSport;
