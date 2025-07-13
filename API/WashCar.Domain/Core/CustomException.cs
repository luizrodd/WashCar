namespace School.Domain.Core;

public class CustomException : Exception
{

    public CustomException(string message)
        : base(message)
    {
    }
}
