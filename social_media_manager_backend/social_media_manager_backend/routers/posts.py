from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from social_media_manager_backend.database import database
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class Post(BaseModel):
    id: Optional[int]
    user_id: int
    content: str
    platform: str
    scheduled_time: Optional[datetime]
    is_published: bool = False
    video_url: Optional[str] = None  # For YouTube Shorts and TikTok
    is_short: bool = False  # To distinguish YouTube Shorts from regular YouTube videos

@router.post("/", response_model=Post)
async def create_post(post: Post):
    try:
        logger.info(f"Attempting to create post with data: {post.dict()}")

        # Check for missing required fields
        missing_fields = []
        if not post.user_id:
            missing_fields.append("user_id")
        if not post.content:
            missing_fields.append("content")
        if not post.platform:
            missing_fields.append("platform")

        if missing_fields:
            logger.warning(f"Attempt to create post with missing required fields: {', '.join(missing_fields)}")
            raise HTTPException(status_code=400, detail=f"Missing required fields: {', '.join(missing_fields)}")

        # Log database connection status
        if database.conn and not database.conn.closed:
            logger.info("Database connection is open")
        else:
            logger.warning("Database connection is closed or not established")
            database.connect()  # Attempt to reconnect

        query = """
        INSERT INTO posts (user_id, content, platform, scheduled_time, is_published)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING *
        """
        values = (post.user_id, post.content, post.platform, post.scheduled_time, post.is_published)
        logger.info(f"Executing query: {query}")
        logger.info(f"Query parameters: {values}")

        result = database.execute_query(query, values)

        if result:
            created_post = result[0]
            logger.info(f"Post created successfully: {created_post}")
            return Post(**created_post)
        else:
            logger.error("Failed to create post: No result returned from database")
            raise HTTPException(status_code=500, detail="Failed to create post: No result returned from database")
    except HTTPException as he:
        # Re-raise HTTP exceptions without modifying them
        raise he
    except Exception as e:
        logger.exception(f"An error occurred while creating post: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred while creating post: {str(e)}")

@router.get("/{post_id}", response_model=Post)
async def read_post(post_id: int):
    # TODO: Implement post retrieval logic
    pass

@router.put("/{post_id}", response_model=Post)
async def update_post(post_id: int, post: Post):
    # TODO: Implement post update logic
    pass

@router.delete("/{post_id}")
async def delete_post(post_id: int):
    # TODO: Implement post deletion logic
    pass

@router.get("/", response_model=List[Post])
async def list_posts():
    try:
        query = """
        SELECT * FROM posts
        ORDER BY scheduled_time ASC
        """
        logger.info(f"Executing query to list posts: {query}")
        result = database.execute_query(query)
        logger.info(f"Retrieved {len(result)} posts")
        return [Post(**post) for post in result]
    except Exception as e:
        logger.exception(f"An error occurred while fetching posts: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred while fetching posts: {str(e)}")

@router.post("/{post_id}/schedule")
async def schedule_post(post_id: int, scheduled_time: datetime):
    try:
        query = """
        UPDATE posts
        SET scheduled_time = %s, is_published = FALSE
        WHERE id = %s
        RETURNING *
        """
        logger.info(f"Executing query to schedule post: {query}")
        logger.info(f"Query parameters: post_id={post_id}, scheduled_time={scheduled_time}")
        result = database.execute_query(query, (scheduled_time, post_id))
        if result:
            updated_post = result[0]
            logger.info(f"Post scheduled successfully: id={updated_post['id']}, scheduled_time={updated_post['scheduled_time']}")
            return Post(**updated_post)
        else:
            logger.warning(f"Post not found for scheduling: post_id={post_id}")
            raise HTTPException(status_code=404, detail="Post not found")
    except Exception as e:
        logger.exception(f"An error occurred while scheduling post: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred while scheduling post: {str(e)}")
