export class DateObj {
  day: number;
  month: number;
  year: number;
   /**
    *
    */
   constructor() {
     this.day = 1;
     this.month = 1;
     this.year = 1950;
   }
}

export class TimerTemplate {
  // day: Array<number> = [];
  dayList = [] as number[];
  monthList = [] as number[];
  yearList = [] as number[];
  // Date type object

  constructor() {
    for (let month = 0; month <= 12; month++) {
      this.monthList.push(month);
      this.dayList.push(month + 1);

      if (month === 12) {
        for (let i = month + 1; i <= 31; i++) {
          this.dayList.push(i);
        }
      }
    }
    const current = new Date();
    for (let index = 1970; index <= current.getFullYear(); index++) {
      this.yearList.push(index);
    }
  }
}
