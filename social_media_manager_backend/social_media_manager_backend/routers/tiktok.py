from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from social_media_manager_backend.database import database
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class TikTokPost(BaseModel):
    id: Optional[int]
    user_id: int
    content: str
    video_url: str
    scheduled_time: Optional[datetime]
    is_published: bool = False

@router.post("/", response_model=TikTokPost)
async def create_tiktok_post(post: TikTokPost):
    try:
        logger.info(f"Attempting to create TikTok post with data: {post.dict()}")

        query = """
        INSERT INTO tiktok_posts (user_id, content, video_url, scheduled_time, is_published)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING *
        """
        values = (post.user_id, post.content, post.video_url, post.scheduled_time, post.is_published)
        logger.info(f"Executing query: {query}")
        logger.info(f"Query parameters: {values}")

        result = database.execute_query(query, values)

        if result:
            created_post = result[0]
            logger.info(f"TikTok post created successfully: {created_post}")
            return TikTokPost(**created_post)
        else:
            logger.error("Failed to create TikTok post: No result returned from database")
            raise HTTPException(status_code=500, detail="Failed to create TikTok post: No result returned from database")
    except Exception as e:
        logger.exception(f"An error occurred while creating TikTok post: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred while creating TikTok post: {str(e)}")

@router.get("/{post_id}", response_model=TikTokPost)
async def read_tiktok_post(post_id: int):
    try:
        query = "SELECT * FROM tiktok_posts WHERE id = %s"
        result = database.execute_query(query, (post_id,))
        if result:
            return TikTokPost(**result[0])
        else:
            raise HTTPException(status_code=404, detail="TikTok post not found")
    except Exception as e:
        logger.exception(f"An error occurred while fetching TikTok post: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred while fetching TikTok post: {str(e)}")

@router.get("/", response_model=List[TikTokPost])
async def list_tiktok_posts():
    try:
        query = """
        SELECT * FROM tiktok_posts
        ORDER BY scheduled_time ASC
        """
        logger.info(f"Executing query to list TikTok posts: {query}")
        result = database.execute_query(query)
        logger.info(f"Retrieved {len(result)} TikTok posts")
        return [TikTokPost(**post) for post in result]
    except Exception as e:
        logger.exception(f"An error occurred while fetching TikTok posts: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred while fetching TikTok posts: {str(e)}")

@router.post("/{post_id}/schedule")
async def schedule_tiktok_post(post_id: int, scheduled_time: datetime):
    try:
        query = """
        UPDATE tiktok_posts
        SET scheduled_time = %s, is_published = FALSE
        WHERE id = %s
        RETURNING *
        """
        logger.info(f"Executing query to schedule TikTok post: {query}")
        logger.info(f"Query parameters: post_id={post_id}, scheduled_time={scheduled_time}")
        result = database.execute_query(query, (scheduled_time, post_id))
        if result:
            updated_post = result[0]
            logger.info(f"TikTok post scheduled successfully: id={updated_post['id']}, scheduled_time={updated_post['scheduled_time']}")
            return TikTokPost(**updated_post)
        else:
            logger.warning(f"TikTok post not found for scheduling: post_id={post_id}")
            raise HTTPException(status_code=404, detail="TikTok post not found")
    except Exception as e:
        logger.exception(f"An error occurred while scheduling TikTok post: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred while scheduling TikTok post: {str(e)}")
