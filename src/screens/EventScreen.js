import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

const EventScreen = () => {
  const event = {
    name: 'Event 1',
    description: 'Super sejt',
    type: 'solo',
    sport: 'Fodbold',
    location: 'Parken',
    date: new Date(2022, 10, 10, 20, 15),
    capacity: 11,
  };
  const event2 = {
    name: 'Event 2',
    description: 'Super sejt',
    type: 'solo',
    sport: 'Fodbold',
    location: 'Parken',
    date: new Date(2022, 10, 10, 11, 30),
    capacity: 11,
  };
  const event3 = {
    name: 'Event 3',
    description: 'Super sejt',
    type: 'solo',
    sport: 'Fodbold',
    location: 'Parken',
    date: new Date(2022, 10, 11, 7, 45),
    capacity: 11,
  };
  const event4 = {
    name: 'Event 4',
    description: 'Super sejt',
    type: 'solo',
    sport: 'Fodbold',
    location: 'Parken',
    date: new Date(2022, 10, 11, 20, 5),
    capacity: 11,
  };
  //create 10 random dates
  //   const dates = [];
  //   for (let i = 0; i < 10; i++) {
  //     dates.push(new Date(2020, i, i + 1, i + 2, i + 3, i + 4, i + 5));
  //   }

  const events = [event, event2, event3, event4];

  const uniqueTemp = new Set(
    events.map((event) => {
      return event.date.toLocaleDateString('da-DK', { dateStyle: 'full' });
    })
  );

  const unique = Array.from(uniqueTemp);

  return (
    <div className="mx-2 flex flex-col items-center">
      <button className="w-full bg-red-500 max-w-screen-sm rounded-lg mt-5 font-bold h-12 hover:bg-red-400">
        Register Event
      </button>
      <div className="container grid grid-cols-2 py-5">
        <div className="border-r-[1px] h-screen w-full text-black">
          <Accordion allowZeroExpanded="true" allowMultipleExpanded="true">
            {unique.map((date, index) => (
              <AccordionItem key={index}>
                <AccordionItemHeading>
                  <AccordionItemButton className="bg-red-500 py-2 rounded-lg px-2 text-xl mb-1">
                    {date}
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  {events.map(
                    (event, index) =>
                      event.date.toLocaleDateString('da-DK', {
                        dateStyle: 'full',
                      }) === date && (
                        <div key={index} className="flex justify-between px-5">
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
    </div>
  );
};

export default EventScreen;
