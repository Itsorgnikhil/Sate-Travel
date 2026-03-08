package com.saferoute.service;

import com.saferoute.model.*;
import com.saferoute.repository.ReviewRepository;
import com.saferoute.repository.ZoneHistoryRepository;
import com.saferoute.repository.ZoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ZoneService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ZoneRepository zoneRepository;

    @Autowired
    private ZoneHistoryRepository zoneHistoryRepository;

    public void updateZoneForLocation(Location location) {
        List<Review> reviews = reviewRepository.findByLocationId(location.getId());
        
        if (reviews.isEmpty()) return;

        double totalScore = 0;
        for (Review r : reviews) {
            totalScore += r.getSentimentScore();
        }
        double avgScore = totalScore / reviews.size();

        ZoneStatus newStatus = ZoneStatus.RED;
        if (avgScore > 2.0) {
            newStatus = ZoneStatus.GREEN;
        } else if (avgScore >= 0) {
            newStatus = ZoneStatus.ORANGE;
        }

        Optional<Zone> optionalZone = zoneRepository.findByLocationId(location.getId());
        Zone zone;
        boolean statusChanged = false;
        if (optionalZone.isPresent()) {
            zone = optionalZone.get();
            if (zone.getStatus() != newStatus) {
                zone.setStatus(newStatus);
                zone.setUpdatedAt(LocalDateTime.now());
                statusChanged = true;
            }
        } else {
            zone = new Zone();
            zone.setLocation(location);
            zone.setStatus(newStatus);
            zone.setUpdatedAt(LocalDateTime.now());
            statusChanged = true;
        }

        zoneRepository.save(zone);

        if (statusChanged) {
            ZoneHistory history = new ZoneHistory();
            history.setLocation(location);
            history.setStatus(newStatus);
            history.setRecordedAt(LocalDateTime.now());
            zoneHistoryRepository.save(history);
        }
    }
}
