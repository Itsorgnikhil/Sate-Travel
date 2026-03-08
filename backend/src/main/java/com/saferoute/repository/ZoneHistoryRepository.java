package com.saferoute.repository;

import com.saferoute.model.ZoneHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ZoneHistoryRepository extends JpaRepository<ZoneHistory, Long> {
    List<ZoneHistory> findByLocationIdOrderByRecordedAtDesc(Long locationId);
}
