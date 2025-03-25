using Planify.Data.Models;
using System.Collections.Generic;

namespace Planify.Data.Models
{
    public class GroupTrip
    {
        public int Id { get; set; } // Primary Key
        public int TripId { get; set; } // Foreign Key for the Trip
        public Trip Trip { get; set; }

        // Members of the group trip
        public ICollection<User> Members { get; set; }
    }
}
