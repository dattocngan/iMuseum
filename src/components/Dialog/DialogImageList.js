import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogListAllItems from "./DialogListAllItems";

const DialogImageList = ({ getAllCheckedItems, itemsData, filterItemList }) => {
  let checkedItemsCount = [];
  const [open, setOpen] = React.useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const getCheckedItems = (data) => {
    checkedItemsCount = data;
  };

  const handleClickOpen = () => {
    setCheckedItems([]);
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
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
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
          itemsData={itemsData}
        />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={addCheckedItemsHandler} color="primary">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogImageList;
