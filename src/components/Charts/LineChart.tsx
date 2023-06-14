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
import { ChartPoint, TwoLineChartPoint } from '../../utils/types';
import { formatNumber, formatPrice } from '../../utils/utils';

interface IChartProps {
  data: ChartPoint[];
}

interface ITwoChartProps {
  data: TwoLineChartPoint[];
}

const CustomTooltip = ({ payload, label, active }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length > 0) {
    const formatValue = formatPrice(payload[0].value as number);
    return (
      <div className="bg-transparent">
        <p className="text-lg font-semibold md:text-2xl">{formatValue}</p>
        <p className="text-sm">{`${dayjs(label).format('MMM D, YYYY')} `}</p>
      </div>
    );
  }
  return null;
};

const CustomPriceRatioTooltip = ({ payload, label, active }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length > 1) {
    return (
      <div className="bg-transparent">
        <p className="text-md font-semibold md:text-lg">{`1 ${payload[0].name} = ${formatNumber(
          payload[1].value as number,
          5
        )} ${payload[1].name}`}</p>
        <p className="text-md font-semibold md:text-lg">{`1 ${payload[1].name} = ${formatNumber(
          payload[0].value as number,
          5
        )} ${payload[0].name}`}</p>
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

export const TwoLineChartWrapper = ({ data }: ITwoChartProps) => {
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
          <Tooltip position={{ x: 0, y: 0 }} content={<CustomPriceRatioTooltip />} />
          <Line
            type="monotone"
            dataKey="line1"
            stroke="#fff"
            strokeWidth={1}
            dot={false}
            name={data[0].name1}
          />
          <Line
            type="monotone"
            dataKey="line2"
            stroke="#db2777"
            strokeWidth={1}
            dot={false}
            name={data[0].name2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
