import { makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';

const useStyles = makeStyles((theme) => ({
  drag: {
    backgroundColor: 'red',
  },
  chosen: {
    backgroundColor: 'blue',
  },
  ghost: {
    backgroundColor: 'green',
  },
}));

const SortableDemoOne = () => {
  const classes = useStyles();
  const [sampleData, setSampleData] = useState([
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

  useEffect(() => {}, []);

  return (
    <ReactSortable
      list={sampleData}
      setList={setSampleData}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(10rem, 1fr))',
        gap: '0.5em',
      }}
      dragClass={classes.drag}
      chosenClass={classes.chosen}
      ghostClass={classes.ghost}
    >
      {sampleData.map((item) => (
        <div
          key={item.id}
          style={{
            fontSize: 45,
            borderStyle: 'solid',
            margin: 5,
            // backgroundColor: 'gray',
          }}
        >
          {item.name}
        </div>
      ))}
    </ReactSortable>
  );
};

export default SortableDemoOne;
