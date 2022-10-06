import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {ImageList, ImageListItem, ImageListItemBar, IconButton} from "@mui/material";
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllItems } from 'api/item';
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 500,
    height: 450,
    transform: "translateZ(0)",
    margin: 10,
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%) !important",
  },
  icon: {
    color: "white",
  },
}));

const DialogListAllItems = () => {
    const classes = useStyles();
    const [itemData, setItemData] = useState([]);
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        getAllItems().then((response) => {console.log(response.data.items); setItemData(response.data.items)})
    }, [])
  return (
    <div className={classes.root}>
      <ImageList gap={3} className={classes.imageList}>
        {itemData.map((item) => (
          <ImageListItem key={item.item_id}>
            <img src={item.feature_image} alt={item.name} />
            <ImageListItemBar
              title={item.name}
              position="top"
              className={classes.titleBar}
              actionIcon={
                <IconButton
                  aria-label={`star`}
                  className={classes.icon}
                  onClick={() => {
                    setChecked(checked ? false : true);
                    console.log(checked);
                  }}
                >
                  {checked ? (
                    <StarBorderIcon className={classes.icon} />
                  ) : (
                    <StarIcon className={classes.icon} />
                  )}
                </IconButton>
              }
              actionPosition="left"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default DialogListAllItems