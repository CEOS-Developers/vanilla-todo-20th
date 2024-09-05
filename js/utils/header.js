import { todayDAY, todayMonth } from "../constants/date.js";
import { headerToday } from "../constants/document.js";

export function headerInsertDate() {
  headerToday.append(todayMonth, "월", "  ", todayDAY, "일");
}
