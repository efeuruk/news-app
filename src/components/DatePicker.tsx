import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePicker as MUIDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { useSearchFilterContext } from "../context/hooks/useSearchFilterContext";
import { Dayjs } from "dayjs";

const DatePicker = () => {
  const { setDate, setArticlesLoading } = useSearchFilterContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MUIDatePicker
        format="DD/MM/YYYY"
        disableFuture
        onChange={(date: Dayjs) => {
          setDate(date.format("YYYY-MM-DD"));
          setArticlesLoading(true);
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
