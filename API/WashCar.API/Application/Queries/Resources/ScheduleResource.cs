namespace WashCar.API.Application.Queries.Resources
{
    public class ScheduleResource
    {
        public static string GET_ALL_SCHEDULES_BY_DATE = @"
        SELECT
JSON_QUERY((
	SELECT
		c.Id,
		c.Name,
		c.CreatedAt,
		c.PhoneNumber,
		c.Email
	FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
)) AS Client,
JSON_QUERY((
	SELECT
		v.Id,
		v.Color,
		v.Model,
		v.Plate,
		v.Year,
		v.TotalVisits
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
	INNER JOIN
		Services ser ON ser.Id = ss.ServiceId
	WHERE
		ss.ScheduleId = s.Id
	FOR JSON PATH
)) AS Services,
s.ScheduledAt,
st.Name AS Status
FROM 
	Schedules s
INNER JOIN
	Vehicles  v ON v.Id = s.VehicleId
INNER JOIN
	Clients   c ON c.Id = v.ClientId
INNER JOIN
    ScheduleStatus st ON st.Id = s.Status
WHERE
	CAST(S.ScheduledAt AS date) = @Day
FOR JSON PATH
        ";
    }
}
