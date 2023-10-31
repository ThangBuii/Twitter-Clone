package com.thang.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thang.backend.entity.Follower;

@Repository
public interface FollowerRepository extends JpaRepository<Follower,Integer> {
    
}
