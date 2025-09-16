using WashCar.Domain.Core;
using WashCar.Domain.Data.Client;
using WashCar.Infrastructure.Repositories;

namespace WashCar.API.Configurations
{
    public static class DependencyInjectionConfiguration
    {
        public static IServiceCollection AddDependencyInjectionConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            //Security

            //Repositories
            services.AddScoped<IClientRepository, ClientRepository>();

            //Queries

            //Services

            //Excel

            return services;
        }
    }
}
