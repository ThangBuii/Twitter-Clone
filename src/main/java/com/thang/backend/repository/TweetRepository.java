package com.thang.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thang.backend.entity.Tweet;

@Repository
public interface TweetRepository extends JpaRepository<Tweet,Integer>{
    
}
