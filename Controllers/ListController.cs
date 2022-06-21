using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using System.Collections.Generic;
using System.Text.Json;
using InterviewTest.Model;

namespace InterviewTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ListController : ControllerBase
    {
        public ListController()
        {
        }

        [HttpPost]
        public void Post([FromBody]Employee employee)
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                using (var transaction = connection.BeginTransaction())
                {
                    var insertCmd = connection.CreateCommand();
                    insertCmd.CommandText = @"INSERT INTO Employees VALUES ('"+ employee.Name +"', "+ employee.Value +");";
                    insertCmd.ExecuteNonQuery();
                    transaction.Commit();
                }
            }
        }
        /*
         * List API methods goe here
         * */
    }
}
