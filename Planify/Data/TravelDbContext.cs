using Microsoft.EntityFrameworkCore;
using Planify.Data.Models;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace Planify.Data
{
    public class TravelDbContext : DbContext
    {
        public TravelDbContext(DbContextOptions<TravelDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<GroupTrip> GroupTrips { get; set; } // Optional

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure Booking-User relationship
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.User)
                .WithMany(u => u.Bookings)
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.NoAction); // Prevent cascading deletes for UserId

            // Configure Booking-Trip relationship
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Trip)
                .WithMany(t => t.Bookings)
                .HasForeignKey(b => b.TripId)
                .OnDelete(DeleteBehavior.Cascade); // Allow cascading deletes for TripId

            // Set precision for Price column in Trip model
            modelBuilder.Entity<Trip>()
                .Property(t => t.Price)
                .HasColumnType("decimal(18,2)");

            // Optional configurations for other entities
        }

    }
}