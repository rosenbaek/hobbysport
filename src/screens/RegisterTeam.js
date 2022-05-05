import { useEffect, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

const initialTeam = {
  name: '',
  members: [],
};
const RegisterTeam = ({ toast }) => {
  const [team, setTeam] = useState(initialTeam);
  const [members, setMembers] = useState('');
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleChange = (e) => {
    setTeam({ ...team, [e.target.id]: e.target.value, captain: user.email });
  };

  const newSportRef = collection(firestore, 'teams');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (team.members.length === 0 || team.members.length > 15) {
      toast.warn('Fejl - Minimum én holdkammerat og maks 15 holdkammerater');
    } else {
      try {
        const newTeam = await addDoc(newSportRef, team);
        console.log(newTeam);
        if (newTeam.id !== null) {
          toast.success('Teamet blev tilføjet');
        } else {
          toast.error('Teamet blev ikke tilføjet');
        }
      } catch (e) {
        console.error(e);
      }
      setTeam(initialTeam);
      navigate('/');
    }
  };
  const handleList = (e) => {
    if (e.target.id === 'members') {
      setMembers(e.target.value);
    }
  };

  const addToList = (e) => {
    e.preventDefault();
    if (e.target.id === 'addMember') {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(members)) {
        firestore
          .collection('users')
          .doc(members)
          .get()
          .then((snapshot) => {
            if (snapshot.exists) {
              setTeam({ ...team, members: [...team.members, members] });
              setMembers('');
            } else {
              toast.warn('Der er sket en fejl - beklager');
            }
          });
      } else {
        toast.warn('Email er ugyldig');
      }
    }
  };

  const removeFromList = (e) => {
    e.preventDefault();
    if (e.target.id === 'removeMember') {
      if (e.target.value === team.captain) {
        toast.warn('Du kan ikke ferne kaptajnen');
        return;
      }
      setTeam({
        ...team,
        members: team.members.filter((member) => member !== e.target.value),
      });
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      setTeam({
        ...team,
        captain: auth.currentUser.email,
        members: [auth.currentUser.email],
      });
    } else {
      setTeam(initialTeam);
    }
  }, []);
  return (
    <div className="flex flex-col items-center gap-3 py-10 lg:mx-5 ">
      <h1 className="text-4xl">Opret Hold</h1>
      <div className="flex flex-col lg:flex-row shadow-2xl rounded-lg px-5 lg:px-0 lg:pr-5 py-3 lg:py-0 lg:pt-5 ">
        <div className="border-b-2 pb-3 lg:pb-0 lg:border-b-0 lg:border-r-2 border-[rgb(201,25,46)]">
          <form className="flex flex-col lg:mx-5" action="" id="registersport">
            <label className="text-lg" htmlFor="name">
              Hold Navn
            </label>
            <input
              className="border-2 w-full rounded-lg py-2 px-2"
              type="text"
              id="name"
              onChange={handleChange}
              value={team.name}
              required
            />
            <label className="text-lg mb-2" htmlFor="captain">
              Hold Kaptajn (email)
            </label>
            <input
              className="border-2 w-full rounded-lg mb-3 py-2 px-2"
              type="text"
              name="captain"
              id="captain"
              value={user.email}
              disabled
            />
            <label className="text-lg" htmlFor="members">
              Holdkammerater (email)
            </label>
            <div className="flex flex-col lg:flex-row mb-3 ">
              <input
                className="border-2 rounded-lg px-2 py-2 w-full"
                type="text"
                id="members"
                name="members"
                onChange={handleList}
                value={members}
              />
              <button
                id="addMember"
                onClick={addToList}
                className="button-color border-[rgb(201,25,46)] border-4 button-hover font-bold rounded-lg px-2 w-full lg:w-fit"
              >
                Tilføj
              </button>
            </div>
          </form>
          <button
            onClick={handleSubmit}
            className="button-color border-[rgb(201,25,46)] button-hover py-3 px-3 text-sm font-bold uppercase rounded-bl-lg w-full"
          >
            Opret
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
                    className="button-color border-[rgb(201,25,46)] button-hover rounded-lg py-1 px-2"
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
