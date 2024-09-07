import { todayDAY, todayMonth } from "../constants/date.js";
import { headerToday } from "../constants/document.js";

//각 날짜 불러오기
export function headerInsertDate() {
  headerToday.append(todayMonth, "월", "  ", todayDAY, "일");
}
