"use client"
import { useGetSummary } from "@/features/summary/api/use-get-summary"
import { formatDataRange } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { FaPiggyBank } from "react-icons/fa"
import { FaArrowTrendUp,FaArrowTrendDown } from "react-icons/fa6"
import DataCard, { DataCardLoading } from "@/components/data-card"
const DataGrid = () => {
  const {data ,isLoading} = useGetSummary()
    const params = useSearchParams()
    const to = params.get("to") || undefined
    const from = params.get("from") || undefined

    const dateRangeLabel = formatDataRange({to,from})

    if(isLoading){
      return(
        <div className=' grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8 ' >
          <DataCardLoading/>
          <DataCardLoading/>
          <DataCardLoading/>
        </div>
      )
    }
  return (
    <div className=' grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8 ' >
      <DataCard
        title = "Remaining"
        value = {data?.remainingAmount}
        percentageChange = {data?.remainingChange}
        icon = {FaPiggyBank}
        variant = "default"
        dataRange = {dateRangeLabel}
      />
      <DataCard
        title = "Income"
        value = {data?.incomeAmount}
        percentageChange = {data?.incomeChange}
        icon = {FaArrowTrendUp}
        variant = "default"
        dataRange = {dateRangeLabel}
      />
      <DataCard
        title = "Expenses"
        value = {data?.expenseAmount}
        percentageChange = {data?.expenseChange}
        icon = {FaArrowTrendDown}
        variant = "default"
        dataRange = {dateRangeLabel}
      />
    </div>
  )
}

export default DataGrid
