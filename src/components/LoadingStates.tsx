import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface ILoadingListProps {
  limitPerPage: number;
  type: string;
}

export const LoadingRow = () => {
  return <div className="loading_row" />;
};

export const LoadingList = ({ limitPerPage, type }: ILoadingListProps) => {
  return (
    <>
      {Array.from({ length: limitPerPage }, (_, index) => (
        <LoadingRow key={type + index} />
      ))}
    </>
  );
};

export const LoadingPagination = () => {
  return (
    <div className="table_pagination">
      <ArrowLeftIcon className="disabled_arrow" />
      Page 1 of 1
      <ArrowRightIcon className="disabled_arrow" />
    </div>
  );
};
