using Planify.Data.Models;

namespace Planify.Data.dtos.BookingsDtos
{
    public class CreateBookingDto
    {
        public DateTime BookingDate { get; set; }
        
        public int TripId { get; set; }

    }
}
