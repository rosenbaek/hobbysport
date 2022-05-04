import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, firestore } from "../firebase";

const now = new Date();

const initialEvent = {
  name: "",
  description: "",
  type: "",
  sport: {},
  location: "",
  date: null,
  capacity: null,
  team_solo: "",
  participants: 0,
};

const types = ["Træning", "Turnering", "Kamp"];

const RegisterEvent = ({ toast }) => {
  const [event, setEvent] = useState(initialEvent);
  const [sports, setSports] = useState([]);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Checks that solo or team is selected
    if (event.team_solo === "") {
      toast.error("Please select a type of event");
      return;
    }
    try {
      const newEventRef = collection(firestore, "events");
      const newEvent = await addDoc(newEventRef, event);
      console.log(newEvent);
      if (newEvent.id !== null) {
        toast.success("Sporten blev tilføjet");
      } else {
        toast.error("Sporten blev ikke tilføjet");
      }
    } catch (e) {
      console.error(e);
    }
    console.log(event);
    setEvent(initialEvent);
    document.getElementById("registersport").reset();
  };

  useEffect(() => {
    console.log("test");
    firestore
      .collection("sports")
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          let _sports = [];
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            const _sport = { id: doc.id, ...doc.data() };
            _sports.push(_sport);
          });
          setSports(_sports);
        } else {
          toast.warn("Der er sket en fejl - beklager");
        }
      })
      .catch(() => {
        toast.warn("Der er sket en fejl - beklager");
      });
  }, []);
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-5 lg:py-10 mx-2 ">
      <h1 className="text-2xl lg:text-4xl">Register Event</h1>
      <div className="flex flex-col lg:flex-row  bg-slate-50 rounded-lg lg:max-w-4xl w-full">
        <div className=" w-full">
          <form
            className="flex flex-col mx-5"
            action=""
            id="registersport"
            onSubmit={handleSubmit}
          >
            <label className="text-lg" htmlFor="name">
              Event Navn
            </label>
            <input
              className="border-2 w-full rounded-lg px-2 py-2"
              type="text"
              id="name"
              onChange={handleChange}
              value={event.name}
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
              value={event.description}
              required
            />
            <label className="text-lg" htmlFor="type">
              Event type
            </label>
            <select
              id="type"
              className="border-2 w-full rounded-lg px-2 py-2"
              onChange={handleChange}
              value={event.type}
              required
            >
              <option hidden value="">
                Vælg Event type
              </option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="flex flex-col py-3">
              <label className="text-lg" htmlFor="hold">
                Hold event
              </label>
              <input
                type="radio"
                id="team_solo"
                name="hold"
                onChange={handleChange}
                value="hold"
                checked={event.team_solo === "hold"}
              />
              <label className="text-lg" htmlFor="solo">
                Solo event
              </label>
              <input
                type="radio"
                id="team_solo"
                name="solo"
                value="solo"
                onChange={handleChange}
                checked={event.team_solo === "solo"}
              />
            </div>
            <label className="text-lg" htmlFor="sport">
              Sport
            </label>
            <select
              id="sport"
              className="border-2 w-full rounded-lg px-2 py-2"
              onChange={handleChange}
              value={event.sport}
              required
            >
              <option hidden value="">
                Vælg Sport
              </option>
              {sports.map((sport) => (
                <option key={sport.id} value={sport.id}>
                  {sport.name}
                </option>
              ))}
            </select>
            <label className="text-lg" htmlFor="location">
              Lokation
            </label>
            <input
              type="text"
              className="border-2 w-full rounded-lg px-2 py-2"
              id="location"
              onChange={handleChange}
              value={event.location}
              required
            />
            <label className="text-lg" htmlFor="capacity">
              Deltagere
            </label>
            <input
              type="number"
              className="border-2 w-full rounded-lg px-2 py-2"
              id="capacity"
              onChange={handleChange}
              value={event.capacity}
              min="0"
              max="100"
              required
            />
            <label className="text-lg" htmlFor="date">
              Dato
            </label>
            <input
              type="datetime-local"
              className="border-2 w-full rounded-lg px-2 py-2 mb-5"
              id="date"
              onChange={handleChange}
              value={event.date}
              required
            />
            <button
              className="bg-red-500 py-3 px-3 rounded-b-lg w-full hover:bg-red-400"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterEvent;
