import {
    Tooltip,
    XAxis,
    LineChart,
    Area,
    ResponsiveContainer,
    CartesianGrid,
    Bar,
    Line,
} from "recharts";
import { format } from "date-fns";
import CustomTooltip from "./custom-tooltip";

type Props = {
    data: {
        date: string;
        income: number;
        expenses: number;
    }[]
};
const LineVariant = ({ data }: Props) => {
    return (
        <ResponsiveContainer width='100%' height={350} >
            <LineChart data={data} >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey='date'
                    tickFormatter={(value) => format(value, "dd MMM")}
                    style={{ fontSize: "12px" }}
                    tickMargin={16}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                    dot={false}
                    dataKey='income'
                    stroke="#3b82f6"
                    strokeWidth={2}
                    className="drop-shadow-sm"
                />
                <Line
                    dot={false}
                    stroke="#f43f5e"
                    dataKey='expenses'
                    strokeWidth={2}
                    className="drop-shadow-sm"
                />
            </LineChart>
        </ResponsiveContainer>

    )
}

export default LineVariant
