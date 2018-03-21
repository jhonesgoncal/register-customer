using MongoDB.Driver;
using RegisterCustomer.Api.DataContext;
using RegisterCustomer.Api.Models;
using RegisterCustomer.Api.Respository.Contracts;
using System.Collections.Generic;
using System.Linq;

namespace RegisterCustomer.Api.Respository
{
    public class CustomerRepository : ICustomerRespository
    {
        private RegisterCustomerDataContext _db = new RegisterCustomerDataContext();
        public bool Create(Customer customer)
        {
            try
            {
                var customers = _db.mongodb.GetCollection<Customer>("customers");
                customers.InsertOne(customer);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public IEnumerable<Customer> Get()
        {
           return _db.mongodb.GetCollection<Customer>("customers").Find(_ => true).ToList();
        }
        public void Dispose()
        {
           // _db.mongodb.Client.
        }
    }
}
