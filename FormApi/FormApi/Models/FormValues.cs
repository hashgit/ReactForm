using System.ComponentModel.DataAnnotations;

namespace FormApi.Models
{
    public class FormValues
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        public string MobilePhone { get; set; }
    }
}