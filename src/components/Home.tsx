import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

const Home = () => {
  const entries = useSelector((store: RootState) => store.formData.entries);

  return (
    <div className='panel-container'>
      {[...entries]
        .sort((e1, e2) => e2.createdAt.valueOf() - e1.createdAt.valueOf())
        .map((entry) => (
          <div className={new Date().valueOf() - entry.createdAt.valueOf() < 3000 ? 'panel new' : 'panel'}>
            {entry.avatarB64 ? <img src={entry.avatarB64} /> : null}
            <p>Name: {entry.firstname}</p>
            <p>Age: {entry.age}</p>
            <p>Country: {entry.country}</p>
            <p>E-mail: {entry.email}</p>
            <p>Password Hash: {entry.passwordHash}</p>
            <p>Gender: {entry.gender}</p>
            <p>Terms accepted: {entry.terms.toString()}</p>
          </div>
        ))}
    </div>
  );
};

export default Home;
