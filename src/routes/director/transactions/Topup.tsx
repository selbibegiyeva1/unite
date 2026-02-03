import { useOutletContext } from "react-router-dom"
import DirectorTrans from "../../../components/director/transactions/DirectorTrans"
import { type PeriodValue } from "../../../components/director/transactions/Day"

function Topup() {
    const { periodValue } = useOutletContext<{ periodValue: PeriodValue }>()
    
    return (
        <DirectorTrans period={periodValue} />
    )
}

export default Topup