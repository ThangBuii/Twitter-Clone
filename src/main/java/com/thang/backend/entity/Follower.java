package com.thang.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "follower")
public class Follower {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FollowerID")
    private int followerID;

    @ManyToOne
    @JoinColumn(name = "FollowerUserID")
    private User followerUser;

    @ManyToOne
    @JoinColumn(name = "FollowingUserID")
    private User followingUser;

    // Constructors, getters, and setters
}
