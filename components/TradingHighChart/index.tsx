import dynamic from "next/dynamic";

const TradingChart = dynamic(() => (import("./chart") as any), {
  loading: () => <p>Loading ...</p>,
  ssr: false
});

export const TradingHighChart = (props: any) => {
  return <TradingChart {...props} />;
}
