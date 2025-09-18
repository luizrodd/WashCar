using WashCar.API.Application.Infrastructure;
using WashCar.API.Application.Models;
using Dapper;
using WashCar.API.Application.Queries.Resources;
using System.Text.Json;

namespace WashCar.API.Application.Queries;

public interface ISchedulesQueries
{
    Task<AppointmentsDetailsDTO> Get(DateTime date);
}

public class ScheduleQueries(SqlConnectionProvider sqlConnectionProvider) : ISchedulesQueries
{
    private readonly SqlConnectionProvider _sqlConnectionProvider = sqlConnectionProvider ?? throw new ArgumentNullException(nameof(sqlConnectionProvider));
    public async Task<AppointmentsDetailsDTO> Get(DateTime date)
    {
        await using var connection = _sqlConnectionProvider.GetConnection();
        await connection.OpenAsync();

        var query = await connection.QueryFirstOrDefaultAsync<string>(ScheduleResource.GET_ALL_SCHEDULES_BY_DATE, new
        {
            Day = date.Date
        });

        if (string.IsNullOrEmpty(query))
            return null;

        var schedules = JsonSerializer.Deserialize<List<ScheduleDetailsDTO>>(query);

        return new AppointmentsDetailsDTO
        {
            Schedules = schedules
        };
    }
}