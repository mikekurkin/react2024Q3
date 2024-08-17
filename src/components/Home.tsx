import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

const Home = () => {
  const entries = useSelector((store: RootState) => store.formData.entries);
  return (
    <>
      {entries.map((entry) => (
        <div>{JSON.stringify(entry)}</div>
      ))}
    </>
  );
};

export default Home;
