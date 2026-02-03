import { useOutletContext } from "react-router-dom"
import DirectorPurchase from "../../../components/director/transactions/DirectorPurchase"
import { type PeriodValue } from "../../../components/director/transactions/Day"

function Purchase() {
    const { periodValue } = useOutletContext<{ periodValue: PeriodValue }>()
    
    return (
        <DirectorPurchase period={periodValue} />
    )
}

export default Purchase