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
      id: "semantic-cache-berlin-paris",
      title: "I Built a Semantic Cache That Confidently Told Users Berlin is Paris",
      subtitle: "And exactly why that happened — and how I fixed it.",
      date: "November 14, 2026",
      readTime: "10 min read",
      category: "Distributed Systems",
      diagram: {
        title: "TWO-PHASE SEMANTIC CACHE LOOKUP",
        nodes: ["Embed Query", "▶ HNSW ANN Search", "▶ Cosine Gate", "▶ Query Verification", "▶ HIT / MISS"]
      },
      summary: "My semantic cache embedded 'capital of France?' and 'capital of Germany?' to vectors with 0.94 cosine similarity — and happily served Paris for both. Here's how discarding the original query text turned an ANN index into a confident liar, and the two-phase fix that stopped it.",
      content: `I was building **LLM Relay**, a self-hosted API gateway in Go that proxies requests across multiple LLM providers — Groq, Gemini, Ollama, Anthropic — behind a single OpenAI-compatible endpoint. One URL, any model, no vendor lock-in.

One of the features I wanted was a **semantic cache**. Instead of caching only *exact* queries, you cache by *meaning*. If someone asks "What's machine learning?" and later someone asks "Can you explain ML to me?", the second person gets the cached answer. No LLM call needed. Zero cost. Near-zero latency.

I built it. It worked. I was proud of it. Then I asked it two questions.

---

### The Question That Broke Everything

I asked: **"What is the capital of France?"** — got back *"The capital of France is Paris."* Cache stored it. Great.

A minute later I asked: **"What is the capital of Germany?"** — got back *"The capital of France is Paris."* From cache. With a confident \`X-Cache: HIT\` header.

The cache returned **Paris for Germany**. And it was sure about it.

---

### What Went Wrong

The bug was embarrassingly simple. My cache had two paths — a read path and a write path. The write path embedded the question into a vector, stored the **response** in Redis, and inserted the **vector** into HNSW. But it never stored the **original question text**. The question got converted into a 1536-dimensional vector and then thrown away forever.

So when "capital of Germany?" arrived, the system embedded it, searched the HNSW index, found the nearest vector (which belonged to "capital of France?"), checked cosine similarity — 0.94, above my 0.90 threshold — and confidently returned Paris. The system had no record that the question it was answering was about Germany at all.

---

### Why 0.94 Similarity Between France and Germany?

This is the part that surprised me. 0.94? For two different countries? That feels wrong.

It makes complete sense when you think about what embeddings actually capture. The sentence structure is identical: *"What is the capital of [COUNTRY]?"* — same grammar, same question word, same preposition. One word out of eight differs. In 1536-dimensional space, that's barely a nudge.

More importantly, "France" and "Germany" aren't random words. They're both European countries, both democracies, both appear together constantly in training data — EU news, geography textbooks, political articles. The embedding model places them in the same neighborhood because they genuinely *are* semantically related.

Think of embeddings as capturing *topic* and *intent*, not exact propositional content. Both questions have the same topic (European capitals) and the same intent (asking for a capital city). The embedding model was doing its job correctly. The problem was what I did with the result.

---

### The Real Mistake: ANN as Judge and Jury

HNSW is an **Approximate Nearest Neighbor** algorithm. The word "approximate" is doing a lot of work, and I wasn't paying attention to it.

ANN search is an **index**. Its job is to narrow a search space from N entries to a handful of candidates, fast. It was never designed to judge semantic equivalence. You're supposed to *do something* with the candidates it returns.

My code was using ANN as both the index *and* the judge. Found a close vector? Return the cached response. No questions asked — literally. That's like using a full-text search index to find documents with similar words, and then — without reading the actual documents — concluding they must mean the same thing.

---

### The Fix: Two-Phase Lookup

The fix was conceptually simple once I saw the problem: **store the original question alongside the response, and verify it before returning anything.**

**Phase 1 — Vector gate** (fast, approximate): Embed the query, search HNSW, check cosine similarity. If it's below threshold, skip. This eliminates 99% of lookups instantly.

**Phase 2 — Text verification** (exact, cheap): Pull the stored entry from Redis — which now includes the original question text. Compare the stored question against the incoming question. If they don't match, refuse to serve the cached answer.

Now trace through the Germany question again:

Phase 1: cosine sim between "capital of Germany?" and "capital of France?" = 0.94 ≥ 0.90 → **passes the vector gate**.

Phase 2: Redis returns the stored entry: \`{ query: "What is the capital of France?", response: "...Paris..." }\`. Compare "capital of germany" against "capital of france" → one word differs → **verification fails** → cache MISS → LLM call → **"The capital of Germany is Berlin."** ✓

Paris stays in Paris. Berlin is Berlin.

---

### What This Reveals About Semantic Caching

This bug exposed a mental model error I'd been carrying: I thought semantic caching was about *replacing* exact matching with fuzzy matching. It isn't.

Semantic caching is a **retrieval problem**, not a **decision problem**. The vector search retrieves candidates. Something else has to make the decision.

Production implementations — GPTCache, Langchain's Redis cache, Cohere's reranking pipeline — all use this two-step pattern. Retrieve with vectors, verify with text. My word-diff heuristic handles the France/Germany substitution case, but a production system would use a **cross-encoder re-ranker** — a model that reads both strings *jointly* and understands that "France" and "Germany" refer to different entities, even if the sentence structure is identical.

The tradeoff is real: a cross-encoder adds model inference to every cache lookup. For a cache whose entire purpose is to *avoid* model calls, that's a cost you weigh carefully.

---

### The Deeper Principle

The bug is an instance of a broader failure mode: **using an approximation as if it were exact.**

ANN approximates nearest-neighbor search. Embedding similarity approximates semantic equivalence. Thresholds approximate decision boundaries. Each is useful — that's why we use them. But stacking three approximations and treating the output as ground truth is how you end up confidently telling someone that Berlin is Paris.

The fix isn't removing the approximations. It's being honest about what each layer can and cannot decide, and adding verification where a final decision must be made.

ANN to narrow the field. Verification to make the call.

Same principle as: use a database index to find candidate rows quickly, but execute the actual \`WHERE\` clause to filter them correctly. Nobody would skip the \`WHERE\` clause because the index was fast. I was skipping the equivalent of the \`WHERE\` clause.

---

### What I'd Do Differently

1. **Always store the original query text.** Costs a few hundred bytes in Redis. It's the only source of truth you have.

2. **Treat ANN as retrieval, not decision.** Get candidates — maybe top-5 instead of top-1 — and then decide.

3. **Ship strict, loosen gradually.** A 0.98 threshold only catches near-exact duplicates — boring but always correct. Lower it after validating on real traffic.

4. **Log cache hits with both queries.** Would have surfaced this problem in my logs immediately, instead of me reasoning about it from first principles.

5. **Eventually, add a cross-encoder.** The embedding model tells you what neighborhood to search. The cross-encoder tells you which door to knock on.

---

The semantic cache is still the most interesting part of this project — not because it was hard to build, but because the bug taught me something I hadn't fully understood. The intuition that "similar vectors = same meaning" is seductive and mostly true and occasionally very wrong. The occasions where it's wrong are exactly the ones where it matters most.

*LLM Relay is open source: [github.com/Divyanshu-yadav-18/llm_relay](https://github.com/Divyanshu-yadav-18/llm_relay)*`
    }
  ]
};
