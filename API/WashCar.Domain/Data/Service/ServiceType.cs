namespace WashCar.Domain.Data.Service;

public class ServiceType
{
    public ServiceTypeEnum Id { get; set; }
    public string Name { get; set; }

    private ServiceType() { }

    public ServiceType(ServiceTypeEnum type)
    {
        Id = type;
        Name = type.ToString();
    }
}

public enum ServiceTypeEnum
{
    Basic,
    Premium,
    Detailing
}
