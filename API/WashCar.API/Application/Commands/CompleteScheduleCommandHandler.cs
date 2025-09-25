using MediatR;
using WashCar.Domain.Data.Schedule;

namespace WashCar.API.Application.Commands;

public class CompleteScheduleCommandHandler(IScheduleRepository scheduleRepository) : IRequestHandler<CompleteScheduleCommand, bool>
{
    private readonly IScheduleRepository _scheduleRepository = scheduleRepository ?? throw new ArgumentNullException(nameof(scheduleRepository));
    public async Task<bool> Handle(CompleteScheduleCommand request, CancellationToken cancellationToken)
    {
        var schedule = _scheduleRepository.Get(request.Id);
        if (schedule == null)
            return false;

        schedule.Completed();

        _scheduleRepository.SaveChanges();
        return true;
    }
}

public record CompleteScheduleCommand(Guid Id) : IRequest<bool>
{
}
