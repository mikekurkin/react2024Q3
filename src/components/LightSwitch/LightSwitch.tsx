import { useContext } from 'react';
import ThemeContext, { Theme } from '../../context/ThemeContext';
import './LightSwitch.css';

interface SelectionFlyoutProps {
  onChange(theme: Theme | 'auto'): void;
}

const SelectionFlyout = ({ onChange }: SelectionFlyoutProps) => {
  const theme = useContext(ThemeContext);

  return (
    <div>
      <input
        id='lightswitch'
        className='emoji-toggle'
        type='checkbox'
        checked={theme === 'dark'}
        onChange={(e) => onChange(e.target.checked ? 'dark' : 'light')}
      />
      <label htmlFor='lightswitch' data-on='dark' data-off='light' />
    </div>
  );
};

export default SelectionFlyout;
