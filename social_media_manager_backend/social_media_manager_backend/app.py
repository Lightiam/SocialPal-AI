import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg
from .routers import accounts, posts, statistics, url_shortener, members, admin, threads, payments, currency, youtube_shorts, tiktok, auth
from .database import database

app = FastAPI()

# Database connection
database.connect()

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include routers
app.include_router(accounts.router, prefix="/api/accounts", tags=["accounts"])
app.include_router(posts.router, prefix="/api/posts", tags=["posts"])
app.include_router(statistics.router, prefix="/api/statistics", tags=["statistics"])
app.include_router(url_shortener.router, prefix="/api/url", tags=["url"])
app.include_router(members.router, prefix="/api/members", tags=["members"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])
app.include_router(threads.router, prefix="/api/threads", tags=["threads"])
app.include_router(payments.router, prefix="/api/payments", tags=["payments"])
app.include_router(currency.router, prefix="/api/currency", tags=["currency"])
app.include_router(youtube_shorts.router, prefix="/api/youtube-shorts", tags=["youtube-shorts"])
app.include_router(tiktok.router, prefix="/api/tiktok", tags=["tiktok"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}

@app.on_event("shutdown")
async def shutdown_event():
    database.disconnect()
