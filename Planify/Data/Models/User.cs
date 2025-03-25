using System.Collections.Generic;

namespace Planify.Data.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public ICollection<Trip> Trips { get; set; } // Trips created by this user (for agencies)
        public ICollection<Booking> Bookings { get; set; } // Bookings made by this user
    }
}
