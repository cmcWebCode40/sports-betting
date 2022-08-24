import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import ComparisonBookmarkers from './comparison-bookmarkers';
import ComparisonTabs from './comparison-tabs';
import { TAppBookMaker } from '../../../models/bookmarkers.model';
import BookMarkerError from './bookmaker-error';

interface ISportInformation {
  data: TAppBookMaker[];
}

const SportInformation = ({ data }: ISportInformation): JSX.Element => {
  const [selectedBk, setSelectedBk] = useState<TAppBookMaker[] | any>(data.slice(0, 3));
  const [open, setOpen] = useState(false);

  const onRemove = (id: string | number) => {
    const filteredData = selectedBk.filter((item: TAppBookMaker) => item.id !== id);
    setSelectedBk(filteredData);
  };

  const onAdd = (id: string | number) => {
    if (selectedBk.length > 3) {
      return setOpen(true);
    }
    const filteredData = selectedBk.find((item: TAppBookMaker) => item.id === id);
    // eslint-disable-next-line consistent-return
    if (filteredData) return;
    const newData = data.find((item: TAppBookMaker) => item.id === id);
    setSelectedBk([...selectedBk, newData]);

    return newData;
  };

  return (
    <div>
      <ComparisonTabs
        onRemove={onRemove}
        selectedBk={selectedBk}
        setSelectedBk={setSelectedBk}
        bookmarkers={data}
        onAdd={onAdd}
      />
      <BookMarkerError setOpen={setOpen} open={open} />
      <Grid container spacing={0}>
        {selectedBk.map((list: TAppBookMaker) => (
          <Grid item md={3} key={list.id} sm={12} xs={12}>
            <ComparisonBookmarkers data={list} onRemove={onRemove} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SportInformation;
