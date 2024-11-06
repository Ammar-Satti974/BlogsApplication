using System.ComponentModel.DataAnnotations;

namespace blog_backend.DTO
{
    public class RegisterDto
    {
        [Display(Name = "Username")]
        public required string UserName { get; set; }

        [EmailAddress]
        [Display(Name = "Email Address")]
        public required string Email { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public required string Password { get; set; }

        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Passwords do not match.")]
        [Display(Name = "Confirm Password")]
        public required string ConfirmPassword { get; set; }
    }
}
