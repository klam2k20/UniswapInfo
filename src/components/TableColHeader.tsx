import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';

interface ITableColHeaderProps {
  title: string;
  prop: string;
  sort: { prop: string; asc: boolean };
  handleSort: () => void;
  classNames: string;
}

const TableColHeader = ({ title, prop, sort, handleSort, classNames }: ITableColHeaderProps) => {
  return (
    <span className={`table_col_header ${classNames}`} onClick={() => handleSort()}>
      {sort.prop === prop && sort.asc && <ArrowUpIcon className="w-4" />}
      {sort.prop === prop && !sort.asc && <ArrowDownIcon className="w-4" />}
      {title}
    </span>
  );
};

export default TableColHeader;
