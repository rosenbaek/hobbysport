import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import { useNavigate } from 'react-router-dom';
import { firestore, auth } from '../firebase';
import EventModal from '../components/EventModal';
import { AnimatePresence } from 'framer-motion';

const EventScreen = ({ toast }) => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [unique, setUnique] = useState([]);
  const [events, setEvents] = useState();
  const [loading, setLoading] = useState(false);

  const seeMore = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const createEvent = () => {
    if (!auth.currentUser) {
      toast.warn('Du skal logge ind for at oprette en event');
    } else {
      navigate('/registerevent');
    }
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
  }, []);

  const close = () => setShowModal(false);
  return (
    <>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {showModal && (
          <EventModal event={selectedEvent} handleClose={close} toast={toast} />
        )}
      </AnimatePresence>
      <div className="mx-2 flex flex-col items-center">
        <button
          onClick={createEvent}
          className="w-full button-color border-[rgb(201,25,46)] button-hover max-w-screen-sm rounded-lg mt-5 font-bold h-12"
        >
          Opret Event
        </button>
        {!loading && (
          <div className="container xl:grid xl:grid-cols-2 py-5">
            <div className="border-r-[1px] w-full text-black">
              <Accordion allowZeroExpanded="true" allowMultipleExpanded="true">
                {unique
                  .sort((a, b) => (a < b ? -1 : 1))
                  .map((date, index) => (
                    <AccordionItem key={index}>
                      <AccordionItemHeading>
                        <AccordionItemButton className="button-color py-2 uppercase rounded-lg px-3 text-lg mb-1">
                          {date.toLocaleDateString('da-DK', {
                            dateStyle: 'full',
                          })}
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel className=" rounded-lg mx-1">
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
                                  className="grid grid-cols-3 text-center px-5 py-3 hover:bg-[rgba(201,25,46,10%)] hover:rounded-lg cursor-pointer "
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
          </div>
        )}
      </div>
    </>
  );
};

export default EventScreen;
