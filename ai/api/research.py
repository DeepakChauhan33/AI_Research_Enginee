from fastapi import APIRouter, HTTPException

from ai.pipeline.research_pipeline import ResearchPipeline
from ai.schemas.research_request import ResearchRequest


router = APIRouter(
    prefix="/ai",
    tags=["AI Research"],
)


pipeline = ResearchPipeline()


@router.post("/research")
def start_research(request: ResearchRequest):

    try:
        def update_stage(stage):
            print(f"AI Stage: {stage}", flush=True)

        result = pipeline.run(request.topic, progress_callback=update_stage)

        return {
            "success": True,
            "message": "Research completed successfully",
            "researchId": request.researchId,
            "result": result.model_dump(),
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error),
        )