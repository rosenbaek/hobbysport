import { firestore, auth } from '../firebase';
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

const EventDetailsModal = ({ event, setShowParentModal, toast }) => {
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
      //   console.log(teams);
    });

    setTeams(teams);
    setSelectedTeam(teams[0]);
  };

  const onChange = (e) => {
    e.preventDefault();
    setSelectedTeam({ ...teams.find((team) => team.id === e.target.value) });
    // console.log(selectedTeam);
  };
  const joinEvent = async () => {
    const eventRef = doc(firestore, 'events', event.id);
    if (event.team_solo === 'Solo') {
      const user = auth.currentUser;
      const userRef = doc(firestore, 'users', user.uid);

      if (event.participants.length < event.capacity) {
        if (event.participants.filter((p) => p.id === userRef.id).length > 0) {
          toast.error('Du er allerede deltager');
          return;
        }

        await updateDoc(eventRef, {
          participants: arrayUnion(userRef),
        });
        toast.success('Du er nu deltager');
        setShowParentModal(false);
      }
    } else if (event.team_solo === 'Hold') {
      if (event.participants.length < event.capacity) {
        const teamRef = doc(firestore, 'teams', selectedTeam.id);
        if (event.participants.filter((p) => p.id === teamRef.id).length > 0) {
          toast.error('Holdet er allerede deltager');
          return;
        }
        await updateDoc(eventRef, {
          participants: arrayUnion(teamRef),
        });
        toast.success('Holdet er nu tilføjet');
        setShowParentModal(false);
      }
    }
  };
  useEffect(() => {
    if (auth.currentUser) {
      getTeams();
    }
  }, []);
  return (
    <div>
      <div className="bg-black opacity-50  absolute z-10 top-0 left-0 h-screen w-screen"></div>
      <div className="flex  justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-full max-w-3xl rounded-lg">
          <div className="border-0 bg-white  rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
            <div className="p-5 border-b-2 border-solid border-[rgb(201,25,46)] rounded-t text-center">
              <h3 className="text-6xl font-bold ">{event.name}</h3>
            </div>
            <div className="relative p-3">
              <label className="block text-black text-lg py-2">
                <strong>Sport: </strong>
                {event.sport.name}
              </label>
            </div>
            <div className="relative p-3">
              <label className="block text-black text-lg py-2">
                <strong>Beskrivelse:</strong> {event.description}
              </label>
            </div>
            <div className="relative p-3">
              <label className="block text-black text-lg  py-2">
                <strong>Type: </strong>
                {event.type}
              </label>
            </div>
            <div className="relative p-3">
              <label className="block text-black text-lg py-2">
                <strong>Hold / Solo: </strong>
                {event.team_solo}
              </label>
            </div>
            {event.team_solo === 'Hold' && (
              <div className="relative flex-auto p-3">
                <div>
                  <label className="block text-black text-lg font-bold py-2 mb-2">
                    Vælg hold
                  </label>
                  <select
                    onChange={onChange}
                    defaultValue={teams.length > 0 ? teams[0] : 'DEFAULT'}
                    className="block text-black text-lg font-bold py-2 border-[1px] border-black  rounded-lg w-full"
                  >
                    {teams.length > 0 ? (
                      teams.map((team) => (
                        <option key={team.id} value={team.id} className="py-2">
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

            <div className="relative p-3">
              <label className="block text-black text-lg  py-2">
                <strong>Lokation: </strong>
                {event.location}
              </label>
            </div>
            <div className="relative p-3">
              <label className="block text-black text-lg py-2">
                <strong>Dato: </strong>
                {event.date.toLocaleString('da-DK', {
                  dateStyle: 'full',
                  timeStyle: 'short',
                })}
              </label>
            </div>
            <div className="relative p-3">
              <label className="block text-black text-lg  py-2">
                <p>
                  <strong>Kapacitet:</strong> {event.participants.length}/
                  {event.capacity}{' '}
                  {event.team_solo === 'Hold' ? 'hold' : 'deltagere'}
                </p>
              </label>
            </div>
            <div className="flex rounded-b-lg">
              <button
                className={`button-color button-hover w-full background-transparent font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none ${
                  auth.currentUser ? 'rounded-bl-lg' : 'rounded-b-lg'
                }`}
                type="button"
                onClick={() => setShowParentModal(false)}
              >
                Luk
              </button>
              {auth.currentUser && (
                <button
                  className={`${
                    teams.length === 0
                      ? 'bg-gray-500'
                      : 'button-color button-hover border-l-4'
                  }  border-l-0 w-full background-transparent font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none rounded-br-lg`}
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
      </div>
    </div>
  );
};

export default EventDetailsModal;
