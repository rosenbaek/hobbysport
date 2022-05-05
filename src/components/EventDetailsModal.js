import { firestore, auth } from '../firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const EventDetailsModal = ({ event, setShowParentModal, toast }) => {
  const joinEvent = async () => {
    if (event.team_solo === 'solo') {
      const user = auth.currentUser;
      const userRef = doc(firestore, 'users', user.uid);

      if (event.participants.length < event.capacity) {
        if (event.participants.filter((p) => p.id === userRef.id).length > 0) {
          toast.error('Du er allerede deltager');
          return;
        }
        const eventRef = doc(firestore, 'events', event.id);
        await updateDoc(eventRef, {
          participants: arrayUnion(userRef),
        });
        toast.success('Du er nu deltager');
      } else if (event.team_solo === 'hold') {
        alert("You can't join a team event");
      }
      setShowParentModal(false);
    }
  };
  return (
    <div>
      <div className="bg-black opacity-50  absolute z-10 top-0 left-0 h-screen w-screen"></div>
      <div className="flex  justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 bg-white  rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-6xl font=semibold">{event.name}</h3>
            </div>
            <div className="relative p-6 flex-auto">
              <label className="block text-black text-lg font-bold py-2">
                {event.description}
              </label>
            </div>
            <div className="relative p-6 flex-auto">
              <label className="block text-black text-lg font-bold py-2">
                {event.type}
              </label>
            </div>
            <div className="relative p-6 flex-auto">
              <label className="block text-black text-lg font-bold py-2">
                {event.team_solo}
              </label>
            </div>
            <div className="relative p-6 flex-auto">
              <label className="block text-black text-lg font-bold py-2">
                {event.sport.name}
              </label>
            </div>
            <div className="relative p-6 flex-auto">
              <label className="block text-black text-lg font-bold py-2">
                {event.location}
              </label>
            </div>
            <div className="relative p-6 flex-auto">
              <label className="block text-black text-lg font-bold py-2">
                {event.date.toLocaleString('da-DK', {
                  dateStyle: 'full',
                  timeStyle: 'short',
                })}
              </label>
            </div>
            <div className="relative p-6 flex-auto">
              <label className="block text-black text-lg font-bold py-2">
                <p>
                  Capacity: {event.participants.length}/{event.capacity}
                </p>
              </label>
            </div>
            <div className="flex items-center border-t border-solid border-blueGray-200 rounded-b-lg">
              <button
                className="bg-red-500 w-full background-transparent font-bold uppercase
                mr-1 px-6 py-3 text-sm outline-none focus:outline-none"
                type="button"
                onClick={() => setShowParentModal(false)}
              >
                Close
              </button>
              <button
                className="bg-red-500 w-full background-transparent font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none"
                type="button"
                onClick={joinEvent}
              >
                Join Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
