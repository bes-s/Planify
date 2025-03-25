using Microsoft.AspNetCore.Mvc;
using Planify.Data.Models;
using Planify.Data;
using Microsoft.EntityFrameworkCore;
using Planify.Data.dtos.BookingsDtos;

[Route("api/bookings")]
[ApiController]
public class BookingsController : ControllerBase
{
    private readonly TravelDbContext _context;

    public BookingsController(TravelDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult CreateBooking([FromBody] CreateBookingDto bookingDto)
    {
        // Fetch UserId from the JWT claims
        var userIdClaim = User.FindFirst("UserId");
        if (userIdClaim == null)
        {
            return Unauthorized(new { message = "User not authenticated." });
        }

        int userId = int.Parse(userIdClaim.Value);

        // Validate Trip existence
        var trip = _context.Trips.Find(bookingDto.TripId);
        if (trip == null)
        {
            return BadRequest(new { message = "Invalid Trip ID." });
        }

        // Create and save booking
        var booking = new Booking
        {
            TripId = bookingDto.TripId,
            UserId = userId,
            BookingDate = DateTime.Now
        };

        _context.Bookings.Add(booking);
        _context.SaveChanges();

        return Ok(booking);
    }



    // Get all bookings for a user
    [HttpGet("{userId}")]
    public IActionResult GetUserBookings(int userId)
    {
        var bookings = _context.Bookings
            .Where(b => b.UserId == userId)
            .Include(b => b.Trip) // Include trip details for each booking
            .ToList();

        if (bookings == null || !bookings.Any())
        {
            return NotFound(new { message = "No bookings found for this user." });
        }

        return Ok(bookings);
    }
}
