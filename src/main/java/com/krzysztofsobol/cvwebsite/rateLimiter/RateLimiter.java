package com.krzysztofsobol.cvwebsite.rateLimiter;

import lombok.Getter;
import org.springframework.stereotype.Component;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class RateLimiter {
    private final Map<String, RequestCount> requestCounts = new ConcurrentHashMap<>();

    private final int MAX_REQUESTS = 40; // Maximum requests allowed
    private final long TIME_WINDOW_MS = 60 * 1000; // 1-minute window

    public boolean allowRequest(String ipAddress) {
        long now = System.currentTimeMillis();

        RequestCount count = requestCounts.computeIfAbsent(ipAddress, k -> new RequestCount(now));

        synchronized (count) {
            long elapsed = now - count.getWindowStart();
            if (elapsed > TIME_WINDOW_MS) {
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