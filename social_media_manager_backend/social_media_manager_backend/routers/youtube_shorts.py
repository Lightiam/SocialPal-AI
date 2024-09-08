from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from social_media_manager_backend.database import database
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class YouTubeShort(BaseModel):
    id: Optional[int]
    user_id: int
    content: str
    video_url: str
    scheduled_time: Optional[datetime]
    is_published: bool = False

@router.post("/", response_model=YouTubeShort)
async def create_youtube_short(short: YouTubeShort):
    try:
        logger.info(f"Attempting to create YouTube Short with data: {short.dict()}")

        query = """
        INSERT INTO youtube_shorts (user_id, content, video_url, scheduled_time, is_published)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING *
        """
        values = (short.user_id, short.content, short.video_url, short.scheduled_time, short.is_published)
        result = database.execute_query(query, values)

        if result:
            created_short = result[0]
            logger.info(f"YouTube Short created successfully: {created_short}")
            return YouTubeShort(**created_short)
        else:
            logger.error("Failed to create YouTube Short: No result returned from database")
            raise HTTPException(status_code=500, detail="Failed to create YouTube Short")
    except Exception as e:
        logger.exception(f"An error occurred while creating YouTube Short: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred while creating YouTube Short: {str(e)}")

@router.get("/{short_id}", response_model=YouTubeShort)
async def read_youtube_short(short_id: int):
    try:
        query = "SELECT * FROM youtube_shorts WHERE id = %s"
        result = database.execute_query(query, (short_id,))
        if result:
            return YouTubeShort(**result[0])
        else:
            raise HTTPException(status_code=404, detail="YouTube Short not found")
    except Exception as e:
        logger.exception(f"An error occurred while fetching YouTube Short: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred while fetching YouTube Short: {str(e)}")

@router.get("/", response_model=List[YouTubeShort])
async def list_youtube_shorts():
    try:
        query = "SELECT * FROM youtube_shorts ORDER BY scheduled_time ASC"
        result = database.execute_query(query)
        return [YouTubeShort(**short) for short in result]
    except Exception as e:
        logger.exception(f"An error occurred while fetching YouTube Shorts: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred while fetching YouTube Shorts: {str(e)}")

@router.put("/{short_id}", response_model=YouTubeShort)
async def update_youtube_short(short_id: int, short: YouTubeShort):
    try:
        query = """
        UPDATE youtube_shorts
        SET content = %s, video_url = %s, scheduled_time = %s, is_published = %s
        WHERE id = %s
        RETURNING *
        """
        values = (short.content, short.video_url, short.scheduled_time, short.is_published, short_id)
        result = database.execute_query(query, values)
        if result:
            return YouTubeShort(**result[0])
        else:
            raise HTTPException(status_code=404, detail="YouTube Short not found")
    except Exception as e:
        logger.exception(f"An error occurred while updating YouTube Short: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred while updating YouTube Short: {str(e)}")

@router.delete("/{short_id}")
async def delete_youtube_short(short_id: int):
    try:
        query = "DELETE FROM youtube_shorts WHERE id = %s RETURNING id"
        result = database.execute_query(query, (short_id,))
        if result:
            return {"message": f"YouTube Short {short_id} deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="YouTube Short not found")
    except Exception as e:
        logger.exception(f"An error occurred while deleting YouTube Short: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred while deleting YouTube Short: {str(e)}")
