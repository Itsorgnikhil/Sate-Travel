package com.saferoute.controller;

import com.saferoute.model.Location;
import com.saferoute.model.Review;
import com.saferoute.model.Zone;
import com.saferoute.model.ZoneHistory;
import com.saferoute.repository.LocationRepository;
import com.saferoute.repository.ReviewRepository;
import com.saferoute.repository.ZoneHistoryRepository;
import com.saferoute.repository.ZoneRepository;
import com.saferoute.service.ZoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/locations")
@CrossOrigin(origins = "*") // Allow React frontend to connect
public class LocationController {

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private ZoneRepository zoneRepository;

    @Autowired
    private ZoneHistoryRepository zoneHistoryRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ZoneService zoneService;

    // Get all locations
    @GetMapping
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    // Get Zones
    @GetMapping("/zones")
    public List<Zone> getAllZones() {
        return zoneRepository.findAll();
    }

    // Get Location Details (including zone and reviews)
    @GetMapping("/{id}")
    public ResponseEntity<?> getLocationDetails(@PathVariable Long id) {
        Location location = locationRepository.findById(id).orElse(null);
        if (location == null) {
            return ResponseEntity.notFound().build();
        }
        Zone zone = zoneRepository.findByLocationId(id).orElse(null);
        List<Review> reviews = reviewRepository.findByLocationId(id);
        
        // This is a simple DTO structure embedded in a map
        return ResponseEntity.ok(java.util.Map.of(
            "location", location,
            "zone", zone != null ? zone : "No zone setup",
            "reviews", reviews
        ));
    }

    // Submit a review (Simplifying for demo purposes)
    @PostMapping("/{id}/reviews")
    public ResponseEntity<?> submitReview(@PathVariable Long id, @RequestBody Review review) {
        Location location = locationRepository.findById(id).orElse(null);
        if (location == null) return ResponseEntity.notFound().build();
        
        review.setLocation(location);
        review.setTimestamp(LocalDateTime.now());
        
        // Determine simple sentiment
        double score = 0;
        String text = review.getContent().toLowerCase();
        if (text.contains("safe") || text.contains("police") || text.contains("well lit")) score = 3.0;
        else if (text.contains("robbery") || text.contains("accident") || text.contains("unsafe")) score = -3.0;
        else if (text.contains("suspicious")) score = -1.0;
        review.setSentimentScore(score);

        reviewRepository.save(review);
        zoneService.updateZoneForLocation(location);

        return ResponseEntity.ok(review);
    }
}
