package com.saferoute.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "zones")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Zone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private Location location;

    // GREEN, ORANGE, RED
    @Enumerated(EnumType.STRING)
    private ZoneStatus status;

    private LocalDateTime startTime; // if time-based

    private LocalDateTime endTime;

    private LocalDateTime updatedAt;
}
