import { useEffect, useRef, useState } from "react"
import { useTranslation } from "../../../hooks/useTranslation"

export type PeriodValue = "day" | "week" | "month" | "year" | "all"

interface DayProps {
    value?: PeriodValue
    onChange?: (value: PeriodValue) => void
}

function Day({ value = "all", onChange }: DayProps) {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const [current, setCurrent] = useState<PeriodValue>(value)
    const rootRef = useRef<HTMLDivElement | null>(null)

    // Get period options with translated labels
    const OPTIONS: { value: PeriodValue; label: string }[] = [
        { value: "all", label: t.directorTransactions.period.all },
        { value: "day", label: t.directorTransactions.period.day },
        { value: "week", label: t.directorTransactions.period.week },
        { value: "month", label: t.directorTransactions.period.month },
        { value: "year", label: t.directorTransactions.period.year },
    ]

    // Sync internal state with prop value
    useEffect(() => {
        setCurrent(value)
    }, [value])

    useEffect(() => {
        if (!isOpen) return

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false)
            }
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen])

    const currentLabel = OPTIONS.find((o) => o.value === current)?.label ?? t.directorTransactions.period.all

    const handleSelect = (selectedValue: PeriodValue) => {
        setCurrent(selectedValue)
        setIsOpen(false)
        onChange?.(selectedValue)
    }

    return (
        <div ref={rootRef} className="relative">
            <p className='font-medium text-[13px] pb-[8px] text-right max-1md:text-left'>Период</p>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center justify-between gap-3 outline-0 cursor-pointer py-2.5 px-4 rounded-[8px] border border-[#00000026] hover:bg-[#0000000d] transition-colors text-[13px] font-medium"
            >
                <span>{currentLabel}</span>
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-transform duration-200"
                >
                    <path
                        d="M3.87883 5.29289L0.293044 1.70711C-0.336921 1.07714 0.109246 0 1.00015 0H8.17172C9.06263 0 9.50879 1.07714 8.87883 1.70711L5.29304 5.29289C4.90252 5.68342 4.26935 5.68342 3.87883 5.29289Z"
                        fill="black"
                    />
                </svg>
            </button>

            <div
                className={`absolute right-0 mt-2 w-[180px] rounded-[10px] border border-[#0000001A] bg-white px-[10px] py-[10px] shadow-sm z-50 transition-all duration-200 ${
                    isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
            >
                <div className="flex flex-col">
                    {OPTIONS.map((option) => {
                        const isActive = option.value === current
                        return (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelect(option.value)}
                                className={`w-full text-left px-[10px] py-[6.5px] rounded-[8px] text-[12px] font-medium cursor-pointer transition-colors ${
                                    isActive ? "bg-[#EEF3FF]" : "bg-white"
                                }`}
                            >
                                {option.label}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Day