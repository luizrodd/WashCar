using Microsoft.EntityFrameworkCore;
using WashCar.Domain.Core;

namespace WashCar.Infrastructure.Core;

public abstract class Repository<TEntity, TKey> : IRepository<TEntity, TKey> where TEntity : Entity<TKey>, IAggregateRoot
{
    protected readonly ApplicationDataContext _dataContext;
    protected readonly DbSet<TEntity> _entity;

    public Repository(ApplicationDataContext context)
    {
        _dataContext = context ?? throw new ArgumentNullException(nameof(context));
        _entity = _dataContext.Set<TEntity>();
    }

    public virtual IQueryable<TEntity> GetAll()
    {
        return _entity;
    }

    public virtual void Add(TEntity obj)
    {
        _entity.Add(obj);
    }

    public virtual TEntity Get(TKey id)
    {
        return _entity.Find(id);
    }

    public virtual void Update(TEntity obj)
    {
        _entity.Update(obj);
    }

    public void SaveChanges()
    {
        _dataContext.SaveChanges();
    }

    public void Remove(TEntity obj)
    {
        _entity.Remove(obj);
    }
}
