using System.Collections.Generic;

namespace FormApi.Services.Models
{
    public class Context
    {
        public string Key { get; set; }
        public string Label { get; set; }
    }

    public class Detail
    {
        public string Message { get; set; }
        public List<string> Path { get; set; }
        public string Type { get; set; }
    }

    public class ServiceError
    {
        public string Name { get; set; }
        public IList<Detail> Details { get; set; }
    }
}