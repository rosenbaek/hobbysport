import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, firestore } from "../firebase";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
const initialTeam = {
	name: "",
	members: [],
};

const RegisterTeam = ({ toast }) => {
	const [team, setTeam] = useState(initialTeam);
	const [members, setMembers] = useState("");
	const navigate = useNavigate();
	const [user] = useAuthState(auth);

	const handleChange = (e) => {
		setTeam({ ...team, [e.target.id]: e.target.value, captain: user.email });
	};

	const newSportRef = collection(firestore, "teams");
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (team.members.length === 0 || team.members.length > 15) {
			toast.warn("Fejl - Minimum én holdkammerat og maks 15 holdkammerater");
		} else {
			try {
				const newTeam = await addDoc(newSportRef, team);
				console.log(newTeam);
				if (newTeam.id !== null) {
					toast.success("Teamet blev tilføjet");
				} else {
					toast.error("Teamet blev ikke tilføjet");
				}
			} catch (e) {
				console.error(e);
			}
			setTeam(initialTeam);
			navigate("/");
		}
	};
	const handleList = (e) => {
		if (e.target.id === "members") {
			setMembers(e.target.value);
		}
	};

	const addToList = (e) => {
		e.preventDefault();
		if (e.target.id === "addMember") {
			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(members)) {
				firestore
					.collection("users")
					.doc(members)
					.get()
					.then((snapshot) => {
						if (snapshot.exists) {
							setTeam({ ...team, members: [...team.members, members] });
							setMembers("");
						} else {
							toast.warn("Der er sket en fejl - beklager");
						}
					});
			} else {
				toast.warn("Email er ugyldig");
			}
		}
	};

	const removeFromList = (e) => {
		e.preventDefault();
		if (e.target.id === "removeMember") {
			setTeam({
				...team,
				members: team.members.filter((member) => member !== e.target.value),
			});
		}
	};

	return (
		<div className="flex flex-col items-center gap-3 py-10 mx-5 ">
			<h1 className="text-4xl">Registrer Team</h1>
			<div className="flex  bg-slate-50 rounded-lg min-w-[60%]">
				<div className="border-r-2">
					<form className="flex flex-col mx-5" action="" id="registersport">
						<label className="text-lg" htmlFor="name">
							HoldNavn
						</label>
						<input
							className="border-2 w-full rounded-lg"
							type="text"
							id="name"
							onChange={handleChange}
							value={team.name}
							required
						/>
						<label className="text-lg" htmlFor="name">
							Hold Kaptajn (email)
						</label>
						<input
							className="border-2 w-full rounded-lg"
							type="text"
							id="captain"
							value={user.email}
							disabled
						/>

						<label htmlFor="name">Holdkammerater (email)</label>
						<div>
							<input
								className="border-2 rounded-lg "
								type="text"
								id="members"
								onChange={handleList}
								value={members}
							/>
							<button id="addMember" onClick={addToList} className="border">
								Tilføj
							</button>
						</div>
					</form>
					<button
						onClick={handleSubmit}
						className="bg-red-500 py-3 px-3 rounded-bl-lg w-full hover:bg-red-400"
					>
						Registrer
					</button>
				</div>

				<div className="flex flex-col justify-between py-5 mx-5 ">
					<div className="h-1/2">
						<h1 className="font-bold text-lg">Holdkammerater</h1>
						<ul>
							{team.members.map((member, index) => (
								<div
									key={index}
									className="flex justify-between py-2 ml-4 w-full items-center"
								>
									<li className="list-decimal">
										<p className="max-w-sm break-words">{member}</p>
									</li>
									<button
										className="bg-red-500 rounded-lg mr-2 py-1 px-2"
										id="removeMember"
										value={member}
										onClick={removeFromList}
									>
										Fjern
									</button>
								</div>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterTeam;
