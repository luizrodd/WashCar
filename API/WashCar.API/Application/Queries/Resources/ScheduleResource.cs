namespace WashCar.API.Application.Queries.Resources
{
    public class ScheduleResource
    {
        public static string GET_ALL_SCHEDULES_BY_DATE = @"
     SELECT (
        SELECT
        JSON_QUERY((
            SELECT c.Id, c.Name, c.CreatedAt, c.PhoneNumber, c.Email
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        )) AS Client,
        JSON_QUERY((
            SELECT v.Id, v.Color, v.Model, v.Plate, v.Year, v.TotalVisits
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        )) AS Vehicle,
        JSON_QUERY((
            SELECT
                ser.Id,
                ser.Name,
                ser.Type,
                ser.Description,
                ser.Price
            FROM ScheduleServices AS ss
            INNER JOIN Services ser ON ser.Id = ss.ServiceId
            WHERE ss.ScheduleId = s.Id
            FOR JSON PATH
        )) AS Services,
        s.ScheduledAt,
        st.Name AS Status
    FROM Schedules s
    INNER JOIN Vehicles  v ON v.Id = s.VehicleId
    INNER JOIN Clients   c ON c.Id = v.ClientId
    INNER JOIN ScheduleStatus st ON st.Id = s.Status
    WHERE CAST(s.ScheduledAt AS date) = @Day
    FOR JSON PATH
) AS JsonResult;
        ";

		public static string GET_ALL_SCHEDULES_BY_RANGE = @"
;WITH DateRange AS
(
    SELECT @StartDate AS DayValue
    UNION ALL
    SELECT DATEADD(DAY, 1, DayValue)
    FROM DateRange
    WHERE DayValue < @EndDate
)
        SELECT
JSON_QUERY((
SELECT
    CAST(d.DayValue AS date) as Day,
    JSON_QUERY((
        SELECT
                JSON_QUERY((
                    SELECT
                        v.Id,
                        v.Color,
                        v.CreatedAt,
                        v.LastVisitedAt,
                        v.Model,
                        v.Plate,
                        v.TotalVisits,
                        v.Year
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                )) as Vehicle,
                JSON_QUERY((
                    SELECT
                        c.Id,
                        c.CreatedAt,
                        c.Email,
                        c.Name,
                        c.PhoneNumber
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                )) AS Client,
                s.Id,
                s.CreatedAt,
                s.ScheduledAt,
                st.Name AS Status,
                s.UpdatedAt
        FROM
            Schedules s
        INNER JOIN
            Vehicles v ON v.Id = s.VehicleId
        INNER JOIN
            Clients c ON c.Id = v.ClientId
        INNER JOIN
            ScheduleStatus st ON st.Id = s.Status
        WHERE 
                CAST(s.ScheduledAt as date) >= d.DayValue
                AND s.ScheduledAt <  DATEADD(DAY, 1, d.DayValue)  -- half-open interval per day
        FOR JSON PATH
    )) AS Appointments
FROM DateRange AS d
FOR JSON PATH
))
		";
    }
}
