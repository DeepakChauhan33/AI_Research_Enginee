from pydantic import BaseModel


class ResearchRequest(BaseModel):
    researchId: str
    topic: str