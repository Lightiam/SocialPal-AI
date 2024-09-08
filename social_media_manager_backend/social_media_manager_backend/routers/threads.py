from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from social_media_manager_backend.database import database
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class ThreadsPost(BaseModel):
    id: Optional[int]
    user_id: int
    content: str
    scheduled_time: Optional[datetime]
    is_published: bool = False
    reply_to: Optional[int] = None

@router.post("/", response_model=ThreadsPost)
async def create_threads_post(post: ThreadsPost):
    try:
        logger.info(f"Attempting to create Threads post for user_id: {post.user_id}")
        logger.info(f"Post content (truncated): {post.content[:50]}...")

        if database.conn and not database.conn.closed:
            logger.info("Database connection is open")
        else:
            logger.warning("Database connection is closed or not established")
            database.connect()

        query = """
        INSERT INTO threads_posts (user_id, content, scheduled_time, is_published, reply_to)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING *
        """
        values = (post.user_id, post.content, post.scheduled_time, post.is_published, post.reply_to)
        logger.info(f"Executing query: {query}")
        logger.info(f"Query parameters: user_id={post.user_id}, scheduled_time={post.scheduled_time}, is_published={post.is_published}, reply_to={post.reply_to}")

        result = database.execute_query(query, values)

        if result:
            created_post = result[0]
            logger.info(f"Threads post created successfully: id={created_post['id']}, user_id={created_post['user_id']}")
            return ThreadsPost(**created_post)
        else:
            logger.error("Failed to create Threads post: No result returned from database")
            raise HTTPException(status_code=500, detail="Failed to create Threads post: No result returned from database")
    except Exception as e:
        logger.exception(f"An error occurred while creating Threads post: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred while creating Threads post: {str(e)}")

@router.get("/{post_id}", response_model=ThreadsPost)
async def read_threads_post(post_id: int):
    try:
        query = "SELECT * FROM threads_posts WHERE id = %s"
        result = database.execute_query(query, (post_id,))
        if result:
            return ThreadsPost(**result[0])
        else:
            raise HTTPException(status_code=404, detail="Threads post not found")
    except Exception as e:
        logger.exception(f"An error occurred while fetching Threads post: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred while fetching Threads post: {str(e)}")

@router.put("/{post_id}", response_model=ThreadsPost)
async def update_threads_post(post_id: int, post: ThreadsPost):
    try:
        query = """
        UPDATE threads_posts
        SET content = %s, scheduled_time = %s, is_published = %s, reply_to = %s
        WHERE id = %s
        RETURNING *
        """
        values = (post.content, post.scheduled_time, post.is_published, post.reply_to, post_id)
        result = database.execute_query(query, values)
        if result:
            return ThreadsPost(**result[0])
        else:
            raise HTTPException(status_code=404, detail="Threads post not found")
    except Exception as e:
        logger.exception(f"An error occurred while updating Threads post: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred while updating Threads post: {str(e)}")

@router.delete("/{post_id}")
async def delete_threads_post(post_id: int):
    try:
        query = "DELETE FROM threads_posts WHERE id = %s RETURNING id"
        result = database.execute_query(query, (post_id,))
        if result:
            return {"message": f"Threads post {post_id} deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Threads post not found")
    except Exception as e:
        logger.exception(f"An error occurred while deleting Threads post: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred while deleting Threads post: {str(e)}")

@router.get("/", response_model=List[ThreadsPost])
async def list_threads_posts():
    try:
        query = """
        SELECT * FROM threads_posts
        ORDER BY scheduled_time ASC
        """
        logger.info(f"Executing query to list Threads posts: {query}")
        result = database.execute_query(query)
        logger.info(f"Retrieved {len(result)} Threads posts")
        return [ThreadsPost(**post) for post in result]
    except Exception as e:
        logger.exception(f"An error occurred while fetching Threads posts: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred while fetching Threads posts: {str(e)}")

@router.post("/{post_id}/schedule")
async def schedule_threads_post(post_id: int, scheduled_time: datetime):
    try:
        query = """
        UPDATE threads_posts
        SET scheduled_time = %s, is_published = FALSE
        WHERE id = %s
        RETURNING *
        """
        logger.info(f"Executing query to schedule Threads post: {query}")
        logger.info(f"Query parameters: post_id={post_id}, scheduled_time={scheduled_time}")
        result = database.execute_query(query, (scheduled_time, post_id))
        if result:
            updated_post = result[0]
            logger.info(f"Threads post scheduled successfully: id={updated_post['id']}, scheduled_time={updated_post['scheduled_time']}")
            return ThreadsPost(**updated_post)
        else:
            logger.warning(f"Threads post not found for scheduling: post_id={post_id}")
            raise HTTPException(status_code=404, detail="Threads post not found")
    except Exception as e:
        logger.exception(f"An error occurred while scheduling Threads post: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred while scheduling Threads post: {str(e)}")
