/* ==========================================================================
   PORTFOLIO DATA SOURCE - DIVYANSHU YADAV
   ========================================================================== */

const PORTFOLIO_DATA = {
  profile: {
    name: "Divyanshu Yadav",
    handle: "Sh0ckwave",
    title: "Backend & Systems Engineer",
    institution: "International Institute of Information Technology, Bhubaneswar",
    degree: "B.Tech in Computer Science and Engineering",
    cgpa: "7.9 / 10",
    gradYear: "2023 – 2027 (Expected)",
    location: "Bhubaneswar, India",
    status: "Available for Systems & Backend Roles / Internships",
    email: "divyanshu13521984@gmail.com",
    github: "https://github.com/Divyanshu-yadav-18",
    githubUser: "Divyanshu-yadav-18",
    linkedin: "https://linkedin.com/in/divyanshu-yadav",
    codeforces: "https://codeforces.com/profile/Sh0ckwave",
    codeforcesRating: 1584,
    codeforcesRank: "Specialist",
    problemsSolved: "500+",
    bio: "Backend & Systems engineer. I write Go (sometimes it compiles on the first try). I think first, benchmark second, and design distributed systems that don't fall over when downstream services hiccup.",
    honestBit: "I build real systems — not cloned tutorials or toy wrappers. A custom HNSW vector index from scratch in Go for sub-millisecond semantic caching, a distributed DAG task engine with atomic Lua token-bucket rate limiting and heartbeat worker recovery, and a multi-bitrate HLS adaptive media transcode pipeline with zero-drift synchronization. Scroll, inspect the system topologies, read the code, and judge for yourself."
  },

  skills: [
    {
      category: "Languages",
      count: "07",
      items: [
        { name: "Go", icon: "🐹", note: "Primary language for systems & concurrency" },
        { name: "C", icon: "⚡", note: "Systems programming, memory management" },
        { name: "C++", icon: "⚙", note: "Competitive programming, STL algorithms" },
        { name: "TypeScript", icon: "TS", note: "Type-safe fullstack & real-time servers" },
        { name: "JavaScript", icon: "JS", note: "Node.js ecosystem, async event loop" },
        { name: "SQL", icon: "🗄", note: "Complex queries, indexing, transactions" },
        { name: "Bash", icon: "$_", note: "Linux tooling, automation, deployment" }
      ]
    },
    {
      category: "Backend & Distributed",
      count: "08",
      items: [
        { name: "Go (Chi)", icon: "󰄛", note: "High-performance idiomatic HTTP routers" },
        { name: "Node.js", icon: "⬢", note: "Runtime event-driven architecture" },
        { name: "Express.js", icon: "ex", note: "RESTful microservice backends" },
        { name: "Next.js", icon: "▲", note: "Server components, fullstack SSR" },
        { name: "WebRTC", icon: "📡", note: "Peer-to-peer real-time media channels" },
        { name: "Socket.io", icon: "⚡", note: "Bidirectional WebSocket room synchronization" },
        { name: "REST APIs", icon: "⇄", note: "Structured endpoints, SSE streaming" },
        { name: "Microservices", icon: "⎈", note: "Decoupled services, circuit breakers" }
      ]
    },
    {
      category: "Databases & Caching",
      count: "05",
      items: [
        { name: "PostgreSQL", icon: "🐘", note: "ACID transactions, accounting, relational" },
        { name: "Redis", icon: "🔴", note: "Semantic cache, Lua scripts, token buckets" },
        { name: "MySQL", icon: "🐬", note: "Relational persistence and indexes" },
        { name: "MongoDB", icon: "🍃", note: "Document storage & aggregations" },
        { name: "SQLite", icon: "💾", note: "Embedded zero-config database" }
      ]
    },
    {
      category: "AI & Systems Tools",
      count: "08",
      items: [
        { name: "Docker", icon: "🐳", note: "Multi-stage builds, container isolation" },
        { name: "Nginx", icon: "🟢", note: "Reverse proxy, HLS streaming, SSL term" },
        { name: "Linux / Kernel", icon: "🐧", note: "Process scheduling, signals, syscalls" },
        { name: "Git", icon: "⌥", note: "Version control, branching workflows" },
        { name: "FFmpeg", icon: "🎬", note: "Multi-bitrate HLS adaptive transcode" },
        { name: "Prometheus", icon: "🔥", note: "Time-series metrics collection" },
        { name: "Grafana", icon: "📊", note: "Live observability dashboards" },
        { name: "OpenAI / Claude APIs", icon: "🤖", note: "LLM streaming, embeddings, tool calling" }
      ]
    },
    {
      category: "CS & Competitive",
      count: "04",
      items: [
        { name: "Codeforces Specialist (1584)", icon: "🏆", note: "Top competitive problem solver" },
        { name: "500+ Algorithmic Problems", icon: "🧩", note: "Codeforces, CSES, AtCoder" },
        { name: "Concurrency & Mutexes", icon: "🔒", note: "Goroutines, channels, race detector" },
        { name: "System Design (LLD/HLD)", icon: "📐", note: "Fault tolerance, rate limiters, DAGs" }
      ]
    }
  ],

  projects: [
    {
      id: "llm-relay",
      title: "LLM Relay (High-Performance AI Gateway)",
      subtitle: "Unified multi-provider proxy with custom HNSW semantic cache in Go",
      github: "https://github.com/Divyanshu-yadav-18/llm_relay",
      tags: ["Go", "Chi", "Redis", "PostgreSQL", "Docker", "Grafana", "Prometheus", "HNSW"],
      diagram: {
        title: "LLM RELAY TOPOLOGY & SEMANTIC CACHING PIPELINE",
        steps: [
          { text: "Client (SSE)", type: "client" },
          { text: "▶ Go Relay Gateway", type: "highlight-node" },
          { text: "▶ HNSW Vector Index (Hit: 0ms)", type: "green-node" },
          { text: "▶ Redis Token Bucket Limiter", type: "redis-node" },
          { text: "▶ Circuit Breakers / Fallbacks", type: "aqua-node" },
          { text: "▶ OpenAI / Anthropic / Gemini", type: "provider" }
        ]
      },
      bullets: [
        "Built a multi-provider LLM gateway in Go with a unified REST API over OpenAI, Anthropic, and Gemini, streaming chunked responses to clients via Server-Sent Events (SSE).",
        "Implemented a Hierarchical Navigable Small World (HNSW) vector index from scratch in Go to power a semantic cache, serving semantically identical prompts with sub-millisecond latency and cutting upstream provider API token costs.",
        "Engineered API-key authentication and per-tenant token-bucket rate limiting via atomic Lua scripts in Redis, persisting token accounting and tenant consumption records in PostgreSQL.",
        "Architected circuit breakers, exponential backoff retries, and automated provider fallback chains (e.g., Anthropic -> OpenAI -> Gemini) so queries never drop when upstream endpoints experience degraded latency.",
        "Instrumented complete latency, throughput, cache hit ratios, and token burn with Prometheus metrics and containerized Grafana dashboards running through Docker Compose."
      ],
      deepDive: `### Architectural Deep-Dive: LLM Relay

#### The Problem
High-volume applications consuming commercial LLM APIs face three core bottlenecks:
1. **Unpredictable Latency & Outages**: Single provider outages bring down downstream user features.
2. **Exponential Costs**: Repeated queries with trivial phrasing variations burn thousands in API tokens.
3. **No Centralized Rate Governance**: Individual clients exceed provider rate limits without cooperative backpressure.

#### The Custom HNSW Vector Cache in Go
Rather than introducing heavy external vector databases, LLM Relay implements a native Hierarchical Navigable Small World (HNSW) graph in pure Go.
- **Vector Space**: Embeddings (1536-dim) are stored in layered proximity graphs.
- **Cosine Similarity Threshold**: When an incoming prompt similarity score exceeds \`0.92\`, the response is immediately streamed from Redis cache memory.
- **Zero Allocations in Critical Path**: Vector dot-product computations use unrolled loops and memory pools to eliminate Go GC pause pressure.

\`\`\`go
// Fast cosine similarity with unrolled loops
func CosineSimilarity(a, b []float32) float32 {
    var dot, normA, normB float32
    n := len(a)
    for i := 0; i < n; i += 4 {
        dot += a[i]*b[i] + a[i+1]*b[i+1] + a[i+2]*b[i+2] + a[i+3]*b[i+3]
        normA += a[i]*a[i] + a[i+1]*a[i+1] + a[i+2]*a[i+2] + a[i+3]*a[i+3]
        normB += b[i]*b[i] + b[i+1]*b[i+1] + b[i+2]*b[i+2] + b[i+3]*b[i+3]
    }
    return dot / (float32(math.Sqrt(float64(normA))) * float32(math.Sqrt(float64(normB))))
}
\`\`\`

#### Resilient Circuit Breaking & Fallback
The gateway wraps provider clients in a state machine (Closed, Open, Half-Open). If error rates breach 15% over a 10s rolling window, the circuit trips to \`Open\` and downstream requests are automatically re-routed to the secondary model provider in the chain without client errors.`
    },
    {
      id: "distributed-job-queue",
      title: "Distributed Job Queue",
      subtitle: "Fault-tolerant DAG execution engine with heartbeat worker reassignment in Go & Redis",
      github: "https://github.com/Divyanshu-yadav-18/Job-Quese",
      tags: ["Go", "Redis", "Lua", "Docker", "DAG", "Concurrency", "Distributed Systems"],
      diagram: {
        title: "DAG DEPENDENCY EXECUTION & HEARTBEAT REASSIGNMENT",
        steps: [
          { text: "POST /jobs", type: "client" },
          { text: "▶ DAG Engine (Prereq Graph)", type: "highlight-node" },
          { text: "▶ Ready Queue (Redis Streams)", type: "redis-node" },
          { text: "▶ Worker Pool (Goroutines)", type: "green-node" },
          { text: "▶ Heartbeat Lease Check", type: "aqua-node" },
          { text: "▶ Dead Letter Queue (DLQ)", type: "fail-node" }
        ]
      },
      bullets: [
        "Built a distributed job queue in Go featuring a clean REST API for transactional job submission and real-time status tracking, utilizing Redis for persistent state and pub/sub signaling.",
        "Implemented an elastic worker pool with heartbeat-based liveness verification: if a worker node crashes mid-execution, orphan detection immediately reclaims and reassigns in-flight tasks to healthy workers.",
        "Engineered a Directed Acyclic Graph (DAG) dependency resolver that holds dependent child tasks until all prerequisite parents succeed, cleanly propagating cascading cancellation upon upstream failure.",
        "Designed atomic Lua scripts executing in Redis to enforce per-job-type rate limits via sliding token buckets, paired with exponential backoff retries and an isolated Dead-Letter Queue (DLQ).",
        "Packaged services with multi-stage scratch Docker builds and managed orchestration through Docker Compose."
      ],
      deepDive: `### Architectural Deep-Dive: Distributed Job Queue

#### DAG Dependency Resolution
A user can dispatch a pipeline where Task C requires both Task A (video transcode) and Task B (audio normalize).
1. The coordinator parses the task graph into an adjacency list and in-degree counter.
2. Tasks with \`in_degree == 0\` are immediately pushed to Redis ready queues.
3. When a worker completes a task, it fires an atomic Redis command that decrements in-degrees of child tasks. Once an in-degree reaches 0, the child job is enqueued.

\`\`\`lua
-- Atomic Lua script for job completion and child unlocking
local parent_id = KEYS[1]
local children = redis.call('SMEMBERS', 'job:' .. parent_id .. ':children')
for _, child_id in ipairs(children) do
    local remaining = redis.call('HINCRBY', 'job:' .. child_id, 'unmet_dependencies', -1)
    if remaining == 0 then
        redis.call('LPUSH', 'queue:ready', child_id)
        redis.call('HSET', 'job:' .. child_id, 'status', 'READY')
    end
end
return "OK"
\`\`\`

#### Heartbeat Lease & Orphan Recovery
Workers maintain a 5-second TTL lease in Redis using \`SET worker:{id}:heartbeat 1 EX 5\`. A supervisor goroutine polls for unacknowledged in-flight jobs. If a lease expires, the job state is rolled back to \`PENDING\` and re-enqueued, guaranteeing at-least-once execution semantics.`
    },
    {
      id: "stream-sync",
      title: "StreamSync (Real-Time Video Synchronization)",
      subtitle: "Multi-bitrate HLS media transcoder & drift-free WebSocket sync room server",
      github: "https://github.com/Divyanshu-yadav-18/StreamSync",
      tags: ["TypeScript", "Socket.io", "FFmpeg", "Docker", "Nginx", "HLS", "WebSockets"],
      diagram: {
        title: "TRANSCODING PIPELINE & MULTI-CLIENT CLOCK SYNC",
        steps: [
          { text: "Video Upload", type: "client" },
          { text: "▶ FFmpeg Transcoding Engine", type: "highlight-node" },
          { text: "▶ Multi-Bitrate HLS Chunks", type: "green-node" },
          { text: "▶ Nginx Reverse Proxy / CDN", type: "aqua-node" },
          { text: "▶ Socket.IO Sync Room Clock", type: "redis-node" },
          { text: "▶ Sub-50ms Synchronized Clients", type: "client" }
        ]
      },
      bullets: [
        "Built a high-performance Socket.IO synchronization server that keeps video playback synchronized across all room participants with sub-50ms drift tolerance.",
        "Created an automated FFmpeg media pipeline that ingests uploaded video files and transcodes them into multi-bitrate HLS streams (1080p, 720p, 360p) with adaptive bitrate master manifests.",
        "Resolved subtle concurrency race conditions between late-joining clients, chunk network latency, and playback buffering by introducing client-side clock skew correction and playback position interpolation.",
        "Deployed the service with Docker Compose behind an Nginx reverse proxy configured for low-latency HLS segment caching and persistent WebSocket connection upgrades."
      ],
      deepDive: `### Architectural Deep-Dive: StreamSync

#### The Late-Joiner Race Condition
When a new client enters a watch party room where the host is 43 minutes into a movie:
1. Simply receiving the timestamp \`T = 43:12\` causes buffering lag: by the time the video element fetches and buffers the HLS segment, the room has progressed to \`43:15\`.
2. StreamSync computes a delta:
   \`CurrentRoomTime = HostTimestamp + (Now() - HostEmitTimestamp) + NetworkRTT/2\`
3. The client buffers the upcoming segment in advance, enters an instant muted catch-up burst if drift is > 200ms, and locks precisely into frame alignment.`
    }
  ],

  blogs: [
    {
      id: "postgres-cache-miss-storm",
      title: "How OpenAI Protects Postgres from a Cache-Miss Storm",
      subtitle: "How per-key cache locking, temporary leases, and bounded waiting prevent thundering herd crashes.",
      date: "October 9, 2026",
      readTime: "8 min read",
      category: "Databases & Caching",
      diagram: {
        title: "CACHE MISS STORM & REFRESH LEASE PATTERN",
        nodes: ["1,000 requests", "▶ Refresh lease", "▶ Postgres", "▶ Redis", "▶ Go"]
      },
      summary: "What happens when a viral tweet invalidates a heavily cached Redis key? Without mutual exclusion, 50,000 concurrent requests slam Postgres simultaneously. Here is the distributed lease pattern that saved production.",
      content: `### The Thundering Herd Problem in High-Throughput Backends

Imagine a hot cached resource—like an organization's configuration or a viral user profile—queried by 20,000 requests per second. The key expires in Redis.

In a naive architecture:
1. All 20,000 concurrent requests encounter a cache miss.
2. Every single request executes the expensive SQL query against Postgres simultaneously.
3. Connection pools exhaust in 150ms. Postgres CPU spikes to 100%. Latency skyrockets from 2ms to 12,000ms.
4. Downstream microservices timeout and trip circuit breakers.

### The Solution: Distributed Refresh Leases & Singleflight

Instead of letting all workers query the database, we allow **exactly one worker** to acquire a "Refresh Lease", while all other concurrent requests wait briefly for the cached result to be published.

\`\`\`
[10,000 Requests] ───▶ [Check Redis Cache]
                             │
                      (Cache Miss!)
                             │
                             ▼
                [Try Acquire 2s Lease (Lua)]
                     /                \\
             (Acquired: Win)     (Failed: Waiter)
                   /                    \\
       [Query Postgres]            [Subscribe or Poll Redis]
            │                              │
       [Write to Redis] ───────────▶ [Receive Fresh Value]
\`\`\`

#### Implementing the Lease Pattern in Go with Singleflight
In Go, we combine in-process \`golang.org/x/sync/singleflight\` with a Redis distributed lease:

\`\`\`go
func (s *Service) GetUserProfile(ctx context.Context, userID string) (*Profile, error) {
    cacheKey := "profile:" + userID

    // 1. Check Redis cache first
    if val, err := s.redis.Get(ctx, cacheKey).Result(); err == nil {
        return deserializeProfile(val), nil
    }

    // 2. Singleflight prevents multiple in-flight goroutines within this node
    val, err, _ := s.requestGroup.Do(cacheKey, func() (interface{}, error) {
        // Try to acquire distributed lease across all instances
        leaseKey := "lease:" + cacheKey
        acquired, _ := s.redis.SetNX(ctx, leaseKey, "1", 2*time.Second).Result()

        if !acquired {
            // Another node is already refreshing; wait briefly and retry cache
            time.Sleep(50 * time.Millisecond)
            return s.redis.Get(ctx, cacheKey).Result()
        }
        defer s.redis.Del(ctx, leaseKey)

        // Only ONE node queries Postgres
        profile, err := s.db.QueryUserProfile(ctx, userID)
        if err != nil {
            return nil, err
        }

        // Cache the fresh record with jittered TTL to prevent synchronized expiry
        ttl := 5*time.Minute + time.Duration(rand.Intn(30))*time.Second
        s.redis.Set(ctx, cacheKey, serializeProfile(profile), ttl)
        return profile, nil
    })

    return val.(*Profile), err
}
\`\`\`

### Key Takeaways
- **Never allow unsynchronized cache regeneration** on hot keys.
- **Add TTL Jitter**: Expire keys at \`baseTTL ± random(30s)\` so keys don't all expire at the exact same second.
- Combine **Singleflight** (for in-process concurrency) with **Redis Leases** (for cross-node clustering).`
    },
    {
      id: "gpu-silent-hangs",
      title: "When One GPU Stops the Entire Training Job",
      subtitle: "What Llama 3 reveals about silent GPU hangs, checkpoint recovery, and useful training progress.",
      date: "October 17, 2026",
      readTime: "13 min read",
      category: "AI Infrastructure",
      diagram: {
        title: "ALL-REDUCE RING SYNCHRONIZATION & SILENT HANG DETECTION",
        nodes: ["GPU 01", "GPU 02", "GPU 03", "GPU 04 (HANG)", "Watchdog Timeout", "Checkpoint Rollback"]
      },
      summary: "Distributed training across thousands of GPUs is governed by the speed of the slowest node. When a single PCIe link degrades or an NCCL kernel silently hangs, 4,096 GPUs sit idle. Here's how resilient telemetry detects and isolates faulty ranks in seconds.",
      content: `### The Hidden Cost of Silent Hangs in Distributed AI

In large-scale model training (like training 70B+ parameter LLMs across 2,048+ GPUs), computation occurs in synchronized steps using Ring All-Reduce or Tensor Parallelism.

Every GPU calculates gradients for its micro-batch, and they all exchange gradients before updating model weights.

**If GPU #1,402 silently hangs or encounters a ECC memory stall, the remaining 2,047 GPUs enter a spin-lock waiting for the reduction step to complete.**

At $3/hour per H100 GPU, a 30-minute silent hang costs thousands of dollars in wasted compute with zero training progress.

\`\`\`
[GPU 00] ──▶ [GPU 01] ──▶ [GPU 02] ──▶ [GPU 03 (HANG)] ──X──▶ [GPU 04]
   │           │            │                 │                 │
   └───────────┴────────────┴─────────────────┴─────────────────┘
                ALL NODES BLOCKED AT NCCL ALL-REDUCE
\`\`\`

### Detecting Silent Stalls with Heartbeat Watchdogs

Hardware watchdogs must monitor collective operation durations:
1. **NCCL Timeout Watchdog**: Set \`NCCL_TIMEOUT=120\` to crash the job rather than hang indefinitely.
2. **Asynchronous Checkpointing**: Write checkpoints to NVMe-backed distributed storage in parallel using double-buffered memory so training isn't halted during disk I/O.
3. **Automated Rank Eviction**: Identify the unresponsive rank via eBPF kernel counters, restart the slurm job with a standby worker, and resume from the latest checkpoint.`
    },
    {
      id: "hnsw-vector-index-go",
      title: "Building an HNSW Vector Index From Scratch in Go",
      subtitle: "How hierarchical navigable small world graphs enable sub-millisecond semantic caching without external vector DBs.",
      date: "September 24, 2026",
      readTime: "11 min read",
      category: "Distributed Systems",
      diagram: {
        title: "HIERARCHICAL GRAPH LAYERS & GREEDY SEARCH TRAVERSAL",
        nodes: ["Layer 2 (Sparse)", "▶ Layer 1 (Medium)", "▶ Layer 0 (Dense)", "▶ Cosine Dist", "▶ Nearest K"]
      },
      summary: "Why spin up a heavy Milvus or Pinecone cluster when you only need to semantically deduplicate prompt streams? Writing an in-memory HNSW index in pure Go taught me deep lessons about memory layouts, SIMD vector instructions, and graph traversal.",
      content: `### Why Build HNSW from Scratch?

When building the **LLM Relay AI Gateway**, our goal was simple: if a user asks *"What is the capital of France?"* and another user asks *"Tell me the capital of France"*, we should recognize the semantic equivalence and return the cached answer immediately.

Spinning up an external vector DB introduced:
- An extra network hop (8-15ms round-trip).
- High operational overhead and additional infrastructure points of failure.
- Serialization and deserialization CPU tax.

By implementing HNSW as an in-memory Go library embedded directly into the gateway process, cache lookups dropped to **under 0.4 milliseconds**.

### The HNSW Core Concept

HNSW organizes high-dimensional vectors into multi-layer graphs, inspired by Skip Lists:
- **Top Layers**: Sparse graphs with long-range edges for coarse-grained routing across the vector universe.
- **Bottom Layers**: Dense graphs with short-range edges for pinpoint nearest-neighbor search.

\`\`\`
Layer 2:  (•) ──────────────────────────────▶ (•)
           │                                   │
Layer 1:  (•) ─────────▶ (•) ─────────▶ (•) ─▶ (•)
           │              │              │      │
Layer 0:  (•) ─▶ (•) ─▶ (•) ─▶ (•) ─▶ (•) ─▶ (•)
\`\`\`

#### Search Algorithm
Starting at the top layer, search greedily traverses nodes that minimize cosine distance to the query vector until reaching a local minimum, then drops down to the next denser layer.

By keeping vector arrays contiguous in memory, we maximize CPU L1/L2 cache line hits and keep Go garbage collection pauses near zero.`
    },
    {
      id: "dag-job-queue-heartbeat",
      title: "When One Worker Stalls: Designing Resilient DAG Job Queues",
      subtitle: "Heartbeat leases, atomic Lua state transitions, and topological failure propagation in distributed Go services.",
      date: "August 14, 2026",
      readTime: "9 min read",
      category: "Concurrency & Systems",
      diagram: {
        title: "DAG WORKER LIFECYCLE & CRASH RECOVERY",
        nodes: ["Parent Task A", "▶ Atomic Lua Decr", "▶ Child Task B", "▶ Worker Heartbeat", "▶ DLQ"]
      },
      summary: "In distributed task systems, networks partition and worker processes get OOM-killed by the Linux kernel. If your job orchestrator assumes workers always report back, jobs get stuck in limbo forever. Here is how we engineered self-healing job execution.",
      content: `### The Failure Modes of Distributed Workers

When running background tasks like video transcoding, model inference, or PDF generation, worker processes are prone to unexpected failure:
1. **OOM Killer**: Linux kernel kills the worker when RAM spikes, with no chance to send a farewell message.
2. **Network Partition**: Worker is alive but disconnected from Redis.
3. **Deadlocks**: A third-party C binding or library hangs indefinitely.

### Heartbeat Leases with Redis Key Expiration

To handle silent crashes without a complex distributed consensus protocol (like Raft), we use lease-based worker heartbeats:

1. **Task Checkout**:
   When worker \`W-104\` claims Job \`J-42\`, Redis records:
   \`SET job:42:lease "W-104" EX 10\`
   \`HSET job:42 status "IN_PROGRESS"\`

2. **Continuous Heartbeat**:
   The worker runs a background goroutine ticking every 3 seconds to renew the lease:
   \`EXPIRE job:42:lease 10\`

3. **Orphan Sweeper**:
   A lightweight supervisor checks for jobs marked \`IN_PROGRESS\` whose \`lease\` key no longer exists.
   If the lease is missing, the job was abandoned. The supervisor:
   - Increments the attempt counter.
   - If \`attempts < maxRetries\`, moves it back to \`READY\`.
   - If \`attempts >= maxRetries\`, pushes to \`DEAD_LETTER_QUEUE\` and cancels all downstream DAG dependencies.`
    }
  ]
};
