import dayjs from "dayjs";
import sv from "dayjs/locale/sv";

import { Distribution, Odds } from "types/Events";

export const formatChartData = (
  data: Distribution[] | Odds[]
): Distribution[] | Odds[] => {
  console.log(data);
  return data.map((item) => ({
    ...item,
    timestamp: capitalizeFirstLetter(
      dayjs(item.timestamp).locale(sv).format("ddd HH:mm")
    ),
  }));
};

const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
