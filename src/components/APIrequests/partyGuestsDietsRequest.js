import {GUEST_DIET_API} from "../../api/api";

const partyGuestsDietsRequest = async (encodedGuests) => {
  const vegansResponse = await fetch(`${GUEST_DIET_API}${encodedGuests}`);
  const {diet} = await vegansResponse.json();

  return diet;
};

export default partyGuestsDietsRequest;