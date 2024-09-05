import { TODAY_DAY, TODAY_MONTH } from "../constants/date.js";
import { HEADER_TODAY } from "../constants/document.js";

export function headerInsertDate() {
  HEADER_TODAY.append(TODAY_MONTH, "월", "  ", TODAY_DAY, "일");
}
