import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePicker as MUIDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { useSearchFilterContext } from "../context/hooks/useSearchFilterContext";
import { Dayjs } from "dayjs";

const DatePicker = () => {
  const { setDateFilter, setArticlesLoading } = useSearchFilterContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MUIDatePicker
        format="DD/MM/YYYY"
        disableFuture
        slotProps={{ textField: { fullWidth: true, label: "Date" } }}
        onChange={(date: Dayjs | null) => {
          if (date) {
            setDateFilter(date.format("YYYY-MM-DD"));
            setArticlesLoading(true);
          }
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
