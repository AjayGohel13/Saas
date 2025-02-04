import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono"
import { useSearchParams } from "next/navigation";
import { convertAmountFromMiliunits } from "@/lib/utils";
export const useGetSummary = () => {
  const param = useSearchParams()
  const from = param.get("from") || ''
  const to = param.get("to") || ''
  const accountId = param.get("accountId") || ''
  const query = useQuery({
    queryKey: ['summary', { from, to, accountId }],
    queryFn: async () => {
      const response = await client.api.summary.$get({
        query: {
          from,
          to,
          accountId,
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch summary");
      }
      const { data } = await response.json()
      return {
        ...data,
        incomeAmount:convertAmountFromMiliunits(data.incomeAmount),
        expenseAmount:convertAmountFromMiliunits(data.expenseAmount),
        remainingAmount:convertAmountFromMiliunits(data.remainingAmount),
        categories: data.categories.map((category)=>({
            ...category,
            value:convertAmountFromMiliunits(category.value)
        })),
        days:data.days.map((day)=>({
            ...day,
            income:convertAmountFromMiliunits(day.income),
            expenses:convertAmountFromMiliunits(day.expenses)
        }))
      }
    }
  })
  return query
}

