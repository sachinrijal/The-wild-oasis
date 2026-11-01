import { Banknote, BarChart, Briefcase, Calendar } from "lucide-react";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
import useCabin from "../cabins/useCabin";

function Stats({ bookings, confirmedStays, numDays }) {
  const { cabins } = useCabin();

  const numBookings = bookings?.length;
  const sales = bookings?.reduce((acc, val) => acc + val.totalPrice, 0) ?? 0;
  const checkIns = confirmedStays?.length ?? 0;
  const occupancy =
    confirmedStays?.reduce((acc, val) => acc + val.numNights, 0) /
    (numDays * cabins?.length) ;

  return (
    <>
      <Stat
        title="Bookings"
        icon={<Briefcase />}
        color="blue"
        value={numBookings}
      />
      <Stat
        title="Sales"
        icon={<Banknote />}
        color="green"
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        icon={<Calendar />}
        color="indigo"
        value={checkIns}
      />
      <Stat
        title="Occupancy rates"
        icon={<BarChart />}
        color="yellow"
        value={Math.floor(occupancy * 100) }
      />
    </>
  );
}

export default Stats;
