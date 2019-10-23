import {GUEST_API} from "../../api/api";

const partyGuestsRequest = async () => {
  const response = await fetch(GUEST_API);
  const { party } = await response.json();

  return party;
};

export default partyGuestsRequest;