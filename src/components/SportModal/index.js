import { motion } from 'framer-motion';
import BackDrop from '../Backdrop';

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const Modal = ({ handleClose, sport }) => {
  return (
    <BackDrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal bg-white h-fit rounded-lg"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="h-full w-full">
          <div className="">
            <div className="w-full border-b-2 py-3 border-[rgb(201,25,46)] ">
              <h3 className="text-3xl text-center font-bold ">{sport.name}</h3>
            </div>
            <div className="mx-2">
              <label className="">
                <strong>Beskrivelse: </strong> <br />
                {sport.description}
              </label>
              {sport.rules.length > 0 && (
                <div className="pt-2">
                  <label className="font-bold">Regler:</label>
                  <ol className="ml-4">
                    {sport.rules.map((rule, index) => (
                      <li
                        key={index}
                        className="list-decimal mb-2 border-[rgb(201,25,46)] border-b-2"
                      >
                        {rule}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {sport.gear.length > 0 && (
                <div className="mb-3">
                  <label className="font-bold">Gear:</label>
                  <ol className="ml-8">
                    {sport.gear.map((gear, index) => (
                      <li key={index} className="list-disc">
                        {gear}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
          <button
            className="button-color border-[rgb(201,25,46)] button-hover w-full rounded-b-lg font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none"
            type="button"
            onClick={handleClose}
          >
            Luk
          </button>
        </div>
      </motion.div>
    </BackDrop>
  );
};

export default Modal;
