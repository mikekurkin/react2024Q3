import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedItems } from '../../state/selectedItems/selectedItemsSlice';
import { RootState } from '../../state/store';
import './SelectionFlyout.css';

const SelectionFlyout = () => {
  const { selectionRecords } = useSelector((state: RootState) => state.selectedItems);
  const dispatch = useDispatch();

  const selectionCount = selectionRecords.length;
  const clearSelection = () => dispatch(clearSelectedItems());

  return selectionCount === 0 ? null : (
    <div className='selection-flyout'>
      <div className='flex flex-row'>
        <p>
          {selectionCount} {selectionCount == 1 ? 'item' : 'items'} selected
        </p>
        <button className='flyout-button deselect-all' onClick={clearSelection}>
          Deselect All
        </button>
        <button className='flyout-button download-selection'>Download Info</button>
      </div>
    </div>
  );
};

export default SelectionFlyout;
