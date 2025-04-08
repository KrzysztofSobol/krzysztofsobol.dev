package com.krzysztofsobol.cvwebsite.rateLimiter;

import lombok.Getter;
import org.springframework.stereotype.Component;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class RateLimiter {
    private final Map<String, RequestCount> requestCounts = new ConcurrentHashMap<>();

    private final int MAX_REQUESTS = 20; // Maximum requests allowed
    private final long TIME_WINDOW_MS = 60 * 1000; // 1 minute window
    private long timeRemaining = 0;

    public boolean allowRequest(String ipAddress) {
        long now = System.currentTimeMillis();

        RequestCount count = requestCounts.computeIfAbsent(ipAddress, k -> new RequestCount(now));

        synchronized (count) {
            timeRemaining = now - count.getWindowStart();
            if (timeRemaining > TIME_WINDOW_MS) {
                count.reset(now);
            }

            if (count.getCount() >= MAX_REQUESTS) {
                return false;
            }

            count.increment();
            return true;
        }
    }

    public void cleanUp() {
        long cutoffTime = System.currentTimeMillis() - TIME_WINDOW_MS;
        requestCounts.entrySet().removeIf(entry ->
                entry.getValue().getWindowStart() < cutoffTime);
    }

    public String getTimeRemaining(){
        return String.valueOf((60000 - timeRemaining));
    }

    private static class RequestCount {
        @Getter
        private long windowStart;
        private final AtomicInteger count = new AtomicInteger(0);

        public RequestCount(long startTime) {
            this.windowStart = startTime;
        }

        public int getCount() {
            return count.get();
        }

        public void increment() {
            count.incrementAndGet();
        }

        public void reset(long newStartTime) {
            this.windowStart = newStartTime;
            this.count.set(0);
        }
    }
}