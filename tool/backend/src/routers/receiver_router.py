from src.services import ReceiverService
from src.repositories.db import SessionDep
from src.models import User, UserRole
from src.dependencies import RoleChecker
from src.models.response_models import ReceiverListResponse
from fastapi import APIRouter, Query, Depends

router = APIRouter(prefix="/api/v1", tags=["Receivers"])

def get_receiver_service(session: SessionDep):
    return ReceiverService(session)

@router.get("/receivers", response_model=ReceiverListResponse)
def get_receiver_endpoint(
    page: int = Query(1, ge=1, description="page number"),
    page_size: int = Query(10, ge=1, le=100, description="page size"),
    service: ReceiverService = Depends(get_receiver_service),
    user: User = Depends(RoleChecker([UserRole.ADMIN, UserRole.USER]))
    ):
    response = service.get_receivers(page=page, page_size=page_size)
    return response