import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import { useDarkMode } from "../../context/DarkModeContext";
import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { eachDayOfInterval, format, isSameDay,  subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;


function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();
  const colors =
    isDarkMode ?
      {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });


  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        ?.filter((val) => isSameDay(date, new Date(val.created_at)))
        .reduce((acc, val) => acc + val.totalPrice, 0),

      extrasSales: bookings
        ?.filter((val) => isSameDay(date, new Date(val.created_at)))
        .reduce((acc, val) => acc + val.extrasPrice, 0),
    };
  });
  
  return (
    <StyledSalesChart>
      <Heading as="h2">Sales</Heading>

      <AreaChart
        data={data}
        style={{
          width: "100%",
          
          maxHeight: "300px",
          aspectRatio: 1.618,
        }}
        responsive
      >
        <CartesianGrid />
        <XAxis
          dataKey="label"
          tick={{ fill: colors.text }}
          tickLine={{ stroke: colors.text }}
        />
        <YAxis width="auto" unit="$" tick={{ fill: colors.text }} />
        <Tooltip contentStyle={{ backgroundColor: colors.background }} />
        <Area
          dataKey="totalSales"
          type="monotone"
          fill={colors.totalSales.fill}
          stroke={colors.totalSales.stroke}
          name="Total Sales"
          unit="$"
        />
        <Area
          dataKey="extrasSales"
          type="monotone"
          fill={colors.extrasSales.fill}
          stroke={colors.extrasSales.stroke}
          name="Extras Sales"
          unit="$"
        />
      </AreaChart>
    </StyledSalesChart>
  );
}

export default SalesChart;
