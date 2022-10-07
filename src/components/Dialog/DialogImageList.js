import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogListAllItems from "./DialogListAllItems";
import { useState } from "react";

let checkedItemsCount = [];

const DialogImageList = ({ getAllCheckedItems, filterItemList }) => {
  const [open, setOpen] = React.useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  const getCheckedItems = (data) => {
    checkedItemsCount = data;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    console.log(checkedItems);
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  function addCheckedItemsHandler() {
    console.log(checkedItemsCount);
    setCheckedItems(checkedItemsCount);
    getAllCheckedItems(checkedItemsCount);
    setOpen(false);
  }

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={handleClickOpen}
      >
        Thêm hiện vật
      </Button>
      {checkedItems.length > 0 && (
        <p>{checkedItems.length} hiện vật đã được chọn</p>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Chọn hiện vật</DialogTitle>
        <DialogListAllItems
          getCheckedItems={getCheckedItems}
          filterItemList={filterItemList}
        />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addCheckedItemsHandler} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogImageList;
