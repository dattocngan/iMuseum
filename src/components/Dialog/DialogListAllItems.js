import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { getAllItems } from "api/item";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import { Checkbox } from "@material-ui/core";

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

const DialogListAllItems = ({ getCheckedItems, filterItemList }) => {
  const classes = useStyles();
  const [itemData, setItemData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    getAllItems().then((response) => {
      // console.log(response.data.items);
      setItemData(response.data.items);
    });
  }, []);

  const addCheckedItems = (id) => {
    const copyCheckedItems = [...checkedItems];
    const index = copyCheckedItems.indexOf(id);

    if (index === -1) copyCheckedItems.push(id);
    else copyCheckedItems.splice(index, 1);

    setCheckedItems(copyCheckedItems);
    getCheckedItems(copyCheckedItems);
  };
  console.log(
    itemData.filter((item) => !filterItemList.includes(item.item_id)),
    filterItemList
  );
  return (
    <div className={classes.root}>
      <ImageList rowHeight={200} gap={3} className={classes.imageList}>
        {itemData
          .filter((item) => !filterItemList.includes(item.item_id))
          .map((item, index) => (
            <ImageListItem
              key={item.item_id}
              cols={index % 3 !== 2 ? 1 : 2}
              className="overflow-hidden"
            >
              <img src={item.feature_image} alt={item.name} />
              <ImageListItemBar
                title={item.name}
                position="top"
                className={classes.titleBar}
                actionIcon={
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    name="checkedH"
                    className={classes.icon}
                    onChange={addCheckedItems.bind(null, item.item_id)}
                  />
                }
                actionPosition="left"
              />
            </ImageListItem>
          ))}
      </ImageList>
    </div>
  );
};

export default DialogListAllItems;
