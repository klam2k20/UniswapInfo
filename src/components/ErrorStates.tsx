export const ErrorList = () => {
  return <h1 className="py-16 text-center text-xl text-red-500">Failed to Fetch Data! </h1>;
};

export const ErrorCard = () => {
  return (
    <article className="card items-center justify-center">
      <h1 className="text-xl text-red-500">Failed To Fetch Data!</h1>
    </article>
  );
};

export const ErrorChart = () => {
  return (
    <article className="chart_wrapper items-center justify-center">
      <h1 className="text-xl text-red-500">Failed To Fetch Data!</h1>
    </article>
  );
};
