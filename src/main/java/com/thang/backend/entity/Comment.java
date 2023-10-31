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
@Table(name = "comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CommentID")
    private int commentID;

    @ManyToOne
    @JoinColumn(name = "TweetID")
    private Tweet tweet;

    @ManyToOne
    @JoinColumn(name = "UserID")
    private User user;

    @Column(name = "Content", length = 1000)
    private String content;

    @Column(name = "CreatedAt")
    @Temporal(TemporalType.DATE)
    private Date createdAt;

    // Constructors, getters, and setters
}