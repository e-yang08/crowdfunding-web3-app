import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0xaB4Bd30994b2C8882A473Cf4cc971dF078f6Ce12"
  // retrieve from "deploy.js" result.options.address
);

export default instance;
