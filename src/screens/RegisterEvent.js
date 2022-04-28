import { useState } from 'react';
const initialEvent = {
  name: '',
  description: '',
  type: false,
  sport: {},
  location: '',
  date: null,
  capacity: 0,
};

const RegisterEvent = () => {
  const [event, setEvent] = useState(initialEvent);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.id]: e.target.value });
  };
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-5 lg:py-10 mx-2 ">
      <h1 className="text-2xl lg:text-4xl">Register Event</h1>
      <div className="flex flex-col lg:flex-row  bg-slate-50 rounded-lg lg:max-w-4xl w-full">
        <div className=" w-full">
          <form className="flex flex-col mx-5" action="" id="registersport">
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
            <div className="flex flex-col py-3">
              <label className="text-lg" htmlFor="hold">
                Hold event
              </label>
              <input
                type="radio"
                id="hold"
                name="type"
                onChange={handleChange}
                value={true}
                checked
              />
              <label className="text-lg" htmlFor="solo">
                Solo event
              </label>
              <input type="radio" id="type" name="type" value={false} />
            </div>
            <label className="text-lg" htmlFor="description">
              Sport
            </label>
            <input
              type="text"
              className="border-2 w-full rounded-lg px-2 py-2"
            />
            <label className="text-lg" htmlFor="description">
              Sted
            </label>
            <input
              type="text"
              className="border-2 w-full rounded-lg px-2 py-2"
            />
            <label className="text-lg" htmlFor="description">
              Dato
            </label>
            <input
              type="datetime-local"
              className="border-2 w-full rounded-lg px-2 py-2 mb-5"
            />
          </form>
          <button className="bg-red-500 py-3 px-3 rounded-b-lg w-full hover:bg-red-400">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterEvent;
