// 美东夏令时 (EDT) 为 UTC-4，北京时间为 UTC+8，时差为12小时
// 2026年世界杯期间（6月11日-7月19日）处于美国夏令时期间

export interface BeijingTime {
  date: string; // YYYY-MM-DD format
  time: string; // HH:mm format
  isNextDay: boolean; // 是否跨天到第二天
}

/**
 * 将美东时间转换为北京时间
 * @param date 日期 YYYY-MM-DD
 * @param time 时间 HH:mm (美东时间)
 * @returns 北京时间
 */
export function convertToBeijingTime(date: string, time: string): BeijingTime {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);
  
  // 美东夏令时 UTC-4 转北京时间 UTC+8，加12小时
  let beijingHours = hours + 12;
  let beijingDay = day;
  let beijingMonth = month;
  let beijingYear = year;
  let isNextDay = false;
  
  if (beijingHours >= 24) {
    beijingHours -= 24;
    isNextDay = true;
    
    // 处理跨天
    const daysInMonth = new Date(year, month, 0).getDate();
    beijingDay += 1;
    
    if (beijingDay > daysInMonth) {
      beijingDay = 1;
      beijingMonth += 1;
      
      if (beijingMonth > 12) {
        beijingMonth = 1;
        beijingYear += 1;
      }
    }
  }
  
  const beijingDate = `${beijingYear}-${beijingMonth.toString().padStart(2, "0")}-${beijingDay.toString().padStart(2, "0")}`;
  const beijingTime = `${beijingHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  
  return {
    date: beijingDate,
    time: beijingTime,
    isNextDay,
  };
}

/**
 * 格式化北京时间显示
 * @param beijingTime 北京时间对象
 * @returns 格式化的字符串
 */
export function formatBeijingTime(beijingTime: BeijingTime): string {
  return beijingTime.time;
}

/**
 * 格式化北京日期显示
 * @param beijingTime 北京时间对象
 * @returns 格式化的日期字符串
 */
export function formatBeijingDate(beijingTime: BeijingTime): string {
  const [year, month, day] = beijingTime.date.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const weekday = weekdays[date.getDay()];
  
  return `${month}月${day}日 ${weekday}`;
}

/**
 * 获取北京时间的时段描述
 * @param time 时间 HH:mm
 * @returns 时段描述
 */
export function getTimeOfDay(time: string): string {
  const hours = parseInt(time.split(":")[0]);
  
  if (hours >= 0 && hours < 6) return "凌晨";
  if (hours >= 6 && hours < 9) return "早晨";
  if (hours >= 9 && hours < 12) return "上午";
  if (hours >= 12 && hours < 14) return "中午";
  if (hours >= 14 && hours < 18) return "下午";
  if (hours >= 18 && hours < 22) return "晚上";
  return "深夜";
}
