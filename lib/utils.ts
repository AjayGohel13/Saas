import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function convertAmountFromMiliunits(amount: number) {
  return amount / 1000
}
export function convertAmountToMiliunits(amount: number) {
  return Math.round(amount * 1000)
}

export function formatCurrency(value: number) {
  // const finalValue = convertAmountFromMiliunits(value)
  return Intl.NumberFormat('INR', {
    style: 'currency',
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function calculatePercentageChange(
  current: number,
  previous: number
) {
  if (previous === 0) {
    return previous === current ? 0 : 100;
  }

  return ((current - previous) / previous) * 100
}
export function fillMissingDays(
  activeDays: {
    date: Date,
    income: number,
    expenses: number
  }[],
  startDate: Date,
  endDate: Date
) {
  if (activeDays.length === 0) {
    return []
  }

  const allDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });
  const transactionsByDay = allDays.map((day) => {
    const found = activeDays.find((d) => isSameDay(d.date, day));
    if (found) {
      return found
    } else {
      return {
        date: day,
        income: 0,
        expenses: 0,
      }
    }
  })
  return transactionsByDay
}

type Period = {
  from: Date | string | undefined;
  to: Date | string | undefined;
}
export function formatDataRange(period?: Period) {
  const defaultTo = new Date()
  const defautFrom = subDays(defaultTo, 30)

  if (!period?.from) {
    return `${format(defautFrom, "LLL dd")} - ${format(defaultTo, "LLL dd,y")}`;
  }
  if (period?.to) {
    return `${format(period.from, "LLL dd")} - ${format(period?.to, "LLL dd,y")}`;
  }

  return format(period.from, "LLL dd, y")
}

export function formatPercentage(
  value:number,
  options:{addPrefix?:boolean}={
    addPrefix:false
  }

){
  const result = new Intl.NumberFormat("INR",{
    style:"percent",
  }).format(value/100)

  if(options.addPrefix && value>0){
    return `+${result}`
  }
  return result
}