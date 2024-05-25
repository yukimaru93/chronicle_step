class Push
    include Count

    def initialize(year,month)
        @month = month
        @year = year
    end

    WEEKDAY = 7

    def count_week(year,month)
        if ( month == 2 ) && ( year % 4 == 0 )
            4
        else
            5
        end
    end

    def array_pass
        calendar_array = []
        weeks = count_week(@year,@month)
        # 来月が何月か
        next_month = next_month(@month)

        # 先月が何月か
        last_month = last_month(@month)

        # 先月の最終日の日付
        last_month_last_day = this_month_last_day(@year,last_month)

        # 今月の最終日の日付
        this_month_last_day = this_month_last_day(@year,@month)
        
        # 今月の最初の曜日
        this_month_first = this_month_first(@year,@month)
        
        # 今月の最後の曜日
        this_month_last = this_month_last(@year,@month)
        
        # 来月の最初の曜日
        next_month_first = this_month_first(@year,next_month)
        
        # 先月の最後の曜日
        last_month_last = this_month_last(@year,last_month)
        
        # ２週目の最初の日付
        next_week_first_day = (1 + WEEKDAY) - this_month_first
        
        # 最終週の最初の日付
        end_week_first_day = this_month_last_day - this_month_last 
        
        
        weeks.times do |t|
            week = []
            WEEKDAY.times do |i|
                if t == 0
                    if last_month_last == 6
                        num = i + 1
                        week.push({year:@year,month:@month,date:num})
                    else
                        num = last_month_last_day - last_month_last + i
                        if num > last_month_last_day
                            num = num - last_month_last_day
                            week.push({year:@year,month:@month,date:num})
                        else
                            week.push({year:@year,month:last_month,date:""})
                        end
                    end
                elsif (t + 1) == weeks
                    if (t + 1) == 4
                        week.push({year:@year,month:@month,date:end_week_first_day})
                        end_week_first_day += 1
                    else
                        num = end_week_first_day + i
                        if num > this_month_last_day
                            num = num - this_month_last_day
                            week.push({year:@year,month:next_month,date:""})
                        else
                            week.push({year:@year,month:@month,date:num})
                        end
                    end        
                else
                    num = next_week_first_day + (7 * (t - 1)) + i
                    week.push({year:@year,month:@month,date:num})
                end
            end
            calendar_array << week
        end
        calendar_array
    end
end
