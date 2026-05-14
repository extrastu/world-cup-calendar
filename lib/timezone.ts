// 美东夏令时 (EDT) 为 UTC-4，北京时间为 UTC+8，时差为12小时
// 2026年世界杯期间（6月11日-7月19日）处于美国夏令时期间

export interface ConvertedTime {
  date: string; // YYYY-MM-DD format
  time: string; // HH:mm format
  isNextDay: boolean; // 是否跨天到第二天
}

// Keep BeijingTime as alias for backward compatibility
export type BeijingTime = ConvertedTime;

export interface TimezoneOption {
  id: string;
  label: string;
  offset: number; // hours offset from EDT (source timezone)
}

export const timezoneOptions: TimezoneOption[] = [
  { id: "beijing", label: "北京时间 (GMT+8)", offset: 12 },
  { id: "tokyo", label: "东京时间 (GMT+9)", offset: 13 },
  { id: "singapore", label: "新加坡时间 (GMT+8)", offset: 12 },
  { id: "london", label: "伦敦时间 (GMT+1)", offset: 5 },
  { id: "paris", label: "巴黎时间 (GMT+2)", offset: 6 },
  { id: "new_york", label: "纽约时间 (GMT-4)", offset: 0 },
  { id: "los_angeles", label: "洛杉矶时间 (GMT-7)", offset: -3 },
];

/**
 * 将美东时间转换为指定时区时间
 * @param date 日期 YYYY-MM-DD
 * @param time 时间 HH:mm (美东时间)
 * @param offsetHours 时区偏移小时数 (默认12小时为北京时间)
 * @returns 转换后的时间
 */
export function convertToTimezone(date: string, time: string, offsetHours: number = 12): ConvertedTime {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);
  
  let newHours = hours + offsetHours;
  let newDay = day;
  let newMonth = month;
  let newYear = year;
  let isNextDay = false;
  
  // Handle day overflow
  while (newHours >= 24) {
    newHours -= 24;
    isNextDay = true;
    
    const daysInMonth = new Date(year, month, 0).getDate();
    newDay += 1;
    
    if (newDay > daysInMonth) {
      newDay = 1;
      newMonth += 1;
      
      if (newMonth > 12) {
        newMonth = 1;
        newYear += 1;
      }
    }
  }
  
  // Handle day underflow (negative offset)
  while (newHours < 0) {
    newHours += 24;
    newDay -= 1;
    
    if (newDay < 1) {
      newMonth -= 1;
      if (newMonth < 1) {
        newMonth = 12;
        newYear -= 1;
      }
      newDay = new Date(newYear, newMonth, 0).getDate();
    }
  }
  
  const newDate = `${newYear}-${newMonth.toString().padStart(2, "0")}-${newDay.toString().padStart(2, "0")}`;
  const newTime = `${newHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  
  return {
    date: newDate,
    time: newTime,
    isNextDay,
  };
}

/**
 * 将美东时间转换为北京时间 (backward compatible)
 * @param date 日期 YYYY-MM-DD
 * @param time 时间 HH:mm (美东时间)
 * @returns 北京时间
 */
export function convertToBeijingTime(date: string, time: string): BeijingTime {
  return convertToTimezone(date, time, 12);
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
