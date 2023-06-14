import dayjs from 'dayjs';
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis
} from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { ChartPoint } from '../../utils/types';
import { formatPrice } from '../../utils/utils';

interface IChartProps {
  data: ChartPoint[];
}

const CustomTooltip = ({ payload, label, active }: TooltipProps<ValueType, NameType>) => {
  if (active && payload) {
    const formatValue = formatPrice(payload[0].value as number);
    return (
      <div className="bg-transparent">
        <p className="text-2xl font-semibold">{formatValue}</p>
        <p className="text-sm">{`${dayjs(label).format('MMM D, YYYY')} `}</p>
      </div>
    );
  }

  return null;
};

export const AreaChartWrapper = ({ data }: IChartProps) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 p-4">
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 50,
            right: 0,
            left: 0,
            bottom: 0
          }}>
          <XAxis dataKey="date" tickFormatter={(tick) => dayjs(tick).format('DD')} />
          <YAxis hide={true} />
          <Tooltip position={{ x: 0, y: 0 }} content={<CustomTooltip />} />
          <Area type="monotone" dataKey="value" stroke="#fff" fill="#18181b" activeDot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const LineChartWrapper = ({ data }: IChartProps) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 p-4">
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 50,
            right: 0,
            left: 0,
            bottom: 0
          }}>
          <XAxis dataKey="date" tickFormatter={(tick) => dayjs(tick).format('DD')} />
          <YAxis hide={true} />
          <Tooltip position={{ x: 0, y: 0 }} content={<CustomTooltip />} />
          <Line type="monotone" dataKey="value" stroke="#fff" strokeWidth={1} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
