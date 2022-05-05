import { useEffect, useState } from "react";
import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from "react-accessible-accordion";

import { useNavigate } from "react-router-dom";
import Modal from "../components/EventDetailsModal";
import { firestore } from "../firebase";

const EventScreen = ({ toast }) => {
	const navigate = useNavigate();
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [unique, setUnique] = useState([]);
	const [events, setEvents] = useState();

	const seeMore = (event) => {
		setShowModal(!showModal);
		setSelectedEvent(event);
		console.log("see mere");
	};

	useEffect(() => {
		firestore
			.collection("events")
			.get()
			.then((querySnapshot) => {
				if (!querySnapshot.empty) {
					let tempArray = [];
					querySnapshot.forEach((snapshot) => {
						let tempObject = snapshot.data();
						tempObject.date = new Date(tempObject.date);
						tempArray.push(tempObject);
					});
					const uniqueTemp = new Set(
						tempArray.map((event) => {
							return event.date.toLocaleDateString("da-DK", {
								dateStyle: "full",
							});
						})
					);
					setEvents(tempArray);
					setUnique(Array.from(uniqueTemp));
				}
			})
			.catch((e) => {
				console.log("error" + e);
			});
	}, []);

	return (
		<>
			{showModal && (
				<Modal
					event={selectedEvent}
					show={showModal}
					setShowParentModal={setShowModal}
				/>
			)}
			<div className="mx-2 flex flex-col items-center">
				<button
					onClick={() => navigate("/registerevent")}
					className="w-full bg-red-500 max-w-screen-sm rounded-lg mt-5 font-bold h-12 hover:bg-red-400"
				>
					Register Event
				</button>
				{events && (
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
											{events
												.sort((a, b) => (a.date < b.date ? -1 : 1))
												.map(
													(event, index) =>
														event.date.toLocaleDateString("da-DK", {
															dateStyle: "full",
														}) === date && (
															<div
																key={index}
																className="flex justify-between px-5"
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
