using Planify.Data.Models;
using System;

namespace Planify.Data.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public DateTime BookingDate { get; set; }
        public bool PaymentStatus { get; set; } // True if payment is completed

        // Foreign Key for User
        public int UserId { get; set; }
        public User User { get; set; }

        // Foreign Key for Trip
        public int TripId { get; set; }
        public Trip Trip { get; set; }
    }
}
