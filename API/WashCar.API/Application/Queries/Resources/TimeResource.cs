namespace WashCar.API.Application.Queries.Resources
{
    public class TimeResource
    {
        public static string GET_AVAIBLE_TIMES_ON_DAY =
        @"
;WITH Slots AS (
    -- first slot at @Day @WindowStart
    SELECT DATETIME2FROMPARTS(
               DATEPART(year,@Day), DATEPART(month,@Day), DATEPART(day,@Day),
               DATEPART(hour,@WindowStart), DATEPART(minute,@WindowStart), 0, 0, 0
           ) AS SlotStart
    UNION ALL
    -- next slots every @SlotMinutes until @WindowEnd (inclusive)
    SELECT DATEADD(minute, @SlotMinutes, SlotStart)
    FROM Slots
    WHERE DATEADD(minute, @SlotMinutes, SlotStart) <= DATETIME2FROMPARTS(
              DATEPART(year,@Day), DATEPART(month,@Day), DATEPART(day,@Day),
              DATEPART(hour,@WindowEnd), DATEPART(minute,@WindowEnd), 0, 0, 0
          )
),
Booked AS (
    SELECT CAST(ScheduledAt AS datetime2(0)) AS ScheduledAt
    FROM Schedules
    WHERE CAST(ScheduledAt AS date) = @Day
)
SELECT CONVERT(time(0), s.SlotStart) AS AvailableTime
FROM Slots s
LEFT JOIN Booked b
  ON CONVERT(time(0), b.ScheduledAt) = CONVERT(time(0), s.SlotStart)
WHERE b.ScheduledAt IS NULL
ORDER BY AvailableTime
OPTION (MAXRECURSION 32767);

        ";
    }
}
