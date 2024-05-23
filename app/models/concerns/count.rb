require "date"
module Count
    MOON = [1,3,5,7,8,10,12]
    

    # 今月が何日まであるか
    def this_month_last_day(year,month)
        if MOON.include?(month)
            31
        elsif month == 2 && (year % 4 === 0)
            29
        elsif month == 2 && (year % 4 != 0)
            28
        else
            30
        end
    end

    # 来月が何月か
    def next_month(month)
        if month == 12
            1
        else
            month + 1
        end
    end

    # 先月が何月か
    def last_month(month)
        if month == 1
            12
        else
            month - 1
        end
    end

    # 今月の最初が何曜日か（数字で取得）
    def this_month_first(year,month)
        Date.new(year,month,1).wday
    end

    # 今月の最終日が何曜日か（数字で取得）
    def this_month_last(year,month)
        if MOON.include?(month)
            Date.new(year,month,31).wday
        elsif month == 2 && (year % 4 === 0)
            Date.new(year,month,29).wday
        elsif month == 2 && (year % 4 != 0)
            Date.new(year,month,28).wday
        else
            Date.new(year,month,30).wday
        end
    end

        
end
  
