namespace School.Domain.Core
{
    public interface IRepository<TEntity, TKey> where TEntity : Entity<TKey>, IAggregateRoot
    {
        IQueryable<TEntity> GetAll();
        void Add(TEntity obj);
        TEntity Get(TKey id);
        void Update(TEntity obj);
        void Remove(TEntity obj);
        void SaveChanges();
    }
}