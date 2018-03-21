using MongoDB.Driver;
using RegisterCustomer.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RegisterCustomer.Api.DataContext
{
    public class RegisterCustomerDataContext
    {
        private string connectionString = "mongodb://jhonesgoncalves:41321158@ds121089.mlab.com:21089/dbcustomers";
        private MongoClient _client;
        public IMongoDatabase mongodb; 
        public RegisterCustomerDataContext()
        {
            _client = new MongoClient(connectionString);
            mongodb = _client.GetDatabase("dbcustomers");

        }
        
        public List<Customer> Customers { get; set; }
    }
}
