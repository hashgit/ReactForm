using System.ComponentModel.DataAnnotations;

namespace FormApi.Models
{
    public class Form
    {
        [Required]
        public FormValues Data { get; set; }
    }
}