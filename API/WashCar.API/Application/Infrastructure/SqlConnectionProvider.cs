using Microsoft.Data.SqlClient;

namespace WashCar.API.Application.Infrastructure;

public class SqlConnectionProvider
{
    private readonly string _connectionString;

    public SqlConnectionProvider(string connectionString)
    {
        _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
    }

    public SqlConnection GetConnection()
    {
        return new SqlConnection(_connectionString);
    }
}
