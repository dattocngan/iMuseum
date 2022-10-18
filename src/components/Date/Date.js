import React, { useState } from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@material-ui/core";
import moment from "moment";

const Date = ({ handleChange, date, label, className }) => {
  const handleChangeDate = (newValue) => {
    if (!newValue) {
      handleChange(null);
      return;
    }
    const formattedDate = moment(newValue.$d).format("YYYY-MM-DD");
    handleChange(formattedDate);
  };
  return (
    <div className={className}>
      <label htmlFor="address" className="form-label">
        {label}
      </label>
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label=""
            inputFormat="DD/MM/YYYY"
            value={date}
            onChange={handleChangeDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default Date;
