package com.thang.backend.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "retweet")
public class Retweet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RetweetID")
    private int retweetID;

    @ManyToOne
    @JoinColumn(name = "TweetID")
    private Tweet tweet;

    @ManyToOne
    @JoinColumn(name = "UserID")
    private User user;

    @Column(name = "CreatedAt")
    @Temporal(TemporalType.DATE)
    private Date createdAt;

    // Constructors, getters, and setters
}
