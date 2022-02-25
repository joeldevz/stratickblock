const URL = "http://api.stratickblock.com/";
export const GetSearch = async (name) => {
  return fetch(URL + "token/search/?slug=" + name)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (!res.success) return [];
      return res.data;
    });
};
export const GetPortfolio = async () => {
  return fetch(URL + "token/need?tokens=bitcoin,ethereum,tether,binancecoin,usd-coin,cardano,solana,terra-luna,binance-usd,polkadot,shiba-inu,terrausd,matic-network,dai,cronos,cosmos,chainlink,axie-infinity,kucoin-shares,celo,oasis-network,congruent-dao-token,klima-dao,spartacus,fantohm,jade-protocol,unus-dao,drip-networ,dafi-protocol,immortaldao,realy-metaverse,astroport,juno-network,osmosis,pigs,dogs,smooth-love-potion,voxies,acala,ronin,kuswap")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (!res.success) return [];
      return res.data;
    });
};
