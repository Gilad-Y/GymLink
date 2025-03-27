import store from "../../../../../redux/store";
import {
  getExpired,
  getExpiringSoon,
  getGrowth,
  getPreferences,
  getTraineesByUserId,
} from "../../../../../util/api";

export const statLogic = async (type: string) => {
  const user = store.getState().users.user;
  const id = user?._id || "";
  const preferences = await getPreferences(id);
  const subscriptionPreference = preferences.find(
    (pref: { useFor: string }) => pref.useFor === "subscriptionEndingDate"
  );
  const trainees = await getTraineesByUserId(id);
  let value;
  switch (type) {
    case "members":
      value = trainees.length;
      break;
    case "expired":
      value = await getExpired(id, subscriptionPreference.title);

      break;
    case "expiring soon":
      value = await getExpiringSoon(id, subscriptionPreference.title);
      break;
    case "growth":
      value = await getGrowth(id);
      break;
    default:
      value = -1;
      break;
  }
  return value;
};
