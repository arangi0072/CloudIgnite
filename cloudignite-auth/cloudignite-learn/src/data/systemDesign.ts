import { 
  Link, MessageSquare, ShieldAlert, Database, Camera, Video, 
  Car, Bug, Rss, Bell, type LucideIcon 
} from 'lucide-react';

export interface SystemDesignTopic {
  id: string;
  title: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
  desc: string;
  points: string[];
  related: string[];
  content: {
    overview: string;
    sections: { title: string; content: string }[];
  }
}

export const SYSTEM_DESIGN_TOPICS: SystemDesignTopic[] = [
  {
    id: 'unique-id-generator',
    title: 'Unique ID Generator',
    icon: Database,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    desc: 'Generate globally unique IDs at high scale in a distributed system (like Twitter Snowflake).',
    points: ['Distributed Systems', 'Clock Sync', '64-bit ID', 'Concurrency'],
    related: ['url-shortener', 'chat-application'],
    content: {
      overview: 'In a distributed system, a unique ID generator is a foundational component required to uniquely identify entities like tweets, posts, or messages across multiple sharded databases. Generating unique IDs at massive scale, with low latency, and ensuring they are roughly sortable by time is a critical challenge.',
      sections: [
        {
           title: 'Step 1: Requirements Gathering & Constraints',
           content: 'Functional Requirements:\n- The system must generate globally unique IDs.\n- The IDs should be sortable by time (meaning newer IDs are strictly greater than older IDs).\n- The IDs must be numbers (ideally 64-bit integers) to be efficiently indexed by databases.\n\nNon-Functional Requirements:\n- High Availability: If the ID generator is down, the entire platform cannot create new content.\n- Low Latency: Generating an ID must take virtually no time.\n- Massive Scalability: Capable of generating tens of thousands of IDs per second.'
        },
        {
           title: 'Step 2: Exploring Initial Approaches',
           content: '1. Multi-Master Replication: Use database auto-increment with offsets (e.g., Server A generates 1, 3, 5; Server B generates 2, 4, 6).\n   - Issues: Hard to scale cleanly, IDs are not strictly time-sortable across servers.\n\n2. UUIDs (Universally Unique Identifiers): e.g., `09e7c3b2-b1db-4522...\n   - Pros: Completely distributed, no central coordination required.\n   - Cons: 128-bit size creates massive storage overhead and makes primary keys very inefficient in databases. Not easily time sortable.\n\n3. Ticket Server (Flickr Approach): Centralized DB managing auto-incrementing IDs.\n   - Pros: Simple.\n   - Cons: Single point of failure. High latency.'
        },
        {
           title: 'Step 3: Twitter Snowflake Approach (The Standard)',
           content: 'To solve the constraints, companies like Twitter (and Discord, Instagram) developed specialized ID formats. A typical "Snowflake" ID is a 64-bit integer, structured as follows:\n\n```mermaid\npacket-beta\n   0-0: "Sign Bit (always 0)"\n   1-41: "Timestamp (41 Bits)"\n   42-51: "Machine ID (10 Bits)"\n   52-63: "Sequence Number (12 Bits)"\n```\n\n- **Timestamp (41 bits):** Milliseconds since a custom epoch. 41 bits gives us about 69 years of IDs.\n- **Data Center / Machine ID (10 bits):** Identifies the exact machine generating the ID. This allows up to 1024 unique machines to generate IDs completely independently.\n- **Sequence Number (12 bits):** For every ID generated on the exact same machine, in the exact same millisecond, this increments. 12 bits = 4096 IDs per millisecond per machine.'
        },
        {
           title: 'Step 4: Deep Dive into the Components',
           content: 'Let\'s analyze why this design is brilliant.\n\n1. **Sortable by Time:** Because the highest-order bits represent the timestamp, the IDs naturally sort chronologically. You can just do `ORDER BY id` instead of `ORDER BY created_at`.\n2. **Fully Distributed (No Coordination):** Every machine generates IDs locally in RAM. It never talks to a database or ZooKeeper during generation. The only coordination happens when the machine first boots up to claim its `Machine ID` (often via ZooKeeper).\n3. **Throughput:** A single machine can generate 4096 IDs per millisecond, which is 4 million IDs per second. With 1024 machines, the maximum theoretical throughput is 4 Billion IDs per second.'
        },
        {
           title: 'Step 5: Edge Cases & Clock Synchronization',
           content: 'What happens if the system clock goes backwards? This is known as NTP Clock Drift.\n\nSince the ID uniqueness depends on the timestamp constantly moving forward, if the server clock drifts backward by a few milliseconds, it could generate a duplicate ID.\n\n**Mitigations:**\n1. The generator must cache the last timestamp it used.\n2. If it detects `current_time < last_time`, it halts ID generation (throws an error or sleeps) until the clock catches back up to `last_time`.'
        }
      ]
    }
  },
  {
    id: 'url-shortener',
    title: 'URL Shortener',
    icon: Link,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    desc: 'Design a service like TinyURL that takes a long URL and generates a short and unique alias.',
    points: ['Base62 Encoding', 'Hash Collisions', 'Redirection (301 vs 302)', 'High Read Throughput'],
    related: ['key-value-store', 'rate-limiter'],
    content: {
      overview: 'A URL shortener is a fundamental system design case study. It requires designing a scalable, highly available service to process billions of URLs, map long URLs to short unique aliases, and efficiently redirect users. This problem tests your understanding of hashing, database indexing, horizontal scaling, and caching strategies.',
      sections: [
        {
          title: 'Step 1: Requirements Gathering & Constraints',
          content: 'Clarifying the scope is critical before designing the system.\n\n**Functional Requirements:**\n1. **URL Generation:** Given a long URL, the system returns a short, unique alias.\n2. **Redirection:** When a user clicks the short link, the system redirects them to the original URL.\n3. **Custom Aliases:** Users can optionally define a custom short link (if available).\n4. **Expiration:** Links should expire after a predefined duration, with an option for users to set custom expiration times.\n\n**Non-Functional Requirements:**\n1. **High Availability:** The URL redirect service must have five-nines (99.999%) availability. If the service drops, millions of links across the web break instantly.\n2. **Low Latency:** URL redirection must occur in real-time with minimal latency (ideally < 20ms).\n3. **Scalability:** The system must handle heavy read traffic (read-heavy application).\n4. **Security/Unpredictability:** Shortened links must not be guessable. Sequential IDs are vulnerable to enumeration attacks (where bad actors simply iterate URLs to scrape data).'
        },
        {
          title: 'Step 2: Capacity Planning & Estimations',
          content: 'Let\'s assume a massive scale to design a robust architecture.\n\n**Traffic Estimates:**\nAssume 100 Million new URLs are generated per month.\nURL shortening is extremely read-heavy. Let\'s assume a 100:1 read-to-write ratio.\n- **Writes:** 100M / (30 days * 24 hrs * 3600 sec) = ~40 URLs / second.\n- **Reads:** 40 writes/sec * 100 = 4,000 read requests / second.\n\n**Storage Estimates:**\nAssume we store URLs for 10 years.\n- **Total URLs:** 100M/month * 12 months * 10 years = 12 Billion records.\n- **Data Size:** Let\'s assume each URL object takes about 500 bytes (Short URL, Long URL, Timestamp, UserId, Expiration Date).\n- **Total Storage:** 12 Billion * 500 bytes = 6 Terabytes (TB) of database storage.\n\n**Memory (Cache) Estimates:**\nWe should cache the most frequently accessed URLs (using the Pareto principle: 80% of traffic comes from 20% of URLs).\n- Requests per day: 4,000 * 3600 * 24 = ~345 Million requests / day.\n- Caching 20% of daily requests: 0.20 * 345M * 500 bytes = ~34.5 GB of memory required for caching. This easily fits into a moderately sized Redis cluster.\n\n**Bandwidth Estimates:**\n- **Write Bandwidth:** 40 requests/sec * 500 bytes = 20 KB/sec.\n- **Read Bandwidth:** 4,000 requests/sec * 500 bytes = ~2 MB/sec.'
        },
        {
          title: 'Step 3: Database Design',
          content: 'The data schema is very simple: mapping a Short URL to a Long URL.\n\n**Table Design (URL Mapping):**\n- `hash_id` (String, Primary Key) - The short string (e.g., `bX9vK`)\n- `original_url` (String)\n- `creation_date` (Timestamp)\n- `expiration_date` (Timestamp)\n- `user_id` (Integer, Indexed for user dashboards)\n\n**SQL vs NoSQL?**\n- **Relational Databases (MySQL, PostgreSQL):** While SQL can handle tera-scale data via sharding, it introduces complex query routing. Since there are essentially no foreign keys or complex joins in our core URL mapping, a heavy relational engine is overkill.\n- **NoSQL Databases (DynamoDB, Cassandra, MongoDB):** NoSQL is ideal here. We need blazing-fast point lookups (Read requests) and horizontal scalability to accommodate 6TB of data. A wide-column store like Cassandra or a key-value store like DynamoDB/Redis fits perfectly.'
        },
        {
          title: 'Step 4: Algorithm Design (Generating Short Aliases)',
          content: 'This is the crux of the problem. How do we generate the `hash_id`?\n\n**Option 1: Hashing (MD5 / SHA256)**\n- Run MD5 on the Long URL, yielding a 128-bit hash string (e.g., `5d41402abc4b2a...`).\n- Truncate the first 7 characters to use as the short alias.\n- **The Problem:** Hash Collisions. Two different Long URLs might result in the same 7-character string. If a collision occurs, we must append a random string and re-hash. This requires an expensive database read before every write to verify uniqueness.\n\n**Option 2: Counter + Base62 Encoding (Preferred approach)**\n- Base62 uses 62 characters: [a-z, A-Z, 0-9].\n- A 7-character Base62 string allows 62^7 = ~3.5 Trillion combinations (more than enough for 12 Billion limits).\n- We use an auto-incrementing integer counter (like MySQL Auto-Increment or Twitter Snowflake) as a unique ID.\n- When a URL arrives, we get the next unique ID (e.g., 10,000,000,000) and mathematically convert that base-10 number into a base-62 string.\n- **Why this wins:** Zero collisions, mathematically guaranteed uniqueness, incredibly fast.'
        },
        {
          title: 'Step 5: Distributed ID Generation',
          content: 'If we use Base62, we need a massive, highly available counter. A single MySQL database tracking an auto-incrementing integer will bottleneck.\n\n**Approach: ZooKeeper / Distributed Range Servers**\n- We can deploy a dedicated ID Generation Service.\n- The service uses Apache ZooKeeper to allocate ranges of IDs to various application server nodes.\n- Node A receives the range [1 to 1,000,000]. Node B receives [1,000,001 to 2,000,000].\n- When Node A wants to create a short link, it increments entirely in local RAM. Only when Node A exhausts its 1,000,000 IDs does it ask ZooKeeper for a new block. This makes ID generation effectively instantaneous.'
        },
        {
          title: 'Step 6: High Availability and The Read Path',
          content: 'The moment a user clicks a short link:\n\n```mermaid\nflowchart LR\n    User((User)) -->|1. Clicks link| DNS[DNS]\n    DNS -->|2. IP| LB[Load Balancer]\n    LB --> API[API Gateway / Web Server]\n    API -->|3. Check Cache| Cache[(Redis Cache)]\n    Cache -.->|Hit: Return URL| API\n    API -->|4. Miss: Query DB| DB[(NoSQL Database)]\n    DB -.->|Return URL| API\n    API -->|5. Redirect 301/302| User\n```\n\n1. **DNS Resolution:** The client resolves the domain (e.g., `tinyurl.com`).\n2. **Load Balancer:** The request hits an HAProxy/Nginx load balancer, routing to the nearest Web Server.\n3. **Cache (Redis):** The Web Server queries the Redis cluster (Key: `short_url`). If it\'s a cache hit, the server immediately returns the Long URL.\n4. **Database Fallback:** If a cache miss occurs, the API reads the NoSQL Database, retrieves the Long URL, asynchronously saves it back to the Redis Cache, and returns the response.\n5. **Redirection (301 vs 302):** The server returns an HTTP 301 (Permanent Redirect) if you want the user\'s browser to cache the result indefinitely (saves massive server load). Return an HTTP 302 (Found) if your business requires tracking every single click for analytics.'
        },
        {
          title: 'Step 7: Purging and Edge Cases',
          content: '**Data Purging:** How do we delete 10-year-old links?\n- Do not delete links synchronously. This blocks database threads.\n- Use a background Cron Job (or Lambda trigger) that runs during off-peak hours (e.g., 2 AM) to scan for `expiration_date < NOW()` and aggressively prune dead records.\n\n**Malicious Users:** What if someone tries to shorten 10 million links automatically?\n- Deploy a Rate Limiter at the API Gateway level (identifying via IP address or Account API key) implementing a Token Bucket algorithm to throttle abuse.'
        }
      ]
    }
  },
  {
    id: 'chat-application',
    title: 'Chat Application',
    icon: MessageSquare,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    desc: 'Design a real-time messaging service like WhatsApp or Discord serving millions of users.',
    points: ['WebSockets', 'Message Ordering', 'Online Presence', 'Push Notifications'],
    related: ['notification-system', 'key-value-store'],
    content: {
      overview: 'Designing a chat system like WhatsApp, Facebook Messenger, or Discord requires managing massive networks of persistent concurrent connections, guaranteeing sub-second message delivery, tracking presence (online/offline status), and dealing with network partitions.',
      sections: [
        {
          title: 'Step 1: Clarifying Requirements',
          content: 'Functional Requirements:\n- Support 1-on-1 private messaging.\n- Support Group messaging (e.g., up to 500 members in standard apps, or 100,000+ for Discord).\n- Real-time message delivery over low-latency connections.\n- Online presence indicators (green dot) and typing indicators.\n- Message history persistence across multiple devices.\n\nNon-Functional Requirements:\n- Handle 50 million Daily Active Users (DAU).\n- High Availability is paramount (a missed message is a failure; messages cannot be lost).\n- Extremely robust handling of network drops, mobile reconnects, and battery limitations.'
        },
        {
          title: 'Step 2: Network Protocols',
          content: 'Standard HTTP is client-driven (request-response). A server cannot randomly initiate an HTTP response to push data down to the client. How do we get real-time messages?\n\n**Option 1: Polling**\n- Client asks the server every 2 seconds: "Any new messages?". Terribly inefficient. Causes colossal server load and wastes mobile battery.\n\n**Option 2: Long Polling**\n- Client asks for messages. The server holds the TCP connection open indefinitely. If a message arrives, the server responds. The client immediately opens a new Long Poll. Better, but still incurs frequent TCP tearing up/down overhead.\n\n**Option 3: WebSockets (Preferred)**\n- Bi-directional, full-duplex persistent connection. The client performs an initial HTTP handshake requesting a WebSocket upgrade. From then on, both the client and server can fire lightweight binary/text frames down the pipeline instantly.'
        },
        {
          title: 'Step 3: High-Level Client-Server Architecture',
          content: 'A single monolithic server can safely handle only around 65,000 open socket connections by default (due to port constraints), natively scaled to ~1 million using specialized tuning (the C10M problem). But for 50M users, we need thousands of servers.\n\n1. **Load Balancer:** Routes an opening WebSocket connection to the least-utilized Chat Server.\n2. **Chat Servers:** Fleet of stateful servers. Each server holds open ~500k WebSockets.\n3. **Sessions Store (Redis):** A highly available Key-Value store tracking exactly which User ID is currently connected to which Chat Server IP address.\n4. **Message Broker / PubSub (Kafka/Redis):** The central nervous system used to bounce messages securely between disparate Chat Servers.'
        },
        {
          title: 'Step 4: Message Flow (1-on-1 Chat)',
          content: 'What happens when User A messages User B?\n\n```mermaid\nflowchart TD\n    UserA((User A)) -->|1. Websocket Send| CS1[Chat Server 1]\n    CS1 -->|2. Store Message| DB[(Database)]\n    CS1 -->|2. Ack| UserA\n    CS1 <-->|3. Lookup User B| Redis[(Sessions Store)]\n    CS1 -->|4. Route Message| Broker[[Message Broker]]\n    Broker -->|5. Forward| CS2[Chat Server 22]\n    CS2 -->|6. Websocket Delivery| UserB((User B))\n```\n\n1. **Send:** User A types "Hello" and pushes it up their WebSocket to Chat Server-1.\n2. **Persist & Ack:** Chat Server-1 acquires a globally unique Message ID, asynchronously writes the message to the central Database, and sends an "ACK" back to User A (showing the \'Delivered\' checkmark).\n3. **Discovery:** Chat Server-1 queries the Sessions Store (Redis): "Which server is User B connected to?". Redis replies: "Chat Server-22".\n4. **Routing:** Chat Server-1 puts the message onto a Message Queue (or Redis Pub/Sub topic) aimed directly at Chat Server-22.\n5. **Delivery:** Chat Server-22 picks up the payload and drops it down User B\'s active WebSocket.\n6. **Edge Case (Offline):** If Redis replies "User B is disconnected", Chat Server-1 skips step 4 and pushes a payload to Firebase Cloud Messaging (FCM) or Apple Push Notification Service (APNs) to wake up User B\'s phone with a lock-screen banner.'
        },
        {
          title: 'Step 5: Group Chat Complexity & Fan-Out',
          content: 'Group chats change the architecture significantly via the "Fan-Out" problem.\n\nIf User A sends a message in a 5-person group, Chat Server-1 must lookup 4 different Sessions in Redis and route to 4 different WebSockets. Very feasible.\n\n**The Massive Group Problem (e.g., Discord Servers with 100k users)**\n- If someone messages a 100k member server, fanning out 100,000 WebSocket writes instantly will crush the Pub/Sub bus.\n- **Solution:** Sharding and Dedicated Message Queues. Discord heavily partitions specific Discord Channels onto specific Erlang processes. Instead of broadcasting widely, users "subscribe" to highly localized topics. For massively popular rooms, the server intentionally drops events like "Typing indicators" entirely to reduce network swarm.'
        },
        {
          title: 'Step 6: Online Presence (The Green Dot)',
          content: 'Tracking online status for 50M users is wildly expensive. If a user loses cell reception for 5 seconds, do we blast all their friends saying they are offline?\n\n**Heartbeat Mechanism:**\n- The client application fires a lightweight "Ping" down the WebSocket every 5 seconds.\n- If the server misses 3 consecutive pings (15 seconds), it marks the user offline.\n- **Fan-Out Warning:** When User A goes offline, you cannot unconditionally broadcast "User A is offline" to their 1,000 contacts. That creates O(N^2) storm patterns.\n- **Solution:** Presence is strictly lazy-loaded. You only fetch the online status of friends currently visible on your application viewport, or subscribe to presence updates for active chats.'
        },
        {
          title: 'Step 7: Database Schema and Storage',
          content: 'Chat applications have an anomaly: The ratio of Read/Write operations is shockingly close to 1:1. People read messages strictly horizontally (in chronological order) and rarely search old text.\n\n**Database Choice: Wide-Column Stores (Cassandra/HBase)**\n- Wide-column databases are structurally designed for huge write ingestion and lightning-fast sequential reads.\n- **Partition Key:** `ChannelID` or `ThreadID`. All messages for a specific conversation reside clustered closely on the same physical disks.\n- **Clustering Key:** `Message_Timestamp`. Allows the server to instantly perform range queries like "SELECT * WHERE ThreadID=A AND Timestamp < X LIMIT 50" for perfect scroll pagination.\n- **Storage Stratification:** Chat data gets cold fast. 99% of reads are for messages sent today. Move messages > 90 days old from expensive Cassandra SSD clusters onto economical Amazon S3 data lakes.'
        }
      ]
    }
  },
  {
    id: 'rate-limiter',
    title: 'Rate Limiter',
    icon: ShieldAlert,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    desc: 'Design an API Rate Limiter to control traffic and prevent abuse.',
    points: ['Token Bucket', 'Leaking Bucket', 'Sliding Window', 'Redis Scripting'],
    related: ['url-shortener'],
    content: {
      overview: 'A rate limiter throttles incoming requests to prevent server overload, defend against malicious DDoS attacks, and enforce premium API pricing tiers. Because this component sits directly in the critical path of every single request entering your system, it demands flawless concurrency management and microsecond latency.',
      sections: [
        {
          title: 'Step 1: Clarifying Requirements',
          content: 'Functional Requirements:\n- Accurately limit requests based on various criteria (IP address, User API Key, IP + Endpoint).\n- When blocked, immediately return an HTTP 429 (Too Many Requests) response along with headers explaining when the user can try again.\n- Must handle dynamic rule updates without restarting the application.\n\nNon-Functional Requirements:\n- **Ultra-low latency:** The limiter sits at the gateway; adding 50ms to every hit is completely unacceptable.\n- **Micro-Memory footprint:** Must track states for millions of IPs using minimal RAM.\n- **High Availability & Fault Tolerance:** If the Rate Limiter goes completely offline, it must "Fail Open" (meaning it allows all traffic through rather than paralyzing the entire platform).'
        },
        {
          title: 'Step 2: Architecture & Placement',
          content: 'Where should we build the Rate Limiter?\n\n1. **Client-Side:** Easily forged by malicious actors modifying payloads. Unsafe.\n2. **Server-Side Application Middlewares:** Tying rate-limiting logic into your Node/Java application servers makes scaling difficult and duplicates logic across microservices.\n3. **API Gateway (Preferred):** Placed directly on the perimeter firewall (Nginx, Kong, Envoy). Before malicious traffic ever reaches your fragile application nodes, the Gateway stops it at edge. This centralizes metrics, unifies rule sets, and protects your entire subnet.'
        },
        {
          title: 'Step 3: Algorithmic Approaches',
          content: 'Choosing the right mathematical model dictates your memory usage.\n\n**1. Token Bucket Algorithm:**\nImagine a literal bucket containing N tokens. A background thread drops X new tokens into the bucket every second. Every HTTP request requires grabbing 1 token from the bucket. If the bucket is empty, the request is dropped with a 429.\n- **Pros:** Conceptually simple. Exceptional at allowing brief "Bursts" of traffic, after which it throttles smoothly.\n\n**2. Leaking Bucket Algorithm:**\nRequests are dumped into a large queue (the bucket). A background worker processes requests out of the queue at a totally rigid, constant rate. If the queue overflows, new requests drop out the side.\n- **Pros:** Perfect for protecting fragile legacy databases by smoothing jagged bursts into a perfectly flat temporal output.\n\n**3. Fixed Window Counter:**\nDivides time into rigid boxes (e.g., [10:00 - 10:01]). Maintains a hash map counter. Resets at 10:01.\n- **Flaw:** The Edge-Spike problem. If the limit is 100/min, a user can fire 100 requests at 10:00:59, and 100 more at 10:01:01. They pushed 200 requests in 2 seconds while technically staying under the rules.'
        },
        {
          title: 'Step 4: The Superior Algorithm (Sliding Window Log & Counter)',
          content: '**Sliding Window Log:**\nTo perfectly guard against Edge-Spikes, you log the exact millisecond timestamp of every single request a user makes inside Redis (using Sorted Sets). When a new request arrives, you wipe all timestamps older than 60 seconds, and count what\'s left.\n- **Drawback:** Shockingly high memory consumption. Logging millions of timestamps per minute destroys Redis RAM.\n\n**Sliding Window Counter (The Hybrid Champion):**\nTracks a counter for the *previous* minute, and a counter for the *current* minute. Instead of counting individual timestamps, it calculates a weighted algorithmic average based on exactly how far into the current minute you are.\n- Example: If you are 30% into the current minute, your total requests = `Current_Minute_Count + (Previous_Minute_Count * 0.70)`.\n- **Pros:** Hugely memory efficient, resolves the edge-spike problem, and is industry standard.'
        },
        {
          title: 'Step 5: Distributed Scaling with Redis',
          content: 'In distributed architectures, you cannot store rate-limit counters in local RAM. If you have 5 web servers behind a load balancer, User A could hit Server-1 100 times, Server-2 100 times, destroying a 100/min limit limit without triggering a flag.\n\n```mermaid\nflowchart LR\n    User((User)) -->|Requests| LB[Load Balancer]\n    LB --> API1[API Gateway 1]\n    LB --> API2[API Gateway 2]\n    LB --> API3[API Gateway 3]\n    API1 <-->|Check/Update| Redis[(Redis Cluster)]\n    API2 <-->|Check/Update| Redis\n    API3 <-->|Check/Update| Redis\n```\n\n**Centralized Redis Store:**\nAll gateway servers must update a centralized, ultra-fast Redis cluster. Redis uses purely in-memory data structures. We construct keys mathematically: `user:apikey123:minute:1620393020`.\n\n**The Race Condition Multi-Threading Problem:**\nIf User A initiates 10 concurrent requests at exactly the same microsecond.\n- All 10 node threads query Redis.\n- All 10 read the current count as "99".\n- All 10 increment to "100" and allow the request through.\n- Result: 109 requests approved.'
        },
        {
          title: 'Step 6: Resolving Race Conditions',
          content: 'To fix the multi-threading race condition:\n\n**1. Distributed Locks (Redlock):** Implement Mutex locks around the counter logic. Terrible for performance. Do not do this.\n\n**2. Redis Lua Scripting:** Redis natively supports executing Lua scripts. Redis runs entirely single-threaded internally. If you wrap the "Read, Check Limit, Increment, Write" inside a Lua script payload, Redis processes the entire script as one unbreakable atomic transaction. It guarantees zero race conditions while executing in sub-milliseconds.'
        },
        {
          title: 'Step 7: Extreme Scale and Eventual Consistency',
          content: 'A massive global service (like Stripe or Cloudflare) handling millions of requests per second cannot afford the latency of querying a centralized Redis architecture across regions.\n\n**Eventual Consistency Rate Limiting:**\n- Nodes maintain a localized memory cache (handling traffic independently).\n- They asynchronously relay their local metrics (gossip protocol) to centralized aggregators every second.\n- The rules are not strictly enforced to the exact millisecond. If the limit is 10,000 requests/sec, the system might allow 10,500 due to drift, but performance reaches tens of millions of IOPS without bottlenecking.'
        }
      ]
    }
  },
  {
    id: 'image-sharing',
    title: 'Image Sharing Service',
    icon: Camera,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    desc: 'Design a service like Instagram for uploading, viewing, and organizing photos.',
    points: ['Object Storage (S3)', 'CDN', 'Database Design', 'News Feed Generation'],
    related: ['news-feed'],
    content: {
      overview: 'Designing an image sharing app like Instagram or Pinterest requires managing a colossal volume of rich media files, orchestrating asynchronous heavily-computational image processing, ensuring highly available global reads via CDNs, and maintaining deeply relational metadata (followers, tags, and comments).',
      sections: [
        {
          title: 'Step 1: Clarifying Requirements',
          content: 'Functional Requirements:\n- Users can upload rich media (Photos). No videos for this iteration.\n- Users can view photos on their home feed, consisting of chronological posts from accounts they follow.\n- Users can like, comment, and read metadata.\n\nNon-Functional Requirements:\n- High availability for reading/viewing photos is paramount. Scrolling should never buffer.\n- Consistency is secondary. If a photo takes 3 seconds to appear on an obscure friend\'s profile, that\'s acceptable.\n- The system must seamlessly scale to exabytes of data without requiring major architectural rewrites.'
        },
        {
          title: 'Step 2: Dual-Storage Architecture (Metadata vs BLOB)',
          content: 'A critical system design law: NEVER store binary image files (BLOBs) directly inside relational database columns. It utterly destroys sequential disk performance, shatters RAM caches, and makes horizontal scaling financially insane.\n\n**1. Raw File Storage (Object Storage):**\nStore the actual bytes of the image inside an Object Storage bucket (Amazon S3 / Google Cloud Storage / Azure Blob). S3 is limitlessly scalable, heavily redundant, and handles file streaming flawlessly.\n\n**2. Metadata Storage (The Database):**\nStore only the structural dimensions, file pointers, and relational data in a Database.\n- Table: `Photos` -> [PhotoID (PK), UserID (FK), S3_URL, CreationDate, Latitude, Longitude, Caption].\n- Because features like "Find what users liked this photo" require structured joins, a Relational DB (PostgreSQL / MySQL) is standard.'
        },
        {
          title: 'Step 3: The Upload and Processing Pipeline',
          content: 'Photos uploaded from a modern iPhone are 12+ Megabytes. Serving a 12MB file to a user scrolling a feed containing 50 photos will obliterate their mobile data plan and result in 30-second load times.\n\n```mermaid\nflowchart TD\n    Mobile((Client)) -->|1. Upload Raw Image| API[API Gateway]\n    API -->|2. Save Raw| S3_Ingest[(S3 Ingest Bucket)]\n    API -->|3. Publish Task| Kafka[[Kafka Queue]]\n    Kafka -->|4. Consume Task| Worker[Image Processor Worker]\n    Worker -->|Fetch Raw| S3_Ingest\n    Worker -->|5a. Save Optimized| S3_Public[(S3 Public Bucket)]\n    Worker -->|5b. Insert Row| DB[(Metadata DB)]\n```\n\n**Asynchronous Pipeline:**\n1. Client uploads raw photo to the API Gateway.\n2. API Gateway saves the Raw Image to a hidden S3 "Ingestion Bucket".\n3. API drops a task payload into an Asynchronous Message Queue (Kafka / RabbitMQ) and immediately returns HTTP 202 Accepted to the user.\n4. Background Worker fleets constantly consume from the Queue. They grab the raw photo, strip EXIF GPS data (privacy), apply aesthetic filters, and crucially, down-sample the image into multiple resolutions (e.g., `thumbnail_250x250`, `web_1080p`, `mobile_720p`).\n5. Workers save optimized files to the public S3 bucket and formally INSERT the row into the Metadata Database.'
        },
        {
          title: 'Step 4: Global Image Delivery (CDN)',
          content: 'Object storage (S3) physically resides in giant warehouses located in specific regions (e.g., us-east-1 in Virginia). If a user in Tokyo attempts to load a feed of 20 photos, packet physics dictates it will take enormous milliseconds to traverse the Pacific Ocean 20 times.\n\n**Content Delivery Networks (CDNs):**\n- A CDN (Cloudflare, Akamai, CloudFront) is layered over the public S3 bucket.\n- CDNs possess "Edge Servers" stationed physically within virtually every country.\n- When a Tokyo user requests `image5.jpg`, the Tokyo Edge Server intercepts it. If it doesn\'t have it (Cache Miss), it fetches it from Virginia. The *next* time anyone in Tokyo asks for that image, the Edge Server responds directly from its local RAM (Cache Hit) in <10 milliseconds.'
        },
        {
          title: 'Step 5: News Feed Pre-computation',
          content: 'If an active user follows 1,000 accounts, running a dynamic SQL query like `SELECT * FROM Photos WHERE UserID IN (SELECT FollowID FROM Follows) ORDER BY Timestamp DESC` requires monstrous indexed joins. The DB will crash at millions of RPS.\n\n**The Fan-out Architecture:**\n- Feeds are pre-computed using Redis.\n- When you post a photo, a backend worker pushes the new PhotoID asynchronously onto the bespoke Redis List of every single follower (Fan-Out on Write).\n- When someone opens the app, the API server simply does a lightning-fast `LRANGE user:145:feed 0 20` from Redis, retrieving the pre-compiled feed timeline instantly.'
        },
        {
          title: 'Step 6: High Availability and Database Sharding',
          content: 'Storage limits on a main master database node will eventually be breached.\n\n**Database Sharding:**\nWe must split (shard) the database tables across thousands of smaller servers.\n- **Shard by UserID:** All photos generated by User A sit on Shard 4. Pro: Very easy to query a user\'s entire history. Con: The "Kardashian Bug". If a global celebrity goes viral, Shard 4 becomes a molten hotspot of read/write stress, bringing down that node and causing partial outages.\n- **Shard by PhotoID:** The ID generator creates purely random/hashed IDs, spreading posts perfectly evenly across all shards. Prevents hot spots entirely. Con: Slower relational tracking without massive secondary indices.\n\n**Read Replicas:** The architecture is deeply read-heavy. All database master nodes should have a cluster of 5+ Read-Only replicas executing parallel reads.'
        },
        {
          title: 'Step 7: Telemetry & Monitoring',
          content: 'When system degradation happens, the engineers must see it before the users complain.\n- Implement Distributed Tracing (Jaeger / DataDog) attaching unique Request IDs to uploads, allowing engineers to visualize exactly which microservice caused a bottleneck during the image processing event.'
        }
      ]
    }
  },
  {
    id: 'news-feed',
    title: 'News Feed System',
    icon: Rss,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    desc: 'Design a highly tuned news feed for millions of users like Twitter or Facebook.',
    points: ['Fanout on Write', 'Fanout on Read', 'Ranking Algorithms', 'Graph Databases'],
    related: ['image-sharing', 'notification-system'],
    content: {
      overview: 'The News Feed stands as the engineering centerpiece of every major social networking application. It aggregates statuses, multimedia, and activities from accounts a user follows, merging them into a continuously updating timeline. The extreme architectural challenge is computing personalized timelines for hundreds of millions of concurrent users in under 200 milliseconds, whilst handling the statistical anomalies of global celebrities.',
      sections: [
        {
          title: 'Step 1: Clarifying Requirements',
          content: 'Functional Requirements:\n- Users can publish posts containing text and media.\n- Users can view a feed sorted either chronologically or via ranking (algorithmic).\n- Feeds are generated purely from users they follow (Follower-graph).\n\nNon-Functional Requirements:\n- Read latency of the timeline feed must happen in < 200ms.\n- System must degrade gracefully.\n- Handle the "Celebrity Problem" without crippling database infrastructure.'
        },
        {
          title: 'Step 2: The Fallacy of Relational Feeds',
          content: 'A junior engineer builds a feed dynamically on a read request.\n- The SQL involves querying the Follow table for a user\'s 850 friends, performing an indexed JOIN against the massive Posts table filtering for those 850 authors, ORDERING by Timestamp DESC limit 50.\n- At 100 million active users running this query repeatedly on refresh, this multi-table high-volume scan requires absurd computational overhead. The database will melt. We must pre-compute.'
        },
        {
          title: 'Step 3: Fanout on Write (The Push Model)',
          content: 'To achieve <200ms reads, the feed must exist identically in memory before the user even logs in.\n- When User A (100 followers) publishes a post, the API server saves the post, then kicks off a Background Job.\n- The worker queries User A\'s follower list, and pushes (fans out) the new PostID into 100 different Redis Lists, each representing a follower\'s personalized timeline cache.\n- **Pros:** When a follower logs in, the API fetches their pre-computed Redis list in O(1) time. Read latency is basically zero.\n- **Cons:** High write amplification. Every post triggers N database modifications, strictly proportional to follower count.'
        },
        {
          title: 'Step 4: Fanout on Read (The Pull Model)',
          content: 'Used sparsely or as a hybrid fallback.\n- When User A publishes a post, it simply saves the post to their profile. No pushing occurs.\n- When User B logs in, the backend dynamically queries the profiles of all people User B follows, pulling recent items and merging them in RAM on the fly.\n- **Pros:** Beautifully minimal write operations. Extremely efficient storage.\n- **Cons:** Tragic read latency, wildly unpredictable CPU spikes during read bursts.'
        },
        {
          title: 'Step 5: The Celebrity Problem (Hybrid Architecture)',
          content: 'If Cristiano Ronaldo (600 Million followers) posts a photo, Fanout-on-Write would spawn 600 Million Redis write operations instantly, vaporizing the message queues and grinding the system to a halt for hours.\n\n```mermaid\nflowchart TD\n    Load[User loads Feed]\n    Load --> PullRedis[Pull Redis Feed Cache]\n    Load --> PullCelebs[Pull from Celeb DBs directly]\n    PullRedis --> Merge[Merge & Sort in API RAM]\n    PullCelebs --> Merge\n    Merge --> Return[Return Top 20 to User]\n```\n\n**The Hybrid Resolution:**\n- **Standard Users:** Utilize fast Fanout-on-Write to push to caches seamlessly.\n- **Celebrities/Influencers (e.g., > 250k followers):** No fanout is pushed. The post is flagged and simply appended to their standalone database profile.\n- **Feed Rendering:** When an ordinary user loads their feed, the system pulls their pre-computed Redis list, but then also specifically pulls the recent posts of any Celebrities they follow. It merges the celebrity posts into the Redis timeline inside the API server precisely at read time.'
        },
        {
          title: 'Step 6: Smart Feed Ranking (AI)',
          content: 'Strict chronological ordering is dead. Modern feeds rely heavily on ML ranking pipelines situated squarely between the Redis caches and the User.\n- **Feature Store Integration:** The ML model requires massive metadata. Features include User Affinity (how often you like this person\'s posts), Edge Weights (direct family vs distant acquaintances), Post Age (decay factors), and Interaction Ratios.\n- **Ranking Execution:** The API grabs the top 500 post IDs from Redis, sends them to a highly optimized TensorFlow model via RPC. The model scores each post, sorts the payload, and serves the optimized top 20 back to the mobile client payload.'
        },
        {
          title: 'Step 7: Pagination and Memory Caps',
          content: 'Redis RAM is significantly more expensive than disk storage. You cannot retain a user\'s infinite 10-year timeline entirely in memory.\n- **The Cap:** Restrict the Redis Feed list queue length to roughly 1,000 items per user.\n- **Fallback:** If a deeply engaged user manages to scroll infinitely past 1,000 posts, the system recognizes a cache end and switches behavior. It gracefully falls back to querying the slower Relational Database chunks. This protects the RAM budgets without functionally breaking the user experience.\n- **Cursors:** Mobile apps must utilize Cursor-based Pagination (tracking the last ID observed) rather than Offset-based (LIMIT, OFFSET) which becomes staggeringly slow on gigantic databases.'
        }
      ]
    }
  },
  {
    id: 'key-value-store',
    title: 'Key-Value Store',
    icon: Database,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    desc: 'Design a distributed and highly available key-value store like DynamoDB or Redis.',
    points: ['Consistent Hashing', 'Gossip Protocol', 'Vector Clocks', 'SSTables'],
    related: ['rate-limiter', 'url-shortener'],
    content: {
      overview: 'Designing a distributed key-value store represents the pinnacle of distributed systems engineering. It requires mastery over complex challenges regarding data replication, managing sudden catastrophic node failures, conflict resolution algorithms, and intimately understanding the CAP theorem tradeoffs. We are conceptually designing Amazon DynamoDB.',
      sections: [
        {
          title: 'Step 1: Clarifying Requirements',
          content: 'Functional Requirements:\n- Implement lightning-fast `put(key, value)` and `get(key)` operations.\n- Value could be a tiny string or a large binary object.\n\nNon-Functional Requirements:\n- **High Availability (No downtime):** The system must accept writes and reads seamlessly even if multiple backend servers are physically destroyed.\n- **Highly Scalable:** We must be able to add thousands of nodes seamlessly without causing prolonged re-balancing downtime.\n- **Configurable Consistency:** Clients should be able to dictate strict consistency or eventual consistency based on their situational needs.'
        },
        {
          title: 'Step 2: Data Partitioning (Consistent Hashing)',
          content: 'To handle Petabytes of data, no single disk will survive. We must horizontally shard the KV pairs across a fleet of thousands of nodes.\n\n**The Naive Approach `hash(key) % N`:**\nIf we modulo hash to assign data to 10 nodes, and Node 10 crashes (N=9), 90% of all keys suddenly mathematically resolve to entirely new node destinations. The entire system is flooded with cache misses and massive data migrations instantly paralyze the cluster.\n\n**The Superior Solution: Consistent Hashing:**\nImagine a massive logical circle (a Ring) containing indices from 0 to 2^128 - 1. We hash our Servers and place them permanently on the ring. When we want to store a Key, we hash the Key -> place it on the ring -> and walk clockwise indefinitely until we hit the first Server. \n- If that Server is deleted, only the immediate Keys mapped directly behind it must migrate to the very next server. 99% of the cluster remains entirely unaffected.'
        },
        {
          title: 'Step 3: Data Replication',
          content: 'When you store critical data, it must survive hardware decay. Nodes will eventually fail.\n\n- The system must replicate all data to N independent nodes (e.g., N=3).\n- When a Key resolves clockwise to Node 15 on the Consistent Hashing ring, the system seamlessly replicates that exact data to the next two succeeding nodes clockwise on the ring (Node 32 and Node 60).\n- If Node 15 burns in a fire, requests are instantly routed to Node 32.'
        },
        {
          title: 'Step 4: The CAP Theorem Architectures',
          content: 'At extreme distributed scale, network outages (Partitions) are fundamentally inevitable. The CAP Theorem forces a brutal decision:\n\n- **CP Systems (Consistency over Availability):** If a network degrades, the nodes refuse to accept new writes because they cannot guarantee all replicas match. Operations are rejected. (Crucial for banking transactions).\n- **AP Systems (Availability over Consistency):** If a network degrades, the nodes accept every write they possibly can, aggressively choosing Availability. They might temporarily disagree. (Crucial for a shopping cart, where dropping a transaction means losing revenue). We will build an AP system like Dynamo.\n- In AP systems, conflicting writes are solved *after* the partition heals.'
        },
        {
          title: 'Step 5: Conflict Resolution (Vector Clocks)',
          content: 'Consider an AP system that suffers a network split. User A updates a cart to "Node 1". User B updates the identical cart to "Node 2". Both nodes assume they have the correct data. When they reunite, how do we fix it?\n\n- Standard timestamps are flawed due to clock drift (servers clock times diverge slightly).\n- **Vector Clocks:** A logical clock mapping the server and an incremented version number. E.g., `[NodeA: v1, NodeB: v1]`.\n- Whenever a node mutates a document, it increments its internal version list.\n- When a client reads a key, the system notices a divergence in Vector Clocks, and instead of failing, it returns **all conflicting versions** simultaneously. The Client application natively merges the differing states, resolves the conflict gracefully, and writes the absolute final unified state back to the DB.'
        },
        {
          title: 'Step 6: Gossip Protocol for Error Detection',
          content: 'How does a cluster of 5,000 servers know if Server 455 suffers a kernel panic?\n- Placing a giant centralized "Health Check" master-server creates a singular point of failure.\n- Instead, implement the **Gossip Protocol**.\n- Every single second, Node A picks 3 random nodes and exchanges a list of who it believes is alive/dead. All other nodes do the same. This epidemic-style information spread guarantees that within mere seconds, the entire 5000-node cluster reaches absolute decentralized consensus that Server 455 is offline, triggering auto-healing mechanisms.'
        },
        {
          title: 'Step 7: Hinted Handoff',
          content: 'If a node is only down for 5 minutes (a temporary blip), running a massive data rebalancing replication across the cluster is wasteful and expensive.\n- **Hinted Handoff:** Node B (the designated destination) goes offline. Node C accepts the incoming write locally, but encapsulates it in a secure wrapper labeled: "HINT: Deliver to Node B eventually".\n- Node C actively monitors the Gossip Protocol. The moment Node B announces it has rebooted and is healthy, Node C unleashes the deferred writes directly to Node B, allowing the ecosystem to repair itself gracefully behind the scenes.'
        }
      ]
    }
  },
  {
    id: 'video-streaming',
    title: 'Video Streaming',
    icon: Video,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    desc: 'Design a high-bandwidth video streaming service like Netflix or YouTube.',
    points: ['Video Transcoding', 'DASH / HLS', 'Blob Storage', 'Edge Caching'],
    related: ['image-sharing'],
    content: {
      overview: 'Building a planetary-scale video streaming architecture like YouTube or Netflix demands mastering heavy asynchronous data ingestion, CPU-annihilating parallel video transcoding procedures, and architecting massive egress networks capable of pushing terabytes of high-definition bytes per second to millions of devices across varying, unreliable networks seamlessly.',
      sections: [
        {
          title: 'Step 1: Clarifying Requirements',
          content: 'Functional Requirements:\n- Users can upload massive video artifacts in various wrappers (MP4, AVI, MKV).\n- Users can view videos efficiently across smart TVs, mobile phones, and web browsers.\n- Granular search functionalities.\n- Highly accurate telemetry to document pause timestamps and views.\n\nNon-Functional Requirements:\n- Buffering is the enemy. The streaming must adapt fluidly to the user\'s volatile internet speed.\n- The platform must achieve absolute High Availability.\n- Scale to billions of daily view events globally.'
        },
        {
          title: 'Step 2: Upload and Video Truncation',
          content: 'You cannot stream an unprocessed 60-gigabyte 8K movie upload directly via HTTP.\n\n1. The user securely uploads the raw video payload via multi-part upload to an isolated Amazon S3 Bucket.\n2. This completion heavily triggers a massive Backend Orchestration Pipeline via RabbitMQ or Kafka.\n3. **Splitting:** The first worker parses the massive video block and slices it chronologically into hundreds of tiny, predictable 5-second media segments.'
        },
        {
          title: 'Step 3: Parallel Transcoding Pipeline',
          content: 'Those hundreds of 5-second raw slices are distributed across thousands of massive compute-optimized CPU instances simultaneously.\n- **FFmpeg Processing:** The nodes strip out specific audio lines and transcode the raw visuals concurrently into dozens of specific bitrates and resolutions: 1080p, 720p, 480p, and specific mobile encodings.\n- **DAG Orchestration:** Directed Acyclic Graphs (like Apache Airflow) execute these dependencies rigidly. If one 5-second chunk fails to render due to a memory error, the DAG retries exactly that chunk instantly without restarting the 3-hour movie render.'
        },
        {
          title: 'Step 4: Adaptive Bitrate Streaming (ABS)',
          content: 'How does YouTube prevent buffering when you drive into a tunnel?\n- When watching a video, the device player actively calculates the localized internet bandwidth strength every few seconds.\n- If the device detects a massive signal drop, the player purposefully requests the next upcoming 5-second video chunks via the **480p** resolution bucket. The video becomes temporarily pixelated but crucially never freezes.\n- When you exit the tunnel, the player detects high bandwidth and requests the **1080p** chunk.\n- The protocols that govern this chunking manifest map are Apple HLS (HTTP Live Streaming) and MPEG-DASH. They operate smoothly over standard port 80/443 without firewall interference.'
        },
        {
          title: 'Step 5: Global Content Delivery via Edge',
          content: 'Serving long videos strictly from central datacenters will cause catastrophic regional lag.\n- Streaming platforms utilize powerful global CDNs or design custom hardware networks (like Netflix\'s Open Connect).\n- These appliances are racks of hundreds of solid-state SSDs delivered physically to the local telecom offices of internet providers (e.g., Comcast, AT&T).\n- **Cache Strategy:** Niche, obscure videos are held in the master archive. Extremely popular viral hit shows are programmatically pushed into localized ISP hardware arrays overnight. The request physics mean users load movies directly from their own city\'s ISP racks.'
        },
        {
          title: 'Step 6: Metadata and Search Architectures',
          content: 'While video bytes sit on S3 and CDNs, the transactional metadata (Titles, Comments, Likes, Descriptions, Privacy Settings) resides in clustered high-performance Databases.\n- Commonly, sharded PostgreSQL or wide-column Cassandra clusters.\n- For robust textual query matching (e.g., searching "funny dog fails"), typing queries into SQL is entirely unscalable. A highly tuned Elasticsearch cluster ingests all titles and tags to return inverted index queries in under 5 milliseconds.'
        },
        {
          title: 'Step 7: Resilience Against Outages',
          content: 'A viral livestream event can cripple metadata clusters.\n- Insert aggressively robust Cache layers (Memcached/Redis) layered in front of the PostgreSQL arrays.\n- When users spam refresh on a highly trafficked video, almost all read hits bounce painlessly off the cache. Rate limiters drop intentional DDOS floods, ensuring the core transactional databases remain isolated and healthy.'
        }
      ]
    }
  },
  {
    id: 'ride-sharing',
    title: 'Ride-Sharing Service',
    icon: Car,
    color: 'text-slate-200',
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/20',
    desc: 'Design a geospatial matching service like Uber or Lyft.',
    points: ['Geospatial Indexing', 'Quadtrees / H3', 'Sockets', 'Distributed Tracing'],
    related: ['chat-application'],
    content: {
      overview: 'Designing an ecosystem akin to Uber or Lyft presents profound geospatial engineering puzzles. The architecture revolves around maintaining the active states of millions of moving entities globally, constantly ingesting location telemetry, executing massive routing graphs, and dynamically altering economic algorithms in real-time.',
      sections: [
        {
          title: 'Step 1: Clarifying Requirements',
          content: 'Functional Requirements:\n- Drivers constantly transmit their live GPS whereabouts.\n- Riders specify endpoints, instantly generating routes and ETAs.\n- The system must mathematically match riders with the optimal drivers.\n\nNon-Functional Requirements:\n- Real-time precision required. Milliseconds matter when cars are moving at highway speeds.\n- Massive write capacity (millions of concurrent vehicle location pings updating every 3 seconds).\n- Zero downtime logic during dynamic region deployments.'
        },
        {
          title: 'Step 2: The Firehose (High Volume Ingestion)',
          content: 'Updating a row in a standard SQL tabular database 2 million times a minute will lock tables, destroy indices, and collapse.\n- **Architecture Separation:** Location pings are treated as disposable events. Drivers push GPS data continuously via persistent WebSockets over to edge servers.\n- The Edge API Gateway immediately drops these lightweight pings directly into a massive event stream (Apache Kafka).\n- Processing clusters hook onto Kafka, updating in-memory driver-state caches independently of historical ride analytics.'
        },
        {
          title: 'Step 3: Geospatial Indexing (H3 & QuadTrees)',
          content: 'You cannot calculate proximity by mathematically calculating the radius distance between a Rider against 1,000,000 active drivers using raw geometry functions. It is hopelessly inefficient.\n- **The Grid Resolution:** We logically divide the global map into tiny zones (Uber open-sourced "H3", an intricate hexagonal grid system).\n- Every single geographic coordinate converts cleanly into a localized Hexagon ID (integer).\n- When a driver moves into a new area, the backend simply runs `ADD driver:A to HASH:Hexagon:12` in Redis.\n- When a rider asks for a car, the Dispatch engine identifies their current Hexagon ID and merely pulls the localized array cache containing 10 nearby drivers simultaneously in O(1) time.'
        },
        {
          title: 'Step 4: The Dispatch Optimization Engine',
          content: 'Matching is complex.\n1. Rider inputs destination. The routing engine establishes distances.\n2. Dispatch loads nearby candidates via H3 zones.\n3. Dispatch queries the ETA engine (taking into account live traffic maps) to filter out drivers blocked by jams.\n4. An ML Model scores the remaining candidates based on utilization metrics.\n5. The system initiates an offer via websockets to the peak matched driver. If ignored for 10 seconds, it iteratively cascades to the secondary match.'
        },
        {
          title: 'Step 5: Scaling Geospatial Architecture',
          content: 'To prevent global latency, geospatial indices are fiercely partitioned. Server nodes tracking Tokyo are structurally disconnected from servers tracking New York.\n- Uber leverages intense sharding mechanisms using heavily networked Node.js instances talking via gossip protocols (Ringpop) to maintain stateful driver proximity memory clusters locally without constant database trips.'
        },
        {
          title: 'Step 6: Dynamic Pricing (Surge)',
          content: 'Pricing is deeply reliant on supply matrices vs demand. \n- Another fleet of workers reads strictly from the Kafka streams, constantly analyzing the ratio of app-opens against active non-occupied drivers per Hexagon.\n- If algorithms detect extreme mathematical drift during a localized sporting event, it outputs a pricing multiplier matrix pushed live into caching systems.'
        },
        {
          title: 'Step 7: Long-Term Analytics & Tracing',
          content: 'While transient matches happen in memory, those billions of GPS sequences are massively important. They are continuously swept asynchronously from Kafka into giant AWS S3 or Hadoop Data Lakes.\n- Data Science teams utilize Hadoop to refine AI traffic models and evaluate route efficiencies.\n- Distributed tracing (like Jaeger) ensures that if a rider requests a match and the system hangs for 2 seconds, engineers can surgically trace exactly which microservice caused the CPU blockage.'
        }
      ]
    }
  },
  {
    id: 'web-crawler',
    title: 'Web Crawler',
    icon: Bug,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    desc: 'Design a distributed web crawler like Googlebot to index the internet.',
    points: ['URL Frontier', 'DNS Resolution', 'Bloom Filters', 'Politeness'],
    related: ['key-value-store'],
    content: {
      overview: 'Building a distributed web crawler—the engine behind Google, Bing, and major archival systems—is an excursion into staggering, unpredictable scale. It involves initiating billions of network connections, parsing petabytes of adversarial, unstructured HTML, aggressively avoiding crawling traps, and enforcing strict ethical network etiquette to avoid obliterating fragile websites.',
      sections: [
        {
          title: 'Step 1: Clarifying Requirements',
          content: 'Functional Requirements:\n- Consume a collection of seed URLs and indefinitely traverse outgoing hypertext links.\n- Download the HTML payloads, extract textual context, and export to search indexers.\n- Refresh stale websites continuously.\n\nNon-Functional Requirements:\n- **Scale & Speed:** Process billions of distinct domains efficiently.\n- **Politeness:** Crawlers must never accidentally DDOS a target webserver.\n- **Robustness:** The architecture must effortlessly survive malicious "spider traps" composed by hostile site admins.'
        },
        {
          title: 'Step 2: The URL Frontier (The Brain)',
          content: 'You cannot manage 10 Billion discovered URLs via naive arrays. The massive prioritizing message queue holds URLs awaiting processing.\n- **Prioritization:** The Frontier applies algorithmic scores. High-value news domains updating hourly move to high-priority queues. Obscure abandoned blogs sit in low-priority cycles.\n- **Parallelization:** The Frontier securely manages partitions, fanning out tasks via Kafka queues to a sprawling farm of thousands of headless worker instances.'
        },
        {
          title: 'Step 3: Extreme Network Optimization (DNS)',
          content: 'Before resolving a GET request, a worker must turn a domain into an IP address. DNS lookup requires UDP network trips.\n- Resolving millions of domains externally creates colossal bottlenecks; you will eventually get IP banned by external DNS authorities.\n- **Custom Infrastructure:** A mega-crawler maintains massive localized, hierarchical DNS resolving clusters internally. Worker threads employ non-blocking asynchronous IO to aggressively initiate tens of thousands of simultaneous HTTP connections per machine without waiting sequentially.'
        },
        {
          title: 'Step 4: Deduplication via Bloom Filters',
          content: 'The internet is littered with circular references and URL mirrors. If your crawler explores `example.com/a` and it links to `example.com/b`, which links back to `a`, you trigger infinite loops indefinitely.\n- You must consult a registry of "Have I seen this URL?"\n- Checking an indexed SQL database containing 50 Billion rows for every single link is absurdly slow.\n- **The Bloom Filter:** A genius, highly optimized probabilistic bitwise data structure. It instantly fits in memory. You feed it a URL, and it mathematically guarantees "I have DEFINITELY NOT seen this" or "I PROBABLY have seen this". It drastically decreases database hits entirely trading minimal false positives for explosive performance speed.'
        },
        {
          title: 'Step 5: Content Parsing & Spider Traps',
          content: 'HTML extraction is executed. Raw HTML is transformed into the structural DOM.\n- **Traps:** Adversarial sites dynamically generate infinite directory matrices (e.g. `/a/b/c/d/e...`) precisely to trap bots.\n- **Safety Mechanisms:** Enforce maximum URL depth depth restraints (shut off parsing past 15 directories). Cap download file sizes, preventing the downloading of infinite stream binary files masking as HTML.'
        },
        {
          title: 'Step 6: Politeness Guarantees',
          content: 'Pinging an obscure regional website 1,000 times a second will physically crash their server hardware.\n- **Robots.txt Engine:** Crawler strictly downloads and heavily caches the `robots.txt` file. It mathematically complies with all path restrictions.\n- **Hostname Delay Queues:** The Frontier ensures that worker nodes absolutely enforce a minimum mandated time delay (e.g., waiting 5,000 ms) before initiating sequential connections connecting back to the identical apex domain.'
        },
        {
          title: 'Step 7: Storage Architecture',
          content: 'Extracted strings and media paths are exported.\n- Because HTML payloads are huge and sequentially written without updates, the system streams them down into robust analytical Object Datastores like Hadoop HDFS, AWS S3, or wide-column rows in Cassandra/BigTable.\n- The decoupled Search Indexing infrastructure independently pulls from these datastores later to implement tf-idf rankings.'
        }
      ]
    }
  },
  {
    id: 'notification-system',
    title: 'Notification System',
    icon: Bell,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    desc: 'Design a scalable platform to send push, SMS, and email notifications.',
    points: ['Message Queues', 'Third-party Integration', 'Rate Limiting', 'Idempotency'],
    related: ['chat-application', 'news-feed'],
    content: {
      overview: 'A robust notification platform operates as the central communications nervous system. Situated behind major microservices architectures seamlessly routing real-time Push Notifications, high-deliverability Emails, and SMS texts via diverse array of third-party API gateways, while managing preferences, guarding against duplicate messaging, and ensuring fault-tolerance.',
      sections: [
        {
          title: 'Step 1: Clarifying Requirements',
          content: 'Functional Requirements:\n- Internal microservices call one localized API to dispatch an arbitrary event (e.g., "InvoicePaid").\n- Platform references the user, honors local channel preferences, wraps custom messaging templates, and routes down via SMS, Push, or Email.\n- Track delivery rates and interactions.\n\nNon-Functional Requirements:\n- Completely decouple execution from the original caller service.\n- Extreme fault tolerance against inevitably unreliable third-party endpoints.\n- Mathematical certainty against double-sending messages.'
        },
        {
          title: 'Step 2: Decoupled Message Ingestion',
          content: 'If the Checkout Service calls the Notification Service directly, and the Notification Service makes a synchronous HTTP request to Twilio (which happens to be currently offline), the whole Checkout thread lags, cascades, and threatens the core service.\n- **Kafka/RabbitMQ Buffer:** The Notification API accepts payloads and instantly drops them into a Message Queue, returning HTTP 202 to the microservice rapidly.\n- Background workers aggressively chew down the queue. The Notification platform maintains deep autonomy without dragging down upstream logic structures.'
        },
        {
          title: 'Step 3: User Profiles & Device Registrations',
          content: 'Before launching payloads, workers retrieve context.\n- Queries the localized Notification Preference Database to verify exact user settings (e.g., Did the user mute push notifications for promotional events but keep transactional active?).\n- Retrieves necessary destination tokens. Device Tokens mandated by Apple (APNs) and Google (FCM) are stored inside highly resilient SQL databases tied uniquely to the persistent UserID keys.'
        },
        {
          title: 'Step 4: Handling Hostile or Unreliable APIs',
          content: 'Gateway operators like SendGrid and Twilio possess strict IP rate limits and routinely suffer chaotic transient disconnects.\n- **Throttling Integration:** The outbound clusters utilize localized Rate Limiters managing connection output speeds against documented third-party ceilings.\n- **The Retry Queue Architecture:** If a worker fires an SMS POST and obtains an HTTP 500 error from Twilio, the process cannot fail. The event is intentionally shoved into a dedicated Retry Queue.\n- An exponential backoff algorithmic system manages the Retry Queue, delaying execution by mathematically increasing metrics (Wait 30s -> Wait 2m -> Wait 10m). Preventing massive swarming attacks on broken API nodes.'
        },
        {
          title: 'Step 5: Deduplication Pipeline (Idempotency)',
          content: 'Distributed message queues fundamentally default to "At-least-once delivery." This means a worker could grab the email message, initiate SendGrid successfully, but unexpectedly seg-fault before formally submitting the Acknowledgment bit back to Kafka. The queue issues the exact same data to Worker B.\n- **Idempotency Keys:** Every incoming event demands an absolute unique cryptographic Hash ID.\n- Before execution, a worker hits an ultra-rapid Redis cluster containing expiring flags. `SETNX hash:sent = true` \n- If it fails, that means the system successfully dispatched it previously. The redundant worker ruthlessly drops the message immediately. Zero double emails.'
        },
        {
          title: 'Step 6: Templating Renders',
          content: 'Storing massive chunks of formatted raw HTML directly within rigid backend Go/Java components is incredibly hostile to scaling and marketing teams.\n- Notification event payloads merely contain structured primitive variables (e.g., `[Username: Adam, Cost: $15]`).\n- Before dispatch, systems query an administrative Content-Management Database or S3 container hauling the visual wrapper blueprint. An internalized template renderer injects the isolated variables seamlessly into the raw payload precisely before final outbound delivery.'
        },
        {
          title: 'Step 7: Real-Time Analytics Pipeline',
          content: 'Corporate stakeholders dictate tracking open-rates, bounced deliveries, and engagement.\n- Notifications inject 1 pixel transparent tracking image URLs with hashed identifiers.\n- Major external services accept Webhook callbacks. When Apple confirms the delivery of the push parameter, they bounce a verified POST signature back to the core Analytics ingestion API endpoints, concluding the delivery state loop.'
        }
      ]
    }
  }
];
