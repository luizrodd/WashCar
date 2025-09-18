using WashCar.API.Application.Policy;
using WashCar.API.Application.Queries;
using WashCar.Domain.Core;
using WashCar.Domain.Data.Client;
using WashCar.Domain.Data.Schedule;
using WashCar.Domain.Data.Service;
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
            services.AddScoped<IScheduleRepository, ScheduleRepository>();
            services.AddScoped<IServiceRepository, ServiceRepository>();

            //Queries
            services.AddScoped<IAvaibleTimeQueries, AvaibleTimeQueries>();
            services.AddScoped<ISchedulesQueries, ScheduleQueries>();

            //Services

            //Excel

            // Policies
            services.AddScoped<ISchedulePolicy, SchedulePolicy>();

            return services;
        }
    }
}
