import { useDispatch, useSelector } from 'react-redux';
import { useCsvExport } from '../../hooks/useCsvExport';
import { clearSelectedItems } from '../../state/selectedItems/selectedItemsSlice';
import { RootState } from '../../state/store';
import './SelectionFlyout.css';

const SelectionFlyout = () => {
  const { selectionRecords } = useSelector((state: RootState) => state.selectedItems);
  const dispatch = useDispatch();
  const exportCsv = useCsvExport();

  const selectionCount = selectionRecords.length;
  const clearSelection = () => dispatch(clearSelectedItems());
  const downloadInfo = () =>
    exportCsv(
      selectionRecords.map((r) => r.person),
      `${selectionCount}_people.csv`
    );

  return selectionCount === 0 ? null : (
    <div className='selection-flyout'>
      <div className='flex flex-row'>
        <p>
          {selectionCount} {selectionCount == 1 ? 'item' : 'items'} selected
        </p>
        <button className='flyout-button' onClick={clearSelection}>
          Deselect All
        </button>
        <button className='flyout-button' onClick={downloadInfo}>
          Download Info
        </button>
      </div>
    </div>
  );
};

export default SelectionFlyout;
