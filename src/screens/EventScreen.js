import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import { useNavigate } from 'react-router-dom';
import Modal from '../components/EventDetailsModal';
import { firestore } from '../firebase';

const EventScreen = ({ toast }) => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [unique, setUnique] = useState([]);
  const [events, setEvents] = useState();
  const [loading, setLoading] = useState(false);

  const seeMore = (event) => {
    setShowModal(!showModal);
    setSelectedEvent(event);
    console.log('see mere');
  };

  useEffect(() => {
    const unsubscribe = firestore
      .collection('events')
      .onSnapshot((querySnapshot) => {
        setLoading(true);
        if (!querySnapshot.empty) {
          let tempArray = [];

          let promises = querySnapshot.docs.map(async (snapshot) => {
            let tempObject = { id: snapshot.id, ...snapshot.data() };
            await tempObject.sport.get().then((d) => {
              tempObject.sport = { id: d.id, ...d.data() };
            });

            tempObject.date = new Date(tempObject.date);
            tempArray.push(tempObject);
          });

          Promise.all(promises).then(() => {
            console.log('ARRAY: ' + tempArray[0].sport);

            const uniqueDates = [];

            tempArray.forEach((event) => {
              let _date = event.date.toLocaleDateString('da-DK', {
                dateStyle: 'full',
              });
              if (
                !uniqueDates.some(
                  (d) =>
                    d.toLocaleDateString('da-DK', { dateStyle: 'full' }) ===
                    _date
                )
              ) {
                uniqueDates.push(event.date);
              }
            });

            setEvents(tempArray);
            setUnique(uniqueDates);
            setLoading(false);
          });
        }
      });

    return () => {
      unsubscribe();
    };
  }, [firestore]);

  return (
    <>
      {showModal && (
        <Modal
          event={selectedEvent}
          show={showModal}
          toast={toast}
          setShowParentModal={setShowModal}
        />
      )}
      <div className="mx-2 flex flex-col items-center">
        <button
          onClick={() => navigate('/registerevent')}
          className="w-full bg-red-500 max-w-screen-sm rounded-lg mt-5 font-bold h-12 hover:bg-red-400"
        >
          Register Event
        </button>
        {!loading && (
          <div className="container grid grid-cols-2 py-5">
            <div className="border-r-[1px] h-screen w-full text-black">
              <Accordion allowZeroExpanded="true" allowMultipleExpanded="true">
                {unique
                  .sort((a, b) => (a < b ? -1 : 1))
                  .map((date, index) => (
                    <AccordionItem key={index}>
                      <AccordionItemHeading>
                        <AccordionItemButton className="bg-red-500 py-2 rounded-lg px-2 text-xl mb-1">
                          {date.toLocaleDateString('da-DK', {
                            dateStyle: 'full',
                          })}
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        {events
                          .sort((a, b) => (a.date < b.date ? -1 : 1))
                          .map(
                            (event, index) =>
                              event.date.toLocaleDateString('da-DK', {
                                dateStyle: 'full',
                              }) ===
                                date.toLocaleDateString('da-DK', {
                                  dateStyle: 'full',
                                }) && (
                                <div
                                  key={index}
                                  className="flex justify-between px-5 py-1 hover:bg-slate-200 hover:rounded-lg cursor-pointer"
                                  onClick={() => {
                                    seeMore(event);
                                  }}
                                >
                                  <p>
                                    {event.date.getHours() < 10
                                      ? `0${event.date.getHours()}`
                                      : event.date.getHours()}
                                    :
                                    {event.date.getMinutes() < 10
                                      ? `0${event.date.getMinutes()}`
                                      : event.date.getMinutes()}
                                  </p>
                                  <p>{event.name}</p>
                                  <p>{event.sport.name}</p>
                                </div>
                              )
                          )}
                      </AccordionItemPanel>
                    </AccordionItem>
                  ))}
              </Accordion>
            </div>
            <div className=" h-screen w-full"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default EventScreen;
