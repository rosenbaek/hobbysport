const SportDetailsModal = ({ sport, setShowParentModal }) => {
  return (
    <div>
      <div className="bg-black opacity-50  absolute z-10 top-0 left-0 h-full w-full"></div>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-hidden absolute z-50 outline-none focus:outline-none h-max">
        <div className="relative w-full my-6 mx-auto max-w-3xl ">
          <div className="border-0 bg-white  rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
            <div className="text-center p-5 border-b border-solid border-[rgb(201,25,46)] rounded-t ">
              <h3 className="text-6xl font=semibold">{sport.name}</h3>
            </div>
            <div className="px-2 lg:px-5">
              <label className="block text-black text-sm   py-2">
                <strong>Beskrivelse: </strong> <br />
                {sport.description}
              </label>
              <label className="block text-black text-lg font-bold mb-1">
                {sport.rules && (
                  <div>
                    <label className="text-lg block ">Regler:</label>
                    <ul className="ml-8 text-sm">
                      {sport.rules.map((rule, index) => (
                        <li
                          key={index}
                          className="list-disc text-md font-normal pb-2"
                        >
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {sport.gear.length > 0 && (
                  <div>
                    <label className="text-lg  block">Gear:</label>
                    <ul className="ml-8 text-sm">
                      {sport.gear.map((gear, index) => (
                        <li
                          key={index}
                          className="list-disc text-md font-normal"
                        >
                          {gear}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </label>
            </div>
            <div className="flex items-center justify-end border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="button-color border-[rgb(201,25,46)] button-hover w-full background-transparent font-bold uppercase px-6 py-3 rounded-b-lg text-sm outline-none focus:outline-none"
                type="button"
                onClick={() => setShowParentModal(false)}
              >
                Luk
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportDetailsModal;
