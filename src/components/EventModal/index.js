import { motion } from 'framer-motion';
import BackDrop from '../Backdrop';
import { firestore, auth } from '../../firebase';
import { useEffect, useState } from 'react';
import {
  doc,
  updateDoc,
  query,
  where,
  collection,
  arrayUnion,
  getDocs,
} from 'firebase/firestore';

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

const Modal = ({ handleClose, event, toast }) => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState({});

  const getTeams = async () => {
    const teams = [];
    const q = query(
      collection(firestore, 'teams'),
      where('members', 'array-contains', auth.currentUser.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      teams.push({ id: doc.id, ...doc.data() });
    });

    setTeams(teams);
    setSelectedTeam(teams[0]);
  };

  const onChange = (e) => {
    e.preventDefault();
    setSelectedTeam({ ...teams.find((team) => team.id === e.target.value) });
  };
  const joinEvent = async () => {
    const eventRef = doc(firestore, 'events', event.id);
    if (event.team_solo === 'Solo') {
      const user = auth.currentUser;
      const userRef = doc(firestore, 'users', user.uid);

      if (event.participants.length < event.capacity) {
        if (event.participants.filter((p) => p.id === userRef.id).length > 0) {
          toast.error('Du deltager allerede');
          return;
        }

        await updateDoc(eventRef, {
          participants: arrayUnion(userRef),
        });
        toast.success('Du er nu deltager');
        handleClose();
      }
    } else if (event.team_solo === 'Hold') {
      if (event.participants.length < event.capacity) {
        const teamRef = doc(firestore, 'teams', selectedTeam.id);
        if (event.participants.filter((p) => p.id === teamRef.id).length > 0) {
          toast.error('Holdet deltager allerede');
          return;
        }
        await updateDoc(eventRef, {
          participants: arrayUnion(teamRef),
        });
        toast.success('Holdet er nu tilføjet');
        handleClose();
      }
    }
  };
  useEffect(() => {
    if (auth.currentUser) {
      getTeams();
    }
  }, []);
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
              <h3 className="text-3xl  text-center font-bold ">{event.name}</h3>
            </div>
            <label className="block text-black text-lg p-3">
              <strong>Sport: </strong>
              {event.sport.name}
            </label>
            <label className="block text-black text-lg p-3">
              <strong>Beskrivelse:</strong> {event.description}
            </label>
            <label className="block text-black text-lg  p-3">
              <strong>Type: </strong>
              {event.type}
            </label>

            <label className="block text-black text-lg p-3">
              <strong>Hold / Solo: </strong>
              {event.team_solo}
            </label>

            {auth.currentUser && (
              <div>
                {event.team_solo === 'Hold' && (
                  <div className=" p-3">
                    <div>
                      <label className="text-black text-lg font-bold py-2 mb-2">
                        Vælg hold
                      </label>
                      <select
                        onChange={onChange}
                        defaultValue={teams.length > 0 ? teams[0] : 'DEFAULT'}
                        className="text-black text-lg font-bold py-2 border-[1px] border-black  rounded-lg w-full"
                      >
                        {teams.length > 0 ? (
                          teams.map((team) => (
                            <option
                              key={team.id}
                              value={team.id}
                              className="py-2"
                            >
                              {team.name}
                            </option>
                          ))
                        ) : (
                          <option key={1337} disabled value="DEFAULT">
                            Du har ingen hold
                          </option>
                        )}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            )}
            <label className="block text-black text-lg  p-3">
              <strong>Lokation: </strong>
              {event.location}
            </label>
            <label className="block text-black text-lg p-3">
              <strong>Dato: </strong>
              {event.date.toLocaleString('da-DK', {
                dateStyle: 'full',
                timeStyle: 'short',
              })}
            </label>

            <label className="block text-black text-lg  p-3">
              <p>
                <strong>Kapacitet:</strong> {event.participants.length}/
                {event.capacity}{' '}
                {event.team_solo === 'Hold' ? 'hold' : 'deltagere'}
              </p>
            </label>

            <div className="flex rounded-b-lg gap-1">
              <button
                className={`button-color border-[rgb(201,25,46)] button-hover w-full background-transparent font-bold rounded-tr-lg uppercase px-6 py-3 text-sm outline-none focus:outline-none ${
                  auth.currentUser
                    ? 'rounded-bl-lg'
                    : 'rounded-b-lg rounded-tr-none'
                }`}
                type="button"
                onClick={handleClose}
              >
                Luk
              </button>
              {auth.currentUser && (
                <button
                  className={`${
                    teams.length === 0
                      ? 'bg-gray-500'
                      : 'button-color border-[rgb(201,25,46)] button-hover'
                  }  w-full background-transparent font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none rounded-tl-lg rounded-br-lg`}
                  type="button"
                  onClick={joinEvent}
                  disabled={
                    event.team_solo === 'Hold' && teams.length === 0
                      ? true
                      : false
                  }
                >
                  Tilmeld Event
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </BackDrop>
  );
};

export default Modal;
