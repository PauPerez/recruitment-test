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

        public void DeleteEmployees()
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                using (var transaction = connection.BeginTransaction())
                {
                    var insertCmd = connection.CreateCommand();
                    insertCmd.CommandText = @"DELETE FROM Employees;";
                    insertCmd.ExecuteNonQuery();
                    transaction.Commit();
                }
            }
        }

        [HttpPost("[action]")]
        public void addEmployee([FromBody]Employee employee)
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

        [HttpPost("[action]")]
        public void ApplyChanges([FromBody] List<Employee> employees)
        {
            DeleteEmployees();
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                using (var transaction = connection.BeginTransaction())
                {

                    var insertCmd = connection.CreateCommand();
                    insertCmd.CommandText = @"INSERT INTO Employees VALUES ";
                    foreach (var employee in employees)
                    {
                        insertCmd.CommandText += "('" + employee.Name + "', " + employee.Value + "),";
                    }
                    insertCmd.CommandText = insertCmd.CommandText.Remove(insertCmd.CommandText.Length-1);
                    insertCmd.CommandText += ";";
                    insertCmd.ExecuteNonQuery();
                    transaction.Commit();
                }
            }
        }

        [HttpGet]
        public int Sum()
        {
            int sum = 0;

            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                var queryCmd = connection.CreateCommand();
                queryCmd.CommandText = @"SELECT  SUM(Value) FROM Employees WHERE Name like 'A%' OR Name like 'a%' OR Name like 'B%' OR Name like 'b%' OR Name like 'C%' OR Name like 'c%'";
                using (var reader = queryCmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        sum = reader.GetInt32(0);
                    }
                }
            }

            return sum;
        }
        /*
         * List API methods goe here
         * */
    }
}
