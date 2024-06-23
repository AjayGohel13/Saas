import DataGrid from "@/components/Data-Grid";
import DataCharts from "@/components/Data-charts";

export default function DashBoardPage() {

  return (
    <div className=" max-w-screen-2xl mx-auto w-full pb-10 -mt-24 " >
      <DataGrid/>
      <DataCharts/>
    </div>
  );
}
