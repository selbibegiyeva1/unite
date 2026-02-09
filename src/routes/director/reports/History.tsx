import { useOutletContext } from "react-router-dom";
import DirectorPayoutHistory from "../../../components/director/reports/DirectorPayoutHistory";
import { type PeriodValue } from "../../../components/director/transactions/Day";

function History() {
    const { periodValue } = useOutletContext<{ periodValue: PeriodValue }>();

    return <DirectorPayoutHistory period={periodValue} />;
}

export default History;

