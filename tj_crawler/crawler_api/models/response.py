from typing import List, Optional

from pydantic import BaseModel, Field


class Message(BaseModel):
    message: str


class Representatives(BaseModel):
    type_: str = Field(alias='type')
    name: str


class PartiesInvolved(BaseModel):
    type_: str = Field(alias='type')
    name: str
    representatives: List[Representatives]


class LegalProcessUpdate(BaseModel):
    date: str
    description: str


class LegalProcessDetail(BaseModel):
    degree: str
    class_: str = Field(alias='class')
    area: Optional[str]
    subject: Optional[str]
    distribution: Optional[str]
    judge: Optional[str]
    value: Optional[str]
    parties_involved: Optional[List[PartiesInvolved]]
    updates: Optional[List[LegalProcessUpdate]]


class LegalProcessDetailResponse(BaseModel):
    degrees: List[LegalProcessDetail]
