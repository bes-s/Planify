using Planify.Data.Models;
using System;
using System.Collections.Generic;

namespace Planify.Data.Models
{
    public class Trip
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal Price { get; set; }
        public string Location { get; set; }

        // Foreign Key for the User who created the trip (agency)
        public int CreatedById { get; set; }
        public User? CreatedBy { get; set; }

        // Navigation Properties
        public ICollection<Booking>? Bookings { get; set; } // Bookings for this trip
    }
}
