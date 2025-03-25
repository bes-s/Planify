using Microsoft.AspNetCore.Mvc;
using Planify.Data;
using Planify.Data.Models;
using System.Linq;

[Route("api/trips")]
[ApiController]
public class TripsController : ControllerBase
{
    private readonly TravelDbContext _context;

    public TripsController(TravelDbContext context)
    {
        _context = context;
    }

    // GET: api/trips
    [HttpGet]
    public IActionResult GetAllTrips(int? userId = null)
    {
        var trips = _context.Trips.AsQueryable();

        if (userId.HasValue)
        {
            trips = trips.Where(t => t.CreatedById == userId);
        }

        return Ok(trips.ToList());
    }


    // GET: api/trips/{id}
    [HttpGet("{id}")]
    public IActionResult GetTripById(int id)
    {
        var trip = _context.Trips.FirstOrDefault(t => t.Id == id);
        if (trip == null) return NotFound();
        return Ok(trip);
    }

    // POST: api/trips
    [HttpPost]
    public IActionResult CreateTrip([FromBody] Trip trip)
    {
        // Validate required fields
        if (string.IsNullOrEmpty(trip.Title) || string.IsNullOrEmpty(trip.Description) ||
            trip.StartDate == default || trip.EndDate == default ||
            string.IsNullOrEmpty(trip.Location) || trip.Price <= 0)
        {
            return BadRequest(new { message = "All fields are required, and price must be greater than 0." });
        }

        // Ensure StartDate is before EndDate
        if (trip.StartDate >= trip.EndDate)
        {
            return BadRequest(new { message = "StartDate must be before EndDate." });
        }

        // Ensure CreatedById is provided
        if (trip.CreatedById <= 0)
        {
            return BadRequest(new { message = "Invalid CreatedById." });
        }

        _context.Trips.Add(trip);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetAllTrips), new { id = trip.Id }, trip);
    }



    // PUT: api/trips/{id}
    [HttpPut("{id}")]
    public IActionResult UpdateTrip(int id, [FromBody] Trip updatedTrip)
    {
        var trip = _context.Trips.FirstOrDefault(t => t.Id == id);
        if (trip == null)
        {
            return NotFound(new { message = "Trip not found." });
        }

        // Validate required fields
        if (string.IsNullOrEmpty(updatedTrip.Title) || string.IsNullOrEmpty(updatedTrip.Description) ||
            updatedTrip.StartDate == default || updatedTrip.EndDate == default ||
            string.IsNullOrEmpty(updatedTrip.Location) || updatedTrip.Price <= 0)
        {
            return BadRequest(new { message = "All fields are required, and price must be greater than 0." });
        }

        // Update trip fields
        trip.Title = updatedTrip.Title;
        trip.Description = updatedTrip.Description;
        trip.StartDate = updatedTrip.StartDate;
        trip.EndDate = updatedTrip.EndDate;
        trip.Location = updatedTrip.Location;
        trip.Price = updatedTrip.Price;

        _context.SaveChanges();
        return Ok(trip);
    }


    // DELETE: api/trips/{id}
    [HttpDelete("{id}")]
    public IActionResult DeleteTrip(int id)
    {
        var trip = _context.Trips.FirstOrDefault(t => t.Id == id);
        if (trip == null) return NotFound();

        _context.Trips.Remove(trip);
        _context.SaveChanges();
        return NoContent();
    }
}
