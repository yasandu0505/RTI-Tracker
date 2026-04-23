from fastapi import APIRouter, Depends, Query
from src.services import SenderService
from src.repositories.db import SessionDep
from src.models import SenderResponse, SenderRequest, SenderListResponse
from src.models import User, UserRole
from src.dependencies import RoleChecker

router = APIRouter(prefix="/api/v1", tags=["Senders"])

def get_sender_service(session: SessionDep):
    return SenderService(session)

@router.post("/senders", response_model=SenderResponse)
async def create_sender_endpoint(
    sender_request: SenderRequest,
    service: SenderService = Depends(get_sender_service),
    user: User = Depends(RoleChecker([UserRole.ADMIN, UserRole.USER]))
):
    return service.create_sender(sender_request=sender_request)

@router.get("/senders", response_model=SenderListResponse)
async def get_sender_list_endpoint(
    page: int = Query(1, ge=1, description="page number"),
    page_size: int = Query(10, ge=1, le=100, description="page size"),
    service: SenderService = Depends(get_sender_service),
    # user: User = Depends(RoleChecker([UserRole.ADMIN, UserRole.USER]))
):
    return service.get_sender_list(page=page, page_size=page_size)



