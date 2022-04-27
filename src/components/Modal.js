const Modal = ({ sport, setShowParentModal }) => {
  return (
    <div>
      <div className="bg-black opacity-50  absolute z-10 top-0 left-0 h-screen w-screen"></div>
      <div className="flex  justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 bg-white  rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-6xl font=semibold">{sport.name}</h3>
            </div>
            <div className="relative p-6 flex-auto">
              <label className="block text-black text-lg font-bold py-2">
                {sport.description}
              </label>
              <label className="block text-black text-lg font-bold mb-1">
                {sport.rules && (
                  <div>
                    <label className="text-lg block ">Regler</label>
                    <ul className="ml-8">
                      {sport.rules.map((rule, index) => (
                        <li key={index} className="list-disc">
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {sport.gear && (
                  <div>
                    <label className="text-lg block">Gear</label>
                    <ul className="ml-8">
                      {sport.gear.map((gear, index) => (
                        <li key={index} className="list-disc">
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
                className="bg-red-500 w-full background-transparent font-bold uppercase px-6 py-3 rounded-b-lg text-sm outline-none focus:outline-none"
                type="button"
                onClick={() => setShowParentModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
