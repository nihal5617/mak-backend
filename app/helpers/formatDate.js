import { format } from "date-fns";

const formatDate = (date) => {
  const formattedDate = new Date(date);
  return format(formattedDate, "yyyy-MM-dd HH:mm:ss");
};

export default formatDate;
