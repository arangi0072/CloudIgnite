import { 
  Scale, Database, Zap, Network, Layers, GitBranch, Globe, Shield, TerminalSquare,
  type LucideIcon
} from 'lucide-react';

export interface ConceptDef {
  id: string;
  title: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
  desc: string;
  points: string[];
  related: string[];
  content?: {
    overview: string;
    sections: { title: string; content: string }[];
  }
}

export const CONCEPTS: ConceptDef[] = [
  {
    id: 'load-balancing',
    title: 'Load Balancing',
    icon: Scale,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    desc: 'Distributing traffic across multiple servers to ensure high availability and responsiveness.',
    points: ['Layer 4 vs Layer 7', 'Round Robin', 'Least Connections', 'Sticky Sessions'],
    related: ['microservices', 'caching'],
    content: {
      overview: 'A load balancer acts as the "traffic cop" sitting in front of your servers and routing client requests across all servers capable of fulfilling those requests in a manner that maximizes speed and capacity utilization and ensures that no one server is overworked, which could degrade performance. If a single server goes down, the load balancer redirects traffic to the remaining online servers. When a new server is added to the server group, the load balancer automatically starts to send requests to it.',
      sections: [
        {
          title: 'Layer 4 Load Balancing',
          content: 'Layer 4 (Transport Layer) load balancing acts upon data found in network and transport layer protocols (IP, TCP, FTP, UDP). It makes routing decisions based on the source and destination IP addresses and ports recorded in the packet header, without inspecting the actual contents of the packet. It is extremely fast because it does not perform data inspection, but it lacks the contextual awareness to make smart routing decisions.'
        },
        {
          title: 'Layer 7 Load Balancing',
          content: 'Layer 7 (Application Layer) load balancing distributes requests based upon data found in application layer protocols such as HTTP. This allows for smarter routing decisions based on URL, headers, cookies, or the specific data within the message. For example, requests for images can be routed to image servers, while API requests can be routed to backend application servers.\n\n```mermaid\nflowchart TD\n    Client((Client)) -->|GET /api/users| LB{Layer 7 LB}\n    Client -->|GET /images/logo.png| LB\n    LB -->|/api/*| API1[API Server 1]\n    LB -->|/api/*| API2[API Server 2]\n    LB -->|/images/*| IMG1[Image Server 1]\n    LB -->|/images/*| IMG2[Image Server 2]\n```'
        },
        {
          title: 'Common Routing Algorithms',
          content: 'Different situations require different routing strategies:\n\n• Round Robin: Requests are allocated sequentially across the server pool.\n• Least Connections: A new request is assigned to the server with the fewest active connections. Great when session duration varies drastically.\n• IP Hash: Uses an algorithm that calculates a hash based on the client IP address. This helps ensure that a specific client always connects to the same server, achieving "Session Persistence" or "Sticky Sessions".\n• Weighted Response Time: Uses the server\'s health and response time to determine traffic distribution.'
        },
        {
          title: 'Health Checks',
          content: 'Load balancers continuously check the health of backend servers. They can perform simple TCP connectivity checks or HTTP requests to a specific `/health` endpoint. If a server fails the check, it is removed from the rotation until it recovers.'
        },
        {
          title: 'Global Server Load Balancing (GSLB)',
          content: 'While a standard load balancer operates within a single data center, GSLB distributes traffic across multiple data centers located around the world. It often uses DNS-based routing to select the best data center based on geographic proximity, server health, or traffic load.'
        }
      ]
    }
  },
  {
    id: 'databases',
    title: 'Databases (SQL vs NoSQL)',
    icon: Database,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    desc: 'Storing and retrieving data at scale. Choosing the right data model for the job.',
    points: ['ACID vs BASE', 'Relational Schemas', 'Key-Value / Document / Graph', 'Sharding & Replication'],
    related: ['caching', 'cap-theorem'],
    content: {
      overview: 'Choosing the right database involves understanding the nature of your data, the scaling requirements, and the consistency guarantees you need. Databases are broadly categorized into SQL (Relational) and NoSQL (Non-Relational) systems. Let\'s break down what each type solves and when to pick them.',
      sections: [
        {
          title: 'Relational (SQL)',
          content: 'SQL databases (PostgreSQL, MySQL, Oracle) excel in structured data with precise relationships. They use tables with strict schemas. Crucially, they enforce ACID properties:\n\n• Atomicity: A transaction is "all or nothing." If it fails halfway, all changes are rolled back.\n• Consistency: Any transaction brings the database from one valid state to another valid state.\n• Isolation: Concurrent transactions do not interfere with each other.\n• Durability: Once a transaction is committed, it remains saved even in the event of a system failure.\n\nUse Cases: Financial systems, ERPs, apps with complex transactions. \nScaling: Typically scaled "vertically" (adding more CPU/RAM to a single machine) because maintaining ACID across distributed nodes is hard, though "NewSQL" solutions (like CockroachDB or Google Spanner) offer horizontal scaling.'
        },
        {
          title: 'Document (NoSQL)',
          content: 'Document stores (MongoDB, CouchDB, DynamoDB) store data in a JSON/BSON-like structure. The schema is highly flexible; two documents in the same "collection" can have entirely different attributes. Instead of joining tables, you often embed related data within a single document for fast read access.\n\nUse Cases: Content Management Systems (CMS), E-commerce product catalogs, User profiles, Logging, and rapid prototyping where schemas evolve frequently.'
        },
        {
          title: 'Key-Value (NoSQL)',
          content: 'Key-Value stores (Redis, Memcached, DynamoDB) are the simplest NoSQL DBs. They store a simple data string, object, or complex data types indexed by a single key. Many are held entirely in memory (RAM), making them blazingly fast with sub-millisecond latencies.\n\nUse Cases: Session management, User preferences, Web caching, Leaderboards, and serving high-velocity reads/writes.'
        },
        {
          title: 'Wide-Column Stores (NoSQL)',
          content: 'Columnar databases (Cassandra, HBase) organize data by columns rather than rows. Think of it like a two-dimensional key-value store. This design is specifically optimized for large-scale distributed architectures, fast writes, and analytical queries across massive datasets.\n\nUse Cases: IoT telemetry data, Time-series metrics, Fraud detection, and high-scale logging (like capturing every click event for millions of users).'
        },
        {
          title: 'Graph Stores (NoSQL)',
          content: 'Graph databases (Neo4j, Amazon Neptune) treat relationships between data points as "first-class citizens." Data is stored as nodes (entities like "User") and edges (relationships like "FRIEND_OF"). A query that discovers "friends of friends who like coding" takes milliseconds in a Graph DB, whereas doing multiple deep SQL JOINs would severely impact performance.\n\nUse Cases: Recommendation engines, Social networks, Network security & fraud detection, Knowledge graphs.'
        },
        {
          title: 'Database Scaling: Replication vs Sharding',
          content: 'Scaling a database goes beyond throwing more RAM at it.\n\n```mermaid\nflowchart TD\n    App[Application Server]\n    Primary[(Primary DB)]\n    Replica1[(Replica 1)]\n    Replica2[(Replica 2)]\n    App -->|Write| Primary\n    App -->|Read| Replica1\n    App -->|Read| Replica2\n    App -->|Read| Primary\n    Primary -.->|Async Replication| Replica1\n    Primary -.->|Async Replication| Replica2\n```\n\n• Replication (High Availability & Read Scaling): Involves copying data across multiple servers (nodes). A typical setup is Primary-Replica, where writes go to the Primary, and it asynchronously syncs data to Replicas. Clients can read from any Replica, increasing read performance and providing a failover backup if the Primary dies.\n• Sharding (Write & Storage Scaling): The process of splitting a single logical database into smaller, manageable pieces called "shards," and distributing them across multiple physical servers. If you have 100 million users, you might put users 1-50M on Server A, and 51-100M on Server B. Sharding horizontally scales write operations and storage, but makes complex aggregations across shards very difficult.'
        }
      ]
    }
  },
  {
    id: 'caching',
    title: 'Caching Strategies',
    icon: Zap,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    desc: 'Storing frequently accessed data in memory (like Redis or Memcached) to reduce database load.',
    points: ['Write-Through', 'Write-Behind', 'Cache Invalidation', 'Eviction Policies (LRU, LFU)'],
    related: ['databases', 'load-balancing'],
    content: {
      overview: 'Imagine a librarian. Every time someone asks for a specific book, she has to walk into the deep archives (the database), find it, and bring it back. This takes time. Caching is like the librarian keeping the most requested books right on her front desk (the cache). When someone asks for a popular book, she hands it over instantly. Caching involves storing copies of data in high-speed RAM (like Redis or Memcached) so future requests are lightning-fast.',
      sections: [
        {
          title: 'Cache Aside (Lazy Loading)',
          content: 'This is the most common caching pattern. \n\n```mermaid\nflowchart TD\n    App[Application]\n    Cache[(Cache)]\n    DB[(Database)]\n    App -->|1. Request Data| Cache\n    Cache -.->|2a. Cache Hit| App\n    Cache -.->|2b. Cache Miss| App\n    App -->|3. Fetch from DB| DB\n    DB -.->|4. Return Data| App\n    App -->|5. Save to Cache| Cache\n```\n\n1. The application asks the cache for data.\n2. Cache Hit: If the data is there, it\'s returned immediately. \n3. Cache Miss: If the data is NOT there, the application fetches it from the slow database, returns it to the user, and simultaneously saves a copy in the cache for the next time.\n\nIt is called "lazy" because data is only loaded into the cache when it is explicitly requested.'
        },
        {
          title: 'Write-Through Strategy',
          content: 'In this strategy, every time the application writes or updates data, it updates BOTH the cache and the database at the exact same time.\n\nPros: The data in the cache is always 100% up-to-date. You never serve stale data.\nCons: Every write operation involves two trips (one to RAM, one to Disk), which makes writing data slower.'
        },
        {
          title: 'Write-Behind (Write-Back) Strategy',
          content: 'Here, the application writes data ONLY to the cache, and immediately tells the user "Success!". Behind the scenes, the cache asynchronously writes the data to the database at a slightly later time.\n\nPros: Blazing fast write speeds because writing to RAM is nearly instantaneous.\nCons: If the cache server crashes before it syncs to the database, that data is lost forever.'
        },
        {
          title: 'Eviction Policies: Making Room',
          content: 'RAM is very expensive and very limited compared to Disk storage. Eventually, your cache will get 100% full. When new data needs to be cached, the system must "evict" (kick out) old data to make room. The algorithm that decides WHO gets kicked out is the Eviction Policy.'
        },
        {
          title: 'Least Recently Used (LRU)',
          content: 'LRU kicks out the data that hasn\'t been looked at for the longest amount of time.\n\nImagine a cache of 3 items. You access items: A, B, C. \nThe cache is full. Now, the user requests \'B\'. \'B\' is moved to the "most recently used" spot.\nNext, a new item \'D\' needs to be cached. The LRU policy looks at the history and sees that \'A\' was the least recently used, so \'A\' is deleted to make room for \'D\', even if \'A\' was requested 100 times yesterday.'
        },
        {
          title: 'Least Frequently Used (LFU)',
          content: 'LFU keeps a counter for every piece of data. It kicks out the item with the lowest total request count.\n\nUnlike LRU which only cares about *when* you last looked at something, LFU cares about *how often* you look at something. If item \'A\' was requested 500 times an hour ago, and item \'C\' was requested just 1 time a minute ago, LFU will keep \'A\' and evict \'C\' because \'A\' is historically much more popular.'
        },
        {
          title: 'Time-To-Live (TTL)',
          content: 'You can attach a stopwatch to data when you put it in the cache. "Keep this user profile for 60 seconds." Once 60 seconds pass, the cache automatically deletes the data. The next time it\'s requested, the system experiences a cache miss and fetches a fresh copy from the database. This prevents data from becoming too stale.'
        }
      ]
    }
  },
  {
    id: 'message-queues',
    title: 'Message Queues & Event Streaming',
    icon: Network,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    desc: 'Decoupling services through asynchronous communication and event-driven architectures.',
    points: ['Pub/Sub Model', 'Kafka vs RabbitMQ', 'Event Sourcing', 'Backpressure'],
    related: ['microservices', 'databases'],
    content: {
      overview: 'Message queues and event streams allow loosely coupled microservices to communicate without direct synchronous API calls, increasing fault tolerance and the ability to handle traffic spikes. It introduces "asynchronous communication" where the sender doesn\'t wait for a response, making the system highly resilient and capable of scaling infinitely.',
      sections: [
        {
          title: 'Synchronous vs Asynchronous',
          content: 'Synchronous System: Service A calls Service B and waits for a response. If Service B is slow or down, Service A hangs and eventually fails. \nAsynchronous System: Service A puts a message on a queue and immediately returns success to the user. Service B picks up the message whenever it is ready. Service A never crashes because of Service B.'
        },
        {
          title: 'Message Queues (e.g. RabbitMQ, SQS)',
          content: 'Queues retain messages until they are consumed by a worker. Once a worker processes the message and sends an acknowledgment (ACK), the message is deleted from the queue. This is excellent for point-to-point task distribution, background processing (like resizing images or sending emails), and decoupling producers from consumers.'
        },
        {
          title: 'Event Streaming (e.g. Apache Kafka, Kinesis)',
          content: 'Unlike queues where messages are deleted upon consumption, Event Streams act as an immutable, append-only log. Events are appended to the stream, and multiple independent consumers can read from the stream at their own pace using an "offset" tracking their position. This allows for Event Sourcing, replaying historical data, and complex stream processing.'
        },
        {
          title: 'The Pub/Sub Pattern',
          content: 'Publish-Subscribe is a pattern where publishers do not program the messages to be sent directly to specific receivers (subscribers). Instead, publishers categorize published messages into "topics", and subscribers express interest in one or more topics. This drastically reduces tight coupling.'
        },
        {
          title: 'Handling Backpressure and Traffic Spikes',
          content: 'When a huge traffic spike hits (e.g., Black Friday), producers will generate messages much faster than consumers can process them. The queue acts as a massive buffer, absorbing the load safely. The queue length increases, but the system doesn\'t crash. This buys time for Auto-Scaling groups to spin up more consumer nodes to chew through the backlog.'
        }
      ]
    }
  },
  {
    id: 'microservices',
    title: 'Microservices vs Monolith',
    icon: Layers,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    desc: 'Architectural patterns for organizing code, services, and team structures.',
    points: ['Service Discovery', 'API Gateways', 'Circuit Breakers', 'Distributed Tracing'],
    related: ['load-balancing', 'message-queues'],
    content: {
      overview: 'Microservices architecture structural pattern that arranges an application as a collection of loosely coupled, independently deployable services. While a monolith bundles all logic into one deployable unit, microservices split them by business domain.',
      sections: [
        {
          title: 'The Monolith Advantage',
          content: 'Monoliths are simpler to develop, test, and deploy initially. There are no network latencies between function calls, and transactions are easy to manage. They become problematic only when the codebase or organization scales significantly.'
        },
        {
          title: 'Microservices Complexity',
          content: 'Migrating to microservices introduces distributed system complexities: network failures, eventual consistency, distributed tracing (e.g., Jaeger), and the need for robust orchestration (e.g., Kubernetes).'
        },
        {
          title: 'API Gateways',
          content: 'An API Gateway acts as a single entry point for all clients. It handles request routing, composition, and protocol translation. It can also handle cross-cutting concerns like authentication, rate limiting, and analytics.'
        }
      ]
    }
  },
  {
    id: 'cap-theorem',
    title: 'CAP Theorem',
    icon: GitBranch,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    desc: 'Understanding the trade-offs in distributed systems between Consistency, Availability, and Partition Tolerance.',
    points: ['CP vs AP Systems', 'Eventual Consistency', 'Network Partitions', 'Quorum'],
    related: ['databases', 'message-queues'],
    content: {
      overview: 'The CAP theorem states that a distributed data store can only simultaneously provide two of the following three guarantees: Consistency, Availability, and Partition tolerance. Because network partitions (P) are unavoidable in distributed systems, the real choice is always between C and A.',
      sections: [
        {
          title: 'Consistency (C)',
          content: 'Every read receives the most recent write or an error. When returning a response, the system must guarantee that all nodes have the exact same data.'
        },
        {
          title: 'Availability (A)',
          content: 'Every request receives a non-error response, without the guarantee that it contains the most recent write. Nodes might return stale data, but they will always return a response.'
        },
        {
          title: 'Navigating the Trade-off',
          content: 'If you choose CP (like HBase or MongoDB in certain configs), your system might reject reads/writes if it cannot achieve consensus during a network issue. If you choose AP (like Cassandra or DynamoDB), your system is highly available but you must design your application to handle eventual consistency.'
        }
      ]
    }
  },
  {
    id: 'cdn',
    title: 'Content Delivery Networks',
    icon: Globe,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    desc: 'Distributing static assets globally to reduce latency and server load.',
    points: ['Edge Locations', 'Push vs Pull CDN', 'Cache Control', 'DDoS Protection'],
    related: ['caching', 'load-balancing'],
    content: {
      overview: 'A Content Delivery Network (CDN) is a geographically distributed group of servers which work together to provide fast delivery of Internet content. By caching assets closer to the user, you drastically reduce latency and offload traffic from your origin servers.',
      sections: [
        {
          title: 'How a CDN Works',
          content: 'Instead of serving an image directly from your main server in New York to a user in Tokyo, a CDN will cache that image on an "Edge Server" located in Tokyo. The next time anyone in Japan requests that image, they get it from the fast, local Edge Server instead of waiting for a round-trip across the globe.'
        },
        {
          title: 'Push vs Pull CDNs',
          content: '• Pull CDN: The CDN automatically fetches the content from your origin server the first time a user requests it. Great for high-traffic sites.\n• Push CDN: You manually upload your assets to the CDN ahead of time. This is better for smaller sites or large files that are rarely requested.'
        },
        {
          title: 'Security Benefits',
          content: 'CDNs often sit in front of your entire infrastructure. They are fantastic at absorbing Distributed Denial of Service (DDoS) attacks because their global network has massive capacity. Many CDNs also provide Web Application Firewalls (WAFs) to block malicious traffic.'
        }
      ]
    }
  },
  {
    id: 'api-gateway',
    title: 'API Gateways',
    icon: Shield,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    desc: 'Creating a unified entry point and managing traffic for microservices.',
    points: ['Reverse Proxy', 'Rate Limiting', 'Authentication', 'Request Routing'],
    related: ['microservices', 'load-balancing'],
    content: {
      overview: 'An API Gateway acts as a reverse proxy to accept all API calls, aggregate the various services required to fulfill them, and return the appropriate result. It manages cross-cutting concerns so your individual microservices don\'t have to.',
      sections: [
        {
          title: 'The Unified Entry Point',
          content: 'Without an API Gateway, a mobile app might have to individually call the Authentication Service, the User Service, and the Billing Service. An API Gateway allows the mobile app to make a single request to the Gateway, which then fans out those requests to the respective backend microservices and composites the response.'
        },
        {
          title: 'Cross-Cutting Concerns',
          content: 'Instead of implementing JWT token validation, rate-limiting, and CORS policies in every single microservice, you can offload all of this logic to the API Gateway. The Gateway handles the noisy neighborhood problems, allowing your microservices to focus purely on business logic.'
        },
        {
          title: 'Authentication & Security',
          content: 'The Gateway can verify authentication tokens before the request ever reaches your backend network. It can also strip out sensitive headers or transform the payload if necessary.'
        }
      ]
    }
  }
];
