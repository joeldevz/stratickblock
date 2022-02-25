export const Token = ({ name, price, change, url, symbol, slug }) => {
  const priceChange = ((price * change) / 100).toFixed(4);
  const priceChangeColor =
    change === null
      ? "text-gray-500"
      : change > 0
      ? "text-green-600"
      : "text-red-600";
  return (
    <div class="bg-gray-800 rounded-lg hover:scale-105 transition-all duration-500 cursor-pointer shadow-xl py-2 px-4 ">
      <div class="flex justify-between items-center">
        <div class="inline-flex items-center  w-14 h-14 ">
          <img src={url} />
        </div>
        <div className="text-center">
          <h3 class="font-semibold text-md text-gray-300">
            {name} <small className="font-bold">({symbol})</small>
          </h3>
          <h1 class="font-semibold text-xl text-gray-300">$ {price}</h1>
        </div>
        <div>
          <span class={`font-bold ${priceChangeColor}`}>
            {priceChange} ({(change*1).toFixed(2)}%)
          </span>
          <br />
          <span class="font-medium text-xs text-gray-500 flex justify-end">
            {slug}
          </span>
        </div>
      </div>
    </div>
  );
};
export const TokenHidden = () => {
  return (
    <div
      class="bg-gray-800 rounded-lg  shadow-inner

      px-4  outline-dashed outline-2 outline-gray-500 py-20   "
    >
      <div class="flex justify-center items-center opacity-60">
        <div class=" animate-spin  w-20 h-20  rounded-full">
          <img src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" />
        </div>
      </div>
    </div>
  );
};
