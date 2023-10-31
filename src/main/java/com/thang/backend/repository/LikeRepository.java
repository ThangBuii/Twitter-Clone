package com.thang.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thang.backend.entity.Like;

@Repository
public interface LikeRepository extends JpaRepository<Like,Integer> {
    
}
