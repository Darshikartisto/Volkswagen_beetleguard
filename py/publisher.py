# publisher.py
import redis

# Initialize Redis client
redis_client = redis.Redis(host='localhost', port=6379, db=0)

def publish_message(channel, message):
    redis_client.publish(channel, message)
    print(f"Published to Redis: '{message}' on channel '{channel}'")
