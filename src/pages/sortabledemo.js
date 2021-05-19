import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  SortableContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    margin: 'auto',
    padding: '24px 12px 64px',
    maxWidth: '800px',
    minHeight: '332px',
    overflowY: 'auto',
  },
  SortableItem: {
    display: 'flex',
    padding: '16px',
    position: 'relative',
    maxWidth: '25%',
    flexBasis: '100%',
    borderRadius: '2px',
    flexDirection: 'column',
  },
  SortableInnerItem: {
    height: '212px',
    display: 'flex',
    maxWidth: '100%',
    maxHeight: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  SortableHelper: {
    boxShadow:
      'rgba(0, 0, 0, 0.075) 0px 1px 6px, rgba(0, 0, 0, 0.075) 0px 1px 4px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    cursor: 'row-resize',
  },
}));
const SortableDemo = () => {
  const [sampleData, setSampleData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setSampleData([
      {
        id: 1,
        name: 'Batman 1',
      },
      {
        id: 2,
        name: 'Batman 2',
      },
      {
        id: 3,
        name: 'Batman 3',
      },
      {
        id: 4,
        name: 'Batman 4',
      },
      {
        id: 5,
        name: 'Batman 5',
      },
    ]);
  }, []);

  const SortableItem = SortableElement(({ value }) => (
    <div className={classes.SortableItem}>
      <div className={classes.SortableInnerItem}>
        <div>
          <label
            style={{
              fontSize: '50px',
              backgroundColor: 'gray',
            }}
          >
            {value.name}
          </label>
          <button onClick={handleRemoveItem.bind(this, value.id)}>X</button>
        </div>
      </div>
    </div>
  ));

  const SortableList = SortableContainer(({ items }) => {
    return (
      <div className={classes.SortableContainer}>
        {items.map((value, index) => (
          <SortableItem key={`item-${value.id}`} index={index} value={value} />
        ))}
      </div>
    );
  });

  const handleRemoveItem = (id) => {
    const prevData = [...sampleData];
    const newData = prevData.filter((x) => x.id !== id);
    setSampleData(newData);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setSampleData(arrayMove(sampleData, oldIndex, newIndex));
  };

  return (
    <div style={{ width: '100%' }}>
      <SortableList
        items={sampleData}
        onSortEnd={onSortEnd}
        axis='xy'
        helperClass={classes.SortableHelper}
      />
    </div>
  );
};

export default SortableDemo;
