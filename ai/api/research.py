from fastapi import APIRouter

from ai.schemas.research_request import ResearchRequest


router = APIRouter(
    prefix="/ai",
    tags=["AI Research"],
)


@router.post("/research")
def start_research(request: ResearchRequest):
    return {
        "success": True,
        "message": "Research request received",
        "researchId": request.researchId,
        "topic": request.topic,
    }