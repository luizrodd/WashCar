using WashCar.API.Application.Infrastructure;
using Dapper;
using WashCar.API.Application.Queries.Resources;

namespace WashCar.API.Application.Queries;

public interface IAvaibleTimeQueries
{
    Task<List<TimeSpan>> GetAvaibleTimes(DateTime day);
}

public class AvaibleTimeQueries(SqlConnectionProvider sqlConnectionProvider) : IAvaibleTimeQueries
{
    private readonly SqlConnectionProvider _sqlConnectionProvider = sqlConnectionProvider ?? throw new ArgumentNullException(nameof(sqlConnectionProvider));

    public async Task<List<TimeSpan>> GetAvaibleTimes(DateTime day)
    {
        var connection = _sqlConnectionProvider.GetConnection();
        connection.Open();

        var query = await connection.QueryAsync<TimeSpan>(
            TimeResource.GET_AVAIBLE_TIMES_ON_DAY,
            new
            {
                Day = day.Date,
                WindowStart = TimeSpan.FromHours(5), 
                WindowEnd = TimeSpan.FromHours(23), 
                SlotMinutes = 30                     
            });

        return query.ToList();
    }
}
