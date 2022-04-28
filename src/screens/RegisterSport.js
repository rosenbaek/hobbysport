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
    <div className="flex flex-col items-center justify-center gap-3 py-5 lg:py-10 mx-2 ">
      <h1 className="text-2xl lg:text-4xl">Register Sport</h1>
      <div className="flex flex-col lg:flex-row  bg-slate-50 rounded-lg lg:max-w-4xl w-full">
        <div className="border-r-2 w-full">
          <form className="flex flex-col mx-5" action="" id="registersport">
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
                className="border bg-red-500 rounded-lg px-2 py-2 hover:bg-red-400"
              >
                Tilføj
              </button>
            </div>

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
                className="border bg-red-500 rounded-lg px-2 py-2 hover:bg-red-400"
              >
                Tilføj
              </button>
            </div>

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
          </form>
          <button
            onClick={handleSubmit}
            className="bg-red-500 py-3 px-3 rounded-bl-lg w-full hover:bg-red-400"
          >
            Register
          </button>
        </div>

        <div className="flex flex-col lg:w-full lg:gap-0 justify-between py-5 mx-5 ">
          <div className="h-1/2">
            {sports.gear.length > 0 && (
              <h1 className="font-bold text-lg">Udstyr</h1>
            )}
            <ul>
              {sports.gear.map((gear, index) => (
                <div
                  key={index}
                  className="flex justify-between py-2 ml-4 w-full items-center"
                >
                  <li className="list-decimal">
                    <p className="max-w-sm break-words">{gear}</p>
                  </li>
                  <button
                    className="bg-red-500 hover:bg-red-400 rounded-lg mr-2 py-1 px-2"
                    id="removeGear"
                    value={gear}
                    onClick={removeFromList}
                  >
                    Fjern
                  </button>
                </div>
              ))}
            </ul>
          </div>

          <div className="h-1/2">
            {sports.rules.length > 0 && (
              <h1 className="font-bold text-lg">Regler</h1>
            )}
            <ol>
              {sports.rules.map((rule, index) => (
                <div
                  className="flex justify-between py-2 ml-4 w-full items-center"
                  key={index}
                >
                  <li className="list-decimal">
                    <p className="max-w-sm break-words">{rule}</p>
                  </li>
                  <button
                    className="bg-red-500 hover:bg-red-400 rounded-lg mr-2 py-1 px-2"
                    id="removeRule"
                    value={rule}
                    onClick={removeFromList}
                  >
                    Fjern
                  </button>
                </div>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSport;
