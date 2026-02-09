import { useOutletContext } from "react-router-dom";
import DirectorCashbackHistory from "../../../components/director/reports/DirectorCashbackHistory";
import { type PeriodValue } from "../../../components/director/transactions/Day";

function Rewards() {
    const { periodValue } = useOutletContext<{ periodValue: PeriodValue }>();

    return <DirectorCashbackHistory period={periodValue} />;
}

export default Rewards;

