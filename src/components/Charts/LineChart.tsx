import dayjs from 'dayjs';
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis
} from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { formatPrice } from '../../utils/utils';
import { ChartPoint } from '../../utils/types';

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
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={500}
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
        <Area type="monotone" dataKey="value" stroke="#fff" fill="##fff" activeDot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export const LineChartWrapper = ({ data }: IChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={500}
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
  );
};
