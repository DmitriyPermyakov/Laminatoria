﻿using System.ComponentModel.DataAnnotations;

namespace Laminatoria.DTO
{
    public class LoginRequest
    {
        [Required]
        public string Email { get; set; }
        [Required] 
        public string Password { get; set; }
    }
}
