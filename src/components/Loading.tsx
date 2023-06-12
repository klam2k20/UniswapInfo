import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export const LoadingRow = () => {
  return <div className="loading_row" />;
};

export const LoadingList = () => {
  return (
    <>
      <LoadingRow />
      <LoadingRow />
      <LoadingRow />
      <LoadingRow />
      <LoadingRow />
      <LoadingRow />
      <LoadingRow />
      <LoadingRow />
      <LoadingRow />
      <LoadingRow />
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
