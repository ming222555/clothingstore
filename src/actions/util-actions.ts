"use server";

import ip3country from "ip3country";

ip3country.init();

export async function ip2CountryAction(ip: string) {
  // Lookup using ip4 str
  return ip3country.lookupStr(ip); // 'KR'.
}
