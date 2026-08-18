from fastapi import FastAPI

from ai.api.research import router as research_router


app = FastAPI(
    title="McKinsey Research AI",
    description="AI service for the market research engine",
    version="1.0.0",
)


app.include_router(research_router)


@app.get("/health")
def health_check():
    return {
        "success": True,
        "message": "AI service is running",
    }