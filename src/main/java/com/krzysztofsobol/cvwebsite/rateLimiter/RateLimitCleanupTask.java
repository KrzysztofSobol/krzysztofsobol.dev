package com.krzysztofsobol.cvwebsite.rateLimiter;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@EnableScheduling
public class RateLimitCleanupTask {

    private final RateLimiter rateLimiter;

    public RateLimitCleanupTask(RateLimiter rateLimiter) {
        this.rateLimiter = rateLimiter;
    }

    @Scheduled(fixedRate = 1800000)
    public void cleanupOldEntries() {
        rateLimiter.cleanUp();
    }
}