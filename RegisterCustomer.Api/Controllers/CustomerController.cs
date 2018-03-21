using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RegisterCustomer.Api.Models;
using RegisterCustomer.Api.Respository;
using RegisterCustomer.Api.Respository.Contracts;

namespace RegisterCustomer.Api.Controllers
{
    [Route("api/[controller]")]
    public class CustomerController : Controller
    {
        private List<Customer> customers = new List<Customer>();
        private ICustomerRespository _repository = new CustomerRepository();
        [HttpGet]
        public IEnumerable<Customer> Get()
        {
            return _repository.Get();
        }
        
        [HttpPost]
        public Customer Post([FromBody]Customer customer)
        {
            if(_repository.Create(customer))
                return customer;

            return new Customer();
        }
    }
}
