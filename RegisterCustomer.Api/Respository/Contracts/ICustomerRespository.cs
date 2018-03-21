using RegisterCustomer.Api.Models;
using System;
using System.Collections.Generic;

namespace RegisterCustomer.Api.Respository.Contracts
{
    public interface ICustomerRespository : IDisposable
    {
        bool Create(Customer customer);
        IEnumerable<Customer> Get();
    }
}
