Project: Domain-Specific Search Engine with Future AI Search Chat

We are building a Java-based domain-specific search engine backend.

This is not a whole-internet Google clone. Instead, we will build a focused search engine for selected sources such as:

Wikipedia
Stack Overflow
Reddit
GitHub documentation / repositories
technical blogs
documentation websites

The goal is to build a strong traditional search engine first, then later add an AI chat-search layer, where a user can ask questions conversationally and get grounded answers from our indexed content.

1. High-Level Vision

The system will do three major things:

1. Collect content from selected websites
2. Convert that content into a searchable index
3. Allow users to search and later chat with that content

The complete long-term flow is:

Selected websites / APIs
        ↓
Crawler or source connector
        ↓
robots.txt + sitemap handling
        ↓
HTML/API content extraction
        ↓
Text cleaning and tokenization
        ↓
Document storage
        ↓
Inverted index
        ↓
Ranking engine
        ↓
Search API
        ↓
Autocomplete / analytics / caching
        ↓
Future AI search chat using RAG
2. What Type of Search Engine Are We Building?

We are building a:

Domain-specific / vertical search engine

That means we index selected sources instead of the whole internet.

Example:

A normal Google-style engine says:

Search anything from anywhere on the web.

Our system says:

Search deeply and intelligently across selected trusted sources.

For example:

Search only Wikipedia + Stack Overflow + GitHub docs for Java-related content.

This is more realistic and easier to control.

3. Main Technology Stack
Backend
Java 17+
Spring Boot
Maven

Spring Boot will be used for:

REST APIs
service layer
dependency injection
scheduled jobs
configuration
database integration
Database
PostgreSQL

Used for:

documents
URLs
crawl queue
inverted index tables
term statistics
search analytics
autocomplete query frequency
reindexing metadata
HTML Parsing
Jsoup

Used for:

fetching HTML
parsing DOM
extracting title
extracting headings
extracting visible text
extracting links
extracting metadata
Caching
Redis later

Used for:

popular query result caching
autocomplete cache
possibly crawler coordination later
Background Jobs
Spring Scheduler first
RabbitMQ / Kafka later if needed

Used for:

background reindexing
retry jobs
scheduled crawling
analytics aggregation
Future AI Search

Possible technologies:

Embeddings model
pgvector
Vector database
LLM API
RAG pipeline
4. Core Modules We Are Building

The final project will contain modules like:

SeedUrlService
CrawlQueueService
UrlNormalizer
RobotsTxtService
SitemapService
PageFetcher
HtmlParserService
TextProcessor
DocumentService
IndexerService
QueryProcessor
SearchService
RankingService
SnippetService
AnalyticsService
AutocompleteService
CacheService
ReindexingService
AdminController
AIChatSearchService later
5. Crawling System
5.1 Seed URLs

The crawler starts from selected starting points called seed URLs.

Example:

https://en.wikipedia.org/wiki/Java_(programming_language)

We store seed URLs in the database.

Purpose:

define where crawling starts
control what domains we crawl
avoid uncontrolled whole-internet crawling

Technology:

Spring Boot API
PostgreSQL seed_urls table
5.2 URL Queue / URL Frontier

A crawler needs a queue of URLs waiting to be crawled.

This is also called the:

URL frontier

Example:

Queue:
1. /wiki/Java
2. /wiki/Spring_Framework
3. /wiki/JVM

Purpose:

store pending URLs
decide what to crawl next
support BFS-style crawling
support retry and priority later

Technology:

Java Queue initially
PostgreSQL persistent crawl_queue table
Redis/RabbitMQ later if needed
5.3 Visited Set

The crawler must remember which URLs were already crawled.

Without a visited set, the crawler can fall into loops.

Example:

Page A links to Page B
Page B links back to Page A

Without visited tracking:

A → B → A → B → A ...

Purpose:

avoid duplicate crawling
avoid infinite loops
save bandwidth
save storage

Technology:

Java Set initially
PostgreSQL document/visited URL table
6. URL Normalization

Different-looking URLs may point to the same page.

Example:

https://example.com/page
https://example.com/page/
https://EXAMPLE.com/page
https://example.com/page?utm_source=google

URL normalization converts them into a standard form.

Purpose:

avoid treating the same page as multiple pages
remove tracking parameters
remove fragments like #section
convert relative URLs into absolute URLs

Technology:

Java URI
custom UrlNormalizer service
7. Polite Crawling

Polite crawling means crawling responsibly.

We will implement:

robots.txt checks
sitemap discovery
custom User-Agent
crawl delay
max depth
max pages limit
domain allowlist
avoid login/private/action pages

Purpose:

avoid overloading websites
respect website rules
avoid blocked/private areas
keep project ethical and safe
8. robots.txt Handling

Before crawling a domain, we check:

https://domain.com/robots.txt

Example:

User-agent: *
Disallow: /admin/
Disallow: /private/
Allow: /articles/
Sitemap: https://example.com/sitemap.xml

Our crawler will read:

User-agent
Allow
Disallow
Sitemap

Purpose:

know what URLs are allowed
skip disallowed paths
discover sitemap URLs

Technology:

RobotsTxtService
Java HTTP client / Jsoup connection
PostgreSQL cache for robots rules later
9. Sitemap Support

Sitemaps list important public URLs of a website.

Example:

<urlset>
  <url>
    <loc>https://example.com/articles/java</loc>
    <lastmod>2026-05-01</lastmod>
  </url>
</urlset>

We will include sitemap support.

Flow:

Fetch robots.txt
        ↓
Find Sitemap entries
        ↓
Fetch sitemap.xml
        ↓
Extract <loc> URLs
        ↓
Check robots.txt permission
        ↓
Add allowed URLs to crawl queue

Purpose:

discover important pages faster
support background reindexing later using lastmod

Technology:

SitemapService
Java XML parser
Jsoup or standard XML parsing
PostgreSQL sitemap metadata later
10. Page Fetching

The PageFetcher downloads the page HTML.

It handles:

HTTP status codes
redirects
timeouts
content type checks
failed URLs

Purpose:

fetch raw page content safely
record success/failure
skip unsupported files

Technology:

Jsoup
Java HTTP Client if needed
Spring service layer
11. HTML Parsing

Once the HTML is fetched, we parse it.

Using Jsoup, we extract:

title
headings
visible body text
links
canonical URL
metadata

We ignore:

script tags
style tags
layout noise
navigation noise where possible

Purpose:

convert raw HTML into useful searchable content
extract links for further crawling
extract fields for ranking boosts

Technology:

Jsoup
HtmlParserService
12. Text Processing Pipeline

Raw text needs to be cleaned before indexing.

Pipeline:

raw text
    ↓
lowercase
    ↓
remove punctuation
    ↓
tokenize
    ↓
remove stop words
    ↓
stemming or lemmatization later
    ↓
clean searchable tokens

Example:

"Spring Boot is useful for building REST APIs."

Becomes:

["spring", "boot", "useful", "building", "rest", "apis"]

After stemming later:

["spring", "boot", "use", "build", "rest", "api"]

Purpose:

make search consistent
reduce noise
match query terms with document terms

Technology:

TextProcessor service
Java string processing
stop-word list
stemming library later
13. Document Store

We store crawled pages in PostgreSQL.

Possible fields:

id
url
normalized_url
domain
title
body_text
content_hash
http_status
crawl_status
last_crawled_at
last_indexed_at
canonical_url

Purpose:

store crawled content
support indexing
support search result display
support reindexing
detect duplicate content

Technology:

PostgreSQL
Spring Data JPA or JDBC Template
14. Inverted Index

The inverted index is the heart of traditional search.

Instead of:

Doc1 → java backend spring
Doc2 → python backend api

We store:

java    → Doc1
backend → Doc1, Doc2
spring  → Doc1
python  → Doc2
api     → Doc2

Purpose:

quickly find documents containing a term
avoid scanning all documents
support ranking

Technology:

PostgreSQL tables
IndexerService

Possible tables:

terms
documents
postings

A posting may contain:

term_id
document_id
term_frequency
15. Positional Index

For phrase search, we need positions.

Instead of only:

java → Doc1

We store:

java → Doc1: [1, 8, 20]
backend → Doc1: [2, 10]

This helps answer:

Does "java backend" appear exactly?
Are java and backend close to each other?

Purpose:

phrase search
proximity search
phrase boost
better snippets

Technology:

posting_positions table
IndexerService
PhraseMatchingService
16. Query Processing

A user query must be processed similarly to document text.

Example query:

"Building REST API with Spring Boot"

After processing:

["build", "rest", "api", "spring", "boot"]

Purpose:

normalize query
match index terms
remove noise
prepare for ranking

Technology:

QueryProcessor
same TextProcessor logic used for documents
17. Candidate Document Selection

We do not score every document.

For query:

java backend

The inverted index gives:

java    → Doc1, Doc3
backend → Doc1, Doc2

Using OR-style candidate selection:

Candidates = Doc1, Doc2, Doc3

Then ranking decides final order.

Purpose:

reduce documents to score
make search faster

Technology:

SearchService
PostgreSQL queries over postings
18. Ranking Algorithms
18.1 Term Frequency

Term Frequency means:

How many times does a term appear in a document?

Example:

Doc1: java java backend
TF(java, Doc1) = 2

More term frequency can indicate stronger relevance, but not always.

18.2 Document Frequency

Document Frequency means:

In how many documents does this term appear?

Example:

java appears in 2 documents
backend appears in 10 documents

A term appearing in fewer documents is usually more specific.

18.3 IDF

IDF means:

Inverse Document Frequency

It measures how rare or important a term is.

Rare words get higher weight.

Common words get lower weight.

18.4 TF-IDF

TF-IDF combines:

TF = importance inside one document
IDF = rarity across all documents

Formula idea:

TF-IDF = TF × IDF

Purpose:

rank documents better than simple keyword matching
18.5 BM25

BM25 is the main traditional ranking algorithm we will implement.

BM25 improves TF-IDF by handling:

term saturation
document length normalization
term rarity

Important parameters:

k1 = controls term frequency saturation
b = controls document length normalization

Default values:

k1 = 1.2
b = 0.75

BM25 intuition:

BM25 = IDF × saturated TF × document length normalization

Purpose:

avoid keyword stuffing
avoid unfair advantage for long documents
rank focused documents higher

Technology:

RankingService
Java BM25 calculation
PostgreSQL stored statistics
19. Phrase Boost

If the user searches:

spring boot

A document containing exact phrase:

Spring Boot helps build REST APIs.

should rank higher than:

Spring is a framework. Boot process is related to Linux.

Formula idea:

Final Score = BM25 Score + Phrase Boost

Simple version:

if exact phrase exists:
    add fixed boost
else:
    add 0

Purpose:

reward meaningful phrase matches
improve relevance

Technology:

positional index
PhraseMatchingService
RankingService
20. Field-Level Boosting

Matches in some fields are more important.

Example:

title match > heading match > body match

Formula idea:

Final Score =
BM25 body score
+ title boost
+ heading boost
+ phrase boost

Purpose:

rank title/heading matches higher
make search feel more natural

Technology:

RankingService
separate field extraction from Jsoup
possibly field-specific index later
21. Snippet Generation

Search results should show a useful preview.

Example:

"... Spring Boot makes it easy to create REST APIs ..."

Purpose:

show why result matched
improve user experience
help user decide what to open

Technology:

SnippetService
stored body text
query term matching
highlighting later
22. Search API

We expose a REST API.

Example:

GET /api/search?q=spring boot&page=1&size=10

Response:

{
  "query": "spring boot",
  "page": 1,
  "size": 10,
  "totalResults": 42,
  "results": [
    {
      "title": "Spring Boot",
      "url": "https://...",
      "snippet": "...",
      "score": 8.72
    }
  ]
}

Technology:

Spring Boot Controller
SearchService
RankingService
23. Pagination

Search may return many results.

Pagination returns a slice.

Example:

page = 1, size = 10 → results 1-10
page = 2, size = 10 → results 11-20

Purpose:

avoid returning too many results
improve response time
support frontend result pages

Technology:

Spring Boot request params
Java pagination logic
24. Search Analytics

Search analytics records user search behavior.

We store:

queryText
normalizedQuery
timestamp
resultCount
responseTimeMs
topResultIds
clickedResultId later

Purpose:

track popular queries
track no-result queries
feed autocomplete
feed caching decisions
improve crawling strategy
improve ranking later

Technology:

PostgreSQL search_analytics table
AnalyticsService
25. Autocomplete

Autocomplete suggests queries while the user types.

Example:

User types: jav
Suggestions:
java
java spring boot
java backend
javascript async

This uses a Trie, also called a Prefix Tree.

26. Trie Data Structure

A Trie stores words character by character.

Example words:

java
jar
javascript

Trie structure:

root
 └── j
     └── a
         ├── v
         │   └── a
         │       └── s
         │           └── c
         │               └── r
         │                   └── i
         │                       └── p
         │                           └── t
         └── r

Each node stores:

children
isEndOfQuery
frequency
query

Purpose:

fast prefix lookup
autocomplete suggestions
rank suggestions by frequency

Technology:

Java Trie implementation
AutocompleteService
PostgreSQL query_frequency table
Redis later for fast serving
27. Popular Query Caching

If many users search:

spring boot tutorial

we can cache the result IDs.

Purpose:

return repeated searches faster
reduce ranking computation
improve latency

Technology:

Redis later
Spring Cache abstraction
in-memory cache initially if needed

Cache design:

key = normalized query
value = top result IDs
TTL = expiry time
28. Background Reindexing

Web pages change.

So we need to refresh old indexed pages.

Flow:

scheduled job
    ↓
pick stale documents
    ↓
fetch page again
    ↓
compare content hash
    ↓
if changed, reprocess and reindex

Useful metadata:

contentHash
lastCrawledAt
lastIndexedAt
lastModifiedFromSitemap
ETag
HTTP Last-Modified

Purpose:

keep index fresh
avoid stale content
avoid reindexing unchanged pages

Technology:

Spring Scheduler
PostgreSQL metadata
ReindexingService
RabbitMQ/Kafka later
29. Error Handling and Retry

Crawling can fail.

Failures include:

timeout
404
500
blocked by robots.txt
invalid URL
unsupported content type

We store retry count and status.

Purpose:

avoid infinite retries
debug crawler issues
make crawling robust

Technology:

Java exception handling
PostgreSQL retry columns
Spring Retry later
30. Admin APIs

We need admin APIs to control the system.

Possible APIs:

add seed URL
start crawl
view crawl queue
view crawl status
view indexed document count
trigger reindex
view popular queries
view failed URLs

Technology:

Spring Boot AdminController
PostgreSQL
31. Monitoring and Logging

We need visibility.

Track:

crawl rate
failed URLs
indexed document count
search latency
cache hit rate
popular queries
zero-result queries

Technology:

Spring Boot logging
Spring Actuator later
Micrometer later
Prometheus/Grafana later
32. Sharding

Sharding means splitting index data into parts.

Example:

Shard 1 → documents 1 to 1,000,000
Shard 2 → documents 1,000,001 to 2,000,000

Purpose:

scale beyond one machine
parallelize search
handle large datasets

Search flow with shards:

User query
    ↓
query coordinator
    ↓
send query to all shards
    ↓
each shard returns top results
    ↓
coordinator merges results

Technology later:

conceptual design first
multiple PostgreSQL partitions
separate index services later
33. Replication

Replication means copying data for reliability.

Example:

Shard 1 primary → Machine A
Shard 1 replica → Machine B

Purpose:

high availability
fault tolerance
faster reads
disaster recovery

Technology later:

database replication
replicated index services
read replicas
34. Vector Search

Traditional search finds matching words.

Vector search finds similar meaning.

Example query:

how to improve website speed

Can match:

frontend performance optimization
reduce page load time
web latency

Purpose:

semantic search
meaning-based retrieval
handle different wording

Technology later:

embeddings model
pgvector
vector database
Java integration
35. Hybrid Ranking

Hybrid ranking combines keyword and semantic search.

Formula idea:

Final Score =
BM25 score
+ vector similarity score
+ phrase boost
+ field boosts

Purpose:

combine exact keyword relevance with semantic meaning

Technology:

BM25 RankingService
VectorSearchService
score normalization
36. Future AI Search Chat

This is the future layer where users can chat with the search engine.

Example:

User:
Explain Java virtual threads and give useful references.

AI Search:
Java virtual threads are lightweight threads introduced in Project Loom...
Sources:
1. Oracle docs
2. Stack Overflow discussion
3. GitHub README

This will use RAG.

RAG = Retrieval-Augmented Generation

Flow:

User question
    ↓
understand query
    ↓
retrieve relevant documents using BM25/vector/hybrid search
    ↓
select best passages
    ↓
send passages to LLM
    ↓
generate grounded answer
    ↓
show citations/source links
    ↓
allow follow-up questions

Purpose:

make search conversational
answer questions directly
still ground answers in indexed sources

Technology later:

LLM API
embeddings
pgvector/vector DB
RAG pipeline
chat session storage
citation generation
guardrails

Important principle:

AI chat does not replace traditional search.
AI chat sits on top of traditional search.
37. Source-Specific Strategy

Because we are indexing selected sources, each source may need a different ingestion strategy.

Wikipedia

Good for starting.

mostly public
structured HTML
many internal links
good for crawling practice
Stack Overflow

Need care.

may require API
strict terms
anti-abuse systems
structured Q&A content
Reddit

Better through API where possible.

dynamic content
comments
threads
rate limits
GitHub

May use API.

README files
issues
discussions
docs
repositories
Medium

Need caution.

dynamic rendering
access limitations
robots rules

So our architecture should support:

source connectors

Meaning:

each source can have its own fetch/discovery strategy
but all content enters the same indexing pipeline
38. Final Architecture
Source Config
    ↓
Crawler / API Connector
    ↓
robots.txt / sitemap checks
    ↓
URL Queue
    ↓
Page Fetcher
    ↓
HTML/API Parser
    ↓
Text Processor
    ↓
Document Store
    ↓
Indexer
    ↓
Inverted Index + Positional Index
    ↓
Search Service
    ↓
BM25 + Boost Ranking
    ↓
Search API
    ↓
Analytics + Autocomplete + Cache
    ↓
Future Vector Search
    ↓
Future AI Chat Search
39. What We Are Building First

First milestone:

Given a seed URL,
crawl allowed pages,
extract content,
store documents,
build inverted index,
search using BM25.

This gives us the foundation.

40. What We Will Add Afterward

After the core works, we add:

phrase search
title/heading boost
snippet generation
search analytics
autocomplete using Trie
popular query caching
background reindexing
source-specific connectors
vector search
AI chat search
sharding/replication design
41. Final One-Line Vision

We are building:

A Java Spring Boot based domain-specific search engine that crawls selected trusted sources, indexes their content using traditional search engine techniques like inverted index and BM25, improves relevance with phrase and field boosts, supports autocomplete through Trie, learns from analytics, stays fresh through background reindexing, and later becomes an AI-powered conversational search engine using vector search and RAG.